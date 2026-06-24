import { supabase } from "@/lib/supabase/client";
import { GfwVesselProvider } from "../providers/GfwVesselProvider";

export async function runVesselIngestion() {
  const provider = new GfwVesselProvider();
  const startTime = Date.now();

  // Sector 4 bounding box
  const bbox = "14.0,72.0,20.0,76.0";

  try {
    // 1. Fetch vessel data from GFW
    const vessels = await provider.fetchVessels(bbox);

    if (vessels.length === 0) {
      throw new Error("GFW returned zero vessels");
    }

    // 2. Batch UPSERT into vessels table (keyed on mmsi)
    // De-duplicate rows by mmsi to avoid ON CONFLICT errors
    const uniqueRowsMap = new Map();
    for (const v of vessels) {
      if (!uniqueRowsMap.has(v.mmsi)) {
        uniqueRowsMap.set(v.mmsi, {
          mmsi: v.mmsi,
          name: v.name,
          imo_number: v.vessel_id,
          vessel_type: v.activity === "fishing" ? "fishing" : "cargo",
          latitude: v.lat,
          longitude: v.lon,
          speed: v.speed,
          heading: v.heading,
          activity: v.activity,
          compliance: "unknown",
          engine_status: v.speed > 0.5 ? "running" : "idle",
          gps_signal: "strong",
          last_update: new Date().toISOString(),
          status: "active"
        });
      }
    }
    const rows = Array.from(uniqueRowsMap.values());

    // Delete old seeded vessels that don't have an mmsi
    await supabase
      .from("vessels")
      .delete()
      .is("mmsi", null);

    // Insert the real vessels
    const { data: insertedRows, error: insertError } = await supabase
      .from("vessels")
      .upsert(rows, { onConflict: "mmsi" })
      .select();

    if (insertError) {
      throw insertError;
    }

    // 3. Update status based on last_update age
    const now = new Date();
    const tenMinAgo = new Date(now.getTime() - 10 * 60 * 1000).toISOString();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();

    await supabase
      .from("vessels")
      .update({ status: "inactive" })
      .lt("last_update", tenMinAgo)
      .gte("last_update", oneHourAgo);

    await supabase
      .from("vessels")
      .update({ status: "offline" })
      .lt("last_update", oneHourAgo);

    // 4. Update data_provenance
    await supabase.from("data_provenance").upsert([{
      metric: "vessels",
      source: "REAL API",
      provider: provider.name,
      confidence: 91.0
    }], { onConflict: "metric" });

    // 5. Log success
    const duration = Date.now() - startTime;
    await supabase.from("ingestion_logs").insert([{
      provider: provider.name,
      status: "success",
      message: `Ingested ${vessels.length} vessels from GFW for Sector 4`,
      duration_ms: duration
    }]);

    return { success: true, vessel_count: vessels.length, rows: insertedRows, duration };

  } catch (error: any) {
    // Log failure
    const duration = Date.now() - startTime;
    await supabase.from("ingestion_logs").insert([{
      provider: provider.name,
      status: "error",
      message: error.message || "Unknown error",
      duration_ms: duration
    }]);

    console.error("Vessel ingestion failed:", error);
    return { success: false, error: error.message, vessel_count: 0 };
  }
}
