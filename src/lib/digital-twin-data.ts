/* ──────────────────────────────────────────────────────────
   Coastal Ecosystem Digital Twin — Mock Data
   Flagship page data — most extensive dataset.
   ────────────────────────────────────────────────────────── */

/* ── Ecosystem Layers ─────────────────────────────────── */
export interface EcoLayer {
  id: string;
  label: string;
  color: string;
  enabled: boolean;
  icon: string;
}

export const ECO_LAYERS: EcoLayer[] = [
  { id: "fish", label: "Fish Clusters (3D)", color: "#00A3FF", enabled: true, icon: "Fish" },
  { id: "biodiversity", label: "Biodiversity Zones", color: "#a6cfbe", enabled: true, icon: "TreePine" },
  { id: "coral", label: "Coral Health", color: "#FFCE00", enabled: false, icon: "Shell" },
  { id: "sst", label: "Sea Surface Temp", color: "#ff6b6b", enabled: false, icon: "Thermometer" },
  { id: "currents", label: "Ocean Currents", color: "#a8cecd", enabled: true, icon: "Waves" },
  { id: "chlorophyll", label: "Chlorophyll Density", color: "#4ade80", enabled: false, icon: "Leaf" },
  { id: "vessels", label: "Vessel Tracking", color: "#afcdc2", enabled: true, icon: "Ship" },
  { id: "zones", label: "Conservation Zones", color: "#9D0300", enabled: false, icon: "Shield" },
];

/* ── Temporal Periods ─────────────────────────────────── */
export interface TimePeriod {
  label: string;
  value: number;
  tag: string;
}

export const TIME_PERIODS: TimePeriod[] = [
  { label: "24 Hours", value: 10, tag: "LIVE" },
  { label: "7 Days", value: 30, tag: "RECENT" },
  { label: "30 Days", value: 50, tag: "MONTHLY" },
  { label: "6 Months", value: 70, tag: "SEASONAL" },
  { label: "1 Year", value: 90, tag: "ANNUAL" },
];

/* ── Sector Intelligence ──────────────────────────────── */
export interface SectorData {
  name: string;
  biomass: string;
  o2Sat: number;
  ecoStress: number;
  fusionAlert: string;
}

export const SECTOR_DATA: SectorData = {
  name: "Sector 7-G",
  biomass: "1.4k",
  o2Sat: 84,
  ecoStress: 6.8,
  fusionAlert: "High correlation between thermal anomalies and decrease in schooling behavior. Mitigation protocols recommended for Sector 7-G.",
};

/* ── Ecosystem Health Gauges ──────────────────────────── */
export interface HealthGauge {
  label: string;
  value: number;
  max: number;
  color: string;
  trend: "up" | "down" | "stable";
  description: string;
}

export const HEALTH_GAUGES: HealthGauge[] = [
  { label: "Marine Health", value: 84.2, max: 100, color: "#a6cfbe", trend: "up", description: "Stable ecosystem resilience" },
  { label: "Coral Health", value: 61.5, max: 100, color: "#FFCE00", trend: "down", description: "Bleaching risk in Sector 7-G" },
  { label: "Biodiversity", value: 72.8, max: 100, color: "#a8cecd", trend: "stable", description: "Species richness normal" },
  { label: "Habitat Score", value: 69.7, max: 100, color: "#afcdc2", trend: "down", description: "Mangrove degradation detected" },
  { label: "Water Quality", value: 91.2, max: 100, color: "#00A3FF", trend: "up", description: "Clean ocean readings" },
];

/* ── eDNA Biodiversity ────────────────────────────────── */
export interface EDNAMetric {
  label: string;
  value: string;
  status: "normal" | "elevated" | "critical";
  insight: string;
}

export const EDNA_METRICS: EDNAMetric[] = [
  { label: "Species Richness", value: "247", status: "normal", insight: "Within expected seasonal range" },
  { label: "Genetic Diversity", value: "0.89", status: "normal", insight: "High heterozygosity index" },
  { label: "Threatened Species", value: "12", status: "elevated", insight: "3 new detections this month" },
  { label: "Anomaly Score", value: "2.4σ", status: "critical", insight: "Unusual eDNA signatures in deep reef band" },
];

