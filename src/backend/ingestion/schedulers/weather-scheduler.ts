import { supabase } from "@/lib/supabase/client";
import { OpenMeteoProvider } from "../providers/OpenMeteoProvider";

// We use the client, but in a real secure backend context we'd use a service_role key.
// For this hackathon, our RLS policies allow public inserts.

export async function runWeatherIngestion() {
  const provider = new OpenMeteoProvider();
  const startTime = Date.now();
  
  // Target coordinates as requested
  const lat = 15.5;
  const lon = 73.5;

  try {
    // 1. Fetch
    const weatherData = await provider.fetchCurrentWeather(lat, lon);

    // 2. Persist to `weather` table
    const { data: insertedRow, error: insertError } = await supabase
      .from("weather")
      .insert([
        {
          location: "Sector 4",
          latitude: lat,
          longitude: lon,
          condition: "Clear",
          temperature: weatherData.temperature,
          wind_speed: weatherData.wind_speed,
          pressure: weatherData.pressure,
          visibility: weatherData.visibility
        }
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    // 3. Log Success
    const duration = Date.now() - startTime;
    await supabase.from("ingestion_logs").insert([{
      provider: provider.name,
      status: "success",
      message: `Fetched ${weatherData.temperature}°C, ${weatherData.wind_speed}km/h wind`,
      duration_ms: duration
    }]);

    return { success: true, row: insertedRow, duration };

  } catch (error: any) {
    // 4. Log Failure
    const duration = Date.now() - startTime;
    await supabase.from("ingestion_logs").insert([{
      provider: provider.name,
      status: "error",
      message: error.message || "Unknown error",
      duration_ms: duration
    }]);

    console.error("Ingestion failed:", error);
    return { success: false, error: error.message };
  }
}
