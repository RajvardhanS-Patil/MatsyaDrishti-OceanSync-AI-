import { supabase } from "./client";

export interface AlertRow {
  id: string;
  title: string;
  severity: "critical" | "high" | "moderate" | "low";
  description: string;
  created_at: string;
}

export async function getLatestAlerts(): Promise<AlertRow[]> {
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error fetching alerts:", error);
    throw error;
  }

  return data as AlertRow[];
}
