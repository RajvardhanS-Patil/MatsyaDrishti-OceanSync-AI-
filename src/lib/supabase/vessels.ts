import { supabase } from "./client";

export interface VesselRow {
  id: string;
  mmsi: string | null;
  imo_number: string;
  name: string;
  vessel_type: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  activity: "fishing" | "transit" | "anchored" | "drifting";
  compliance: "compliant" | "warning" | "violation" | "unknown";
  engine_status: "running" | "idle" | "off";
  gps_signal: "strong" | "moderate" | "weak";
  status: "active" | "inactive" | "offline";
  last_update: string;
  created_at: string;
}

export async function getActiveVessels(): Promise<VesselRow[]> {
  const { data, error } = await supabase
    .from("vessels")
    .select("*")
    .order("last_update", { ascending: false });

  if (error) {
    console.error("Supabase Error fetching vessels:", error);
    throw error;
  }

  return data as VesselRow[];
}
