/* ──────────────────────────────────────────────────────────
   Authority Command Center — Mock Data
   Government-grade marine intelligence metrics.
   ────────────────────────────────────────────────────────── */

/* ── Command Header KPIs ──────────────────────────────── */
export interface CommandKPI {
  label: string;
  value: string;
  max?: string;
  percent: number;
  color: string;
  trend: "up" | "down" | "stable";
  trendValue: string;
}

export const COMMAND_KPIS: CommandKPI[] = [
  { label: "Marine Health Score", value: "84.2", max: "100", percent: 84.2, color: "#a6cfbe", trend: "up", trendValue: "+2.1" },
  { label: "Biodiversity Index", value: "72.8", max: "100", percent: 72.8, color: "#a8cecd", trend: "down", trendValue: "-1.4" },
  { label: "Protected Zones", value: "14", max: "20", percent: 70, color: "#00A3FF", trend: "stable", trendValue: "0" },
  { label: "Active Fishing", value: "847", max: "", percent: 0, color: "#FFCE00", trend: "up", trendValue: "+23" },
  { label: "Risk Level", value: "MODERATE", max: "", percent: 45, color: "#FFCE00", trend: "up", trendValue: "+5%" },
];

/* ── Marine Health Metrics ────────────────────────────── */
export interface HealthMetric {
  label: string;
  score: number;
  trend: "improving" | "declining" | "stable";
  forecast: string;
  color: string;
}

export const HEALTH_METRICS: HealthMetric[] = [
  { label: "Overall Marine Health", score: 84.2, trend: "improving", forecast: "85.1 (7d)", color: "#a6cfbe" },
  { label: "Coral Health", score: 61.5, trend: "declining", forecast: "58.2 (7d)", color: "#FFCE00" },
  { label: "Fish Population", score: 78.3, trend: "stable", forecast: "78.8 (7d)", color: "#a8cecd" },
  { label: "Water Quality", score: 91.2, trend: "improving", forecast: "92.0 (7d)", color: "#00A3FF" },
  { label: "Habitat Stability", score: 69.7, trend: "declining", forecast: "67.3 (7d)", color: "#afcdc2" },
];

/* ── AI Fusion Center ─────────────────────────────────── */
export interface AIInput {
  label: string;
  stream: string;
  status: "live" | "processing" | "queued";
}

export interface AIOutput {
  label: string;
  value: string;
  severity: "safe" | "moderate" | "high" | "critical";
  confidence: number;
}

export const AI_INPUTS: AIInput[] = [
  { label: "INCOIS STREAM", stream: "SST_DATA_V4.L2_NORTH_INDIAN", status: "live" },
  { label: "CHLOROPHYLL DATA", stream: "CHL_A_MODIS_L3_DAILY", status: "live" },
  { label: "eDNA BIODIVERSITY", stream: "eDNA_METAGEN_AUV_07", status: "processing" },
  { label: "FISHERIES DATA", stream: "CATCH_LOG_RT_HUB_651", status: "live" },
  { label: "VESSEL ACTIVITY", stream: "AIS_FEED_INDIAN_OCEAN", status: "live" },
];

export const AI_OUTPUTS: AIOutput[] = [
  { label: "Marine Health Prediction", value: "Stable — minor temp anomaly NE sector", severity: "moderate", confidence: 91 },
  { label: "Biodiversity Threat Score", value: "Elevated — coral bleaching risk Sector 7-G", severity: "high", confidence: 87 },
  { label: "Illegal Fishing Risk", value: "Low — 2 flagged vessels under review", severity: "safe", confidence: 94 },
  { label: "Conservation Action", value: "Dynamic zone adjustment recommended for Sector 4", severity: "moderate", confidence: 89 },
];

export const AI_RECOMMENDATION = "High probability of coral bleaching detected in Sector 7-G. Recommend Dynamic Zone adjustment and temporary fishing moratorium within 48 hours.";

/* ── Zone Management ──────────────────────────────────── */
export interface ManagedZone {
  name: string;
  status: "active" | "monitoring" | "revision" | "disabled";
  statusLabel: string;
  stressLevel: number;
  fishingActivity: "none" | "low" | "moderate" | "high";
  biodiversityImpact: "positive" | "neutral" | "negative";
  enabled: boolean;
}

