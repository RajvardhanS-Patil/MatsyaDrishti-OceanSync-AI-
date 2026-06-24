import { supabase } from "./client";

export interface BiodiversityMetricsRow {
  id: string;
  species_richness: number;
  threatened_species: number;
  habitat_score: number;
  coral_health: number;
  water_quality: number;
  threat_score: number;
  created_at: string;
}

export async function getLatestBiodiversity(): Promise<BiodiversityMetricsRow | null> {
  const { data, error } = await supabase
    .from("biodiversity_metrics")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Supabase Error fetching biodiversity_metrics:", error);
    throw error;
  }

  return data as BiodiversityMetricsRow;
}

export async function getAllBiodiversity(): Promise<BiodiversityMetricsRow[]> {
  const { data, error } = await supabase
    .from("biodiversity_metrics")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error fetching biodiversity_metrics:", error);
    throw error;
  }

  return data as BiodiversityMetricsRow[];
}
