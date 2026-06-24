import { supabase } from "./client";
import { type FishingZone } from "@/lib/fisherman-data";

export interface FishingZoneRow {
  id: string;
  zone_name: string;
  fish_probability: number;
  species: string;
  catch_potential: string;
  confidence_score: number;
  latitude: number;
  longitude: number;
  zone_status: string;
  description: string;
  created_at: string;
}

export function normalizeFishingZone(row: FishingZoneRow): FishingZone {
  // confidence_score is numeric in the database
  const score = row.confidence_score || row.fish_probability || 0;
  
  let color: "primary" | "secondary" | "tertiary" = "primary";
  let confidence: "high" | "medium" | "low" = "medium";

  if (score >= 80) {
    color = "primary";
    confidence = "high";
  } else if (score >= 50) {
    color = "secondary";
    confidence = "medium";
  } else {
    color = "tertiary";
    confidence = "low";
  }

  return {
    id: row.id,
    name: row.zone_name,
    matchPercent: row.fish_probability,
    catchPotential: row.catch_potential,
    species: row.species,
    confidence: confidence,
    description: row.description || `Optimal ${row.species} probability detected. Status: ${row.zone_status || "Active"}.`,
    color: color,
    latitude: row.latitude,
    longitude: row.longitude,
    zone_status: row.zone_status || "active",
    enabled: row.zone_status === "active"
  };
}

export async function getLatestFishingZones(): Promise<FishingZone[]> {
  const { data, error } = await supabase
    .from("fishing_zones")
    .select("*")
    .order("fish_probability", { ascending: false });

  if (error) {
    console.error("Supabase Error fetching fishing zones:", error);
    throw error;
  }

  return (data as FishingZoneRow[]).map(normalizeFishingZone);
}
