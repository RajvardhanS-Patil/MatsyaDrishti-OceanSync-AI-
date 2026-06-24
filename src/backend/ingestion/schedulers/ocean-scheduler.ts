import { supabase } from "@/lib/supabase/client";
import { OpenMeteoMarineProvider } from "../providers/OpenMeteoMarineProvider";

export async function runOceanIngestion() {
  const provider = new OpenMeteoMarineProvider();
  const startTime = Date.now();
  
  // Target coordinates
  const lat = 15.5;
  const lon = 73.5;

  try {
    // 1. Fetch Ocean Data
    const oceanData = await provider.fetchOceanConditions(lat, lon);

    // 2. Fetch latest weather data for missing fields
    const { data: weather } = await supabase
      .from("weather")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // 3. Persist to `ocean_conditions` table
    const { data: insertedRow, error: insertError } = await supabase
      .from("ocean_conditions")
      .insert([
        {
          location: "Sector 4",
          latitude: lat,
          longitude: lon,
          temperature: oceanData.sea_surface_temperature,
          salinity: oceanData.salinity,
          wave_height: oceanData.wave_height,
          current_speed: oceanData.current_speed,
          chlorophyll: oceanData.chlorophyll,
          wind_speed: weather?.wind_speed || 0,
          visibility: weather?.visibility || 10,
          ph_level: 8.1, // Seeded base
          dissolved_oxygen: 6.5 // Seeded base
        }
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    // 4. Update data_provenance
    await supabase.from("data_provenance").insert([
      { metric: "sea_surface_temperature", source: "REAL API", provider: provider.name, confidence: 99.0 },
      { metric: "wave_height", source: "REAL API", provider: provider.name, confidence: 99.0 },
      { metric: "current_speed", source: "REAL API", provider: provider.name, confidence: 99.0 },
      { metric: "salinity", source: "DERIVED", provider: provider.name, confidence: 85.0 },
      { metric: "chlorophyll", source: "DERIVED", provider: provider.name, confidence: 85.0 }
    ]);

    // 5. Log Success
    const duration = Date.now() - startTime;
    await supabase.from("ingestion_logs").insert([{
      provider: provider.name,
      status: "success",
      message: `Fetched SST ${oceanData.sea_surface_temperature}°C, Waves ${oceanData.wave_height}m`,
      duration_ms: duration
    }]);

    return { success: true, row: insertedRow, duration };

  } catch (error: any) {
    // 6. Log Failure
    const duration = Date.now() - startTime;
    await supabase.from("ingestion_logs").insert([{
      provider: provider.name,
      status: "error",
      message: error.message || "Unknown error",
      duration_ms: duration
    }]);

    console.error("Ocean ingestion failed:", error);
    return { success: false, error: error.message };
  }
}