export const MANAGED_ZONES: ManagedZone[] = [
  { name: "No-Fishing Sector 4", status: "active", statusLabel: "AUTO-PROTECTION ACTIVE", stressLevel: 12, fishingActivity: "none", biodiversityImpact: "positive", enabled: true },
  { name: "Coral Transit Lane", status: "monitoring", statusLabel: "MONITORING ONLY", stressLevel: 45, fishingActivity: "low", biodiversityImpact: "neutral", enabled: false },
  { name: "Deep Sea Trawl Restr.", status: "revision", statusLabel: "REVISION REQUIRED", stressLevel: 68, fishingActivity: "moderate", biodiversityImpact: "negative", enabled: true },
  { name: "Mangrove Buffer Zone", status: "active", statusLabel: "ENFORCED", stressLevel: 8, fishingActivity: "none", biodiversityImpact: "positive", enabled: true },
];

/* ── Biodiversity Data ────────────────────────────────── */
export const BIODIVERSITY_CHART = [
  { week: "WK01", threat: 40, diversity: 82 },
  { week: "WK02", threat: 65, diversity: 78 },
  { week: "WK03", threat: 90, diversity: 71 },
  { week: "WK04", threat: 55, diversity: 74 },
  { week: "WK05", threat: 30, diversity: 80 },
  { week: "WK06", threat: 75, diversity: 73 },
  { week: "WK07", threat: 45, diversity: 77 },
];

/* ── Ecosystem Telemetry ──────────────────────────────── */
export interface TelemetryStream {
  label: string;
  value: string;
  unit: string;
  color: string;
  sparkline: number[];
}

export const TELEMETRY_STREAMS: TelemetryStream[] = [
  { label: "WATER TEMPERATURE", value: "24.5", unit: "°C", color: "#a6cfbe", sparkline: [15, 5, 15, 10, 18, 5, 12] },
  { label: "SALINITY RATIO", value: "35.2", unit: "PSU", color: "#afcdc2", sparkline: [10, 18, 8, 12, 6, 12, 8] },
  { label: "PH LEVELS", value: "8.1", unit: "pH", color: "#00A3FF", sparkline: [12, 12, 14, 10, 12, 11, 12] },
  { label: "DISSOLVED OXYGEN", value: "6.8", unit: "mg/L", color: "#a8cecd", sparkline: [8, 12, 10, 14, 9, 11, 10] },
];

/* ── Vessel Telemetry Feed ────────────────────────────── */
export interface VesselEntry {
  id: string;
  name: string;
  type: string;
  lat: string;
  lon: string;
  speed: string;
  activity: "fishing" | "transit" | "anchored" | "drifting";
  compliance: "compliant" | "warning" | "violation";
}

export const VESSEL_FEED: VesselEntry[] = [
  { id: "IMO-9284671", name: "MV Ocean Hunter", type: "Trawler", lat: "15.45°N", lon: "73.81°E", speed: "8.2kt", activity: "fishing", compliance: "compliant" },
  { id: "IMO-9301445", name: "FV Matsya Rani", type: "Purse Seiner", lat: "15.12°N", lon: "73.65°E", speed: "6.1kt", activity: "fishing", compliance: "compliant" },
  { id: "IMO-9387552", name: "SS Coastal Ray", type: "Gill Net", lat: "14.98°N", lon: "74.02°E", speed: "0.0kt", activity: "anchored", compliance: "warning" },
  { id: "IMO-9415203", name: "FV Deep Horizon", type: "Long Liner", lat: "15.67°N", lon: "73.44°E", speed: "11.4kt", activity: "transit", compliance: "compliant" },
  { id: "IMO-9442871", name: "MV Unknown-7", type: "Unregistered", lat: "15.33°N", lon: "73.91°E", speed: "3.2kt", activity: "drifting", compliance: "violation" },
];

/* ── Incidents ────────────────────────────────────────── */
export interface IncidentEntry {
  id: string;
  type: "weather" | "stress" | "illegal" | "biodiversity" | "coral";
  severity: "critical" | "high" | "moderate" | "low";
  title: string;
  location: string;
  time: string;
}

export const INCIDENTS: IncidentEntry[] = [
  { id: "INC-001", type: "weather", severity: "critical", title: "Cyclonic Formation NE Sector", location: "15.8°N, 74.2°E", time: "2 min ago" },
  { id: "INC-002", type: "coral", severity: "high", title: "Coral Bleaching Alert — Sector 7-G", location: "15.1°N, 73.6°E", time: "18 min ago" },
  { id: "INC-003", type: "illegal", severity: "moderate", title: "Unregistered Vessel — Zone Echo", location: "15.3°N, 73.9°E", time: "34 min ago" },
  { id: "INC-004", type: "biodiversity", severity: "high", title: "Sardine Population Drop — Sector 4", location: "14.9°N, 74.0°E", time: "1 hr ago" },
  { id: "INC-005", type: "stress", severity: "low", title: "Elevated SST — Shallow Reef Band", location: "15.5°N, 73.7°E", time: "2 hr ago" },
];
