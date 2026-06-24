import { supabase } from "@/lib/supabase/client";

export async function deriveMarineHealth() {
  const startTime = Date.now();

  try {
    // Fetch latest dependencies
    const { data: ocean } = await supabase.from("ocean_conditions").select("*").order("created_at", { ascending: false }).limit(1).single();
    const { data: bio } = await supabase.from("biodiversity_metrics").select("*").order("created_at", { ascending: false }).limit(1).single();
    const { data: weather } = await supabase.from("weather").select("*").order("created_at", { ascending: false }).limit(1).single();

    if (!ocean || !bio || !weather) {
      throw new Error("Insufficient data to derive marine health");
    }

    // 1. Water Quality: derived from chlorophyll (lower is better, assuming < 2 is ideal) and SST anomaly (ideal 27-29)
    const tempPenalty = Math.abs(ocean.temperature - 28) * 5;
    const chloroPenalty = Math.max(0, ocean.chlorophyll - 1.5) * 10;
    const water_quality = Math.max(0, 100 - tempPenalty - chloroPenalty);

    // 2. Biodiversity Score: direct mapping from species richness and threat score
    const biodiversity_score = Math.max(0, 100 - (bio.threat_score * 0.8));

    // 3. Coral Health: penalized by wave energy (storms) and high temperature
    const wavePenalty = ocean.wave_height > 2 ? (ocean.wave_height - 2) * 10 : 0;
    const coral_health = Math.max(0, water_quality * 0.7 - wavePenalty + 30);

    // 4. Overall Health Score
    const health_score = (water_quality * 0.4) + (biodiversity_score * 0.4) + (coral_health * 0.2);

    // Insert derived row
    const { data: inserted, error } = await supabase.from("marine_health").insert([{
      health_score: Number(health_score.toFixed(1)),
      coral_health: Number(coral_health.toFixed(1)),
      biodiversity_score: Number(biodiversity_score.toFixed(1)),
      water_quality: Number(water_quality.toFixed(1))
    }]).select().single();

    if (error) throw error;

    // Update provenance
    await supabase.from("data_provenance").upsert([{
      metric: "marine_health",
      source: "Fusion Engine",
      provider: "Derived from Ocean/Bio/Weather",
      confidence: 85.0
    }], { onConflict: "metric" });

    const duration = Date.now() - startTime;
    await supabase.from("ingestion_logs").insert([{
      provider: "Fusion Engine",
      status: "success",
      message: `Derived Marine Health Score: ${health_score.toFixed(1)}`,
      duration_ms: duration
    }]);

    return { success: true, score: health_score, duration };

  } catch (error: any) {
    const duration = Date.now() - startTime;
    await supabase.from("ingestion_logs").insert([{
      provider: "Fusion Engine",
      status: "error",
      message: error.message || "Unknown error deriving marine health",
      duration_ms: duration
    }]);
    return { success: false, error: error.message };
  }
}
