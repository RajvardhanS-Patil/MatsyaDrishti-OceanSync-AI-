import { supabase } from "./client";

export interface MarineHealthRow {
  id: string;
  health_score: number;
  coral_health: number;
  biodiversity_score: number;
  water_quality: number;
  created_at: string;
}

export async function getLatestMarineHealth(): Promise<MarineHealthRow | null> {
  const { data, error } = await supabase
    .from("marine_health")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Supabase Error fetching marine_health:", error);
    throw error;
  }

  return data as MarineHealthRow;
}