/* ── Sensor Network ───────────────────────────────────── */
export interface SensorFeed {
  id: string;
  type: "buoy" | "satellite" | "station" | "vessel";
  name: string;
  status: "streaming" | "intermittent" | "offline";
  lat: string;
  lon: string;
  lastPing: string;
}

export const SENSOR_FEEDS: SensorFeed[] = [
  { id: "S-04", type: "station", name: "Sensor Station 04", status: "streaming", lat: "17.3850°N", lon: "78.4867°E", lastPing: "0.3s" },
  { id: "B-12", type: "buoy", name: "Deep Buoy Alpha-12", status: "streaming", lat: "15.4210°N", lon: "73.8400°E", lastPing: "1.2s" },
  { id: "SAT-3", type: "satellite", name: "OCEANSAT-3 Pass", status: "streaming", lat: "—", lon: "—", lastPing: "8.4s" },
  { id: "V-07", type: "vessel", name: "RV Samudra Kaustubh", status: "intermittent", lat: "14.9800°N", lon: "74.0100°E", lastPing: "34s" },
  { id: "B-08", type: "buoy", name: "Coastal Buoy Beta-08", status: "streaming", lat: "16.1200°N", lon: "73.2900°E", lastPing: "2.1s" },
];

/* ── Species Distribution ─────────────────────────────── */
export interface SpeciesOverlay {
  name: string;
  population: string;
  density: "high" | "moderate" | "low";
  migrationTrend: string;
  color: string;
}

export const SPECIES_OVERLAYS: SpeciesOverlay[] = [
  { name: "Yellowfin Tuna", population: "~24,000", density: "high", migrationTrend: "Southward shift", color: "#a6cfbe" },
  { name: "Sardine", population: "~180,000", density: "high", migrationTrend: "Stable nearshore", color: "#afcdc2" },
  { name: "Mackerel", population: "~45,000", density: "moderate", migrationTrend: "Deeper thermocline", color: "#a8cecd" },
  { name: "Anchovy", population: "~92,000", density: "moderate", migrationTrend: "Upwelling zones", color: "#719989" },
  { name: "Coral (Acropora)", population: "—", density: "low", migrationTrend: "Bleaching retreat", color: "#FFCE00" },
  { name: "Sea Turtle", population: "~340", density: "low", migrationTrend: "Nesting migration", color: "#00A3FF" },
];

/* ── AI Prediction Pipeline ───────────────────────────── */
export interface PredictionOutput {
  label: string;
  value: string;
  severity: "safe" | "moderate" | "high" | "critical";
  confidence: number;
}

export const AI_PREDICTIONS: PredictionOutput[] = [
  { label: "Fish Cluster Forecast", value: "Tuna aggregation expected 15nm SW in 48h", severity: "safe", confidence: 91 },
  { label: "Biodiversity Risk", value: "Coral stress escalation — Sector 7-G", severity: "high", confidence: 87 },
  { label: "Ecosystem Stress", value: "Moderate thermal anomaly spreading NE", severity: "moderate", confidence: 82 },
  { label: "Conservation Action", value: "Expand buffer zone around Malvan reef", severity: "moderate", confidence: 89 },
];

/* ── Climate Overlay ──────────────────────────────────── */
export interface ClimateMetric {
  label: string;
  current: string;
  projected: string;
  risk: "low" | "moderate" | "high";
}

export const CLIMATE_METRICS: ClimateMetric[] = [
  { label: "SST Change", current: "+0.8°C", projected: "+1.4°C (2030)", risk: "moderate" },
  { label: "Migration Shift", current: "12nm South", projected: "25nm (2030)", risk: "high" },
  { label: "Coral Stress", current: "Level 2", projected: "Level 4 (2030)", risk: "high" },
  { label: "Future Risk Zones", current: "3 sectors", projected: "7 sectors (2030)", risk: "moderate" },
];
