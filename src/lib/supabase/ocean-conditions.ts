import { supabase } from "./client";

export interface OceanConditionRow {
  id: string;
  temperature: number;
  salinity: number;
  wave_height: number;
  wind_speed: number;
  current_speed: number;
  chlorophyll: number;
  ph_level: number;
  dissolved_oxygen: number;
  visibility: number;
  location: string;
  latitude: number;
  longitude: number;
  recorded_at: string;
  created_at: string;
}

export async function getLatestOceanConditions(): Promise<OceanConditionRow | null> {
  const { data: oceanData, error: oceanError } = await supabase
    .from("ocean_conditions")
    .select("*")
    .order("recorded_at", { ascending: false })
    .limit(1)
    .single();

  if (oceanError) {
    console.error("Supabase Error fetching ocean_conditions:", oceanError);
    throw oceanError;
  }

  // Fetch the latest real-world ingested weather data
  const { data: weatherData, error: weatherError } = await supabase
    .from("weather")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (weatherError && weatherError.code !== 'PGRST116') {
    // Log but don't fail if weather table is empty/missing yet
    console.warn("Could not fetch live weather data:", weatherError);
  }

  // Merge the real weather data over the seeded ocean data
  if (weatherData) {
    return {
      ...oceanData,
      temperature: weatherData.temperature ?? oceanData.temperature,
      wind_speed: weatherData.wind_speed ?? oceanData.wind_speed,
      visibility: weatherData.visibility ?? oceanData.visibility,
    } as OceanConditionRow;
  }

  return oceanData as OceanConditionRow;
}

export async function getAllOceanConditions(): Promise<OceanConditionRow[]> {
  const { data, error } = await supabase
    .from("ocean_conditions")
    .select("*")
    .order("recorded_at", { ascending: false });

  if (error) {
    console.error("Supabase Error fetching ocean_conditions:", error);
    throw error;
  }

  return data as OceanConditionRow[];
}
