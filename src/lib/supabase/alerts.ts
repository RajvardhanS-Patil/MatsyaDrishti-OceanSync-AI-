import { supabase } from "./client";
import { type IncidentEntry } from "@/lib/authority-data";

export interface AlertRow {
  id: string;
  title: string;
  severity: "critical" | "high" | "moderate" | "low";
  type: string;
  location: string;
  description: string;
  created_at: string;
}

const getRelativeTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};

export function normalizeAlert(row: AlertRow): IncidentEntry {
  return {
    id: row.id,
    type: row.type as IncidentEntry["type"],
    severity: row.severity,
    title: row.title,
    location: row.location,
    time: row.created_at ? getRelativeTime(row.created_at) : "Unknown",
  };
}

export async function getLatestAlerts(): Promise<IncidentEntry[]> {
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error fetching alerts:", error);
    throw error;
  }

  return (data as AlertRow[]).map(normalizeAlert);
}
