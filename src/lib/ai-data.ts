/* ──────────────────────────────────────────────────────────
   AI Center (Matsya Engine) + Climate Analytics — Mock Data
   ────────────────────────────────────────────────────────── */

/* ── AI Overview KPIs ─────────────────────────────────── */
export interface AIKPI {
  label: string;
  value: string;
  unit?: string;
  color: string;
  icon: string;
}

export const AI_KPIS: AIKPI[] = [
  { label: "AI Status", value: "ONLINE", color: "#a6cfbe", icon: "Brain" },
  { label: "Model Health", value: "98.4", unit: "%", color: "#a8cecd", icon: "HeartPulse" },
  { label: "Prediction Accuracy", value: "91.7", unit: "%", color: "#00A3FF", icon: "Target" },
  { label: "Data Streams", value: "12", unit: "ACTIVE", color: "#afcdc2", icon: "Radio" },
  { label: "Inference Latency", value: "42", unit: "ms", color: "#FFCE00", icon: "Zap" },
  { label: "Confidence Level", value: "89.3", unit: "%", color: "#a6cfbe", icon: "ShieldCheck" },
];

/* ── Data Fusion Pipeline ─────────────────────────────── */
export interface PipelineStage {
  id: string;
  label: string;
  items: string[];
  status: "streaming" | "processing" | "complete";
}

export const FUSION_PIPELINE: PipelineStage[] = [
  { id: "input", label: "DATA SOURCES", items: ["INCOIS SST Feed", "Chlorophyll-a (MODIS)", "Ocean Current Model", "eDNA Metagenomic", "Historical Catch Logs", "AIS Vessel Tracks"], status: "streaming" },
  { id: "fusion", label: "DATA FUSION", items: ["Spatial Alignment", "Temporal Normalization", "Quality Scoring", "Feature Extraction"], status: "processing" },
  { id: "engine", label: "MATSYA ENGINE", items: ["Deep Ensemble v3.2", "Geospatial Transformer", "Species Distribution Model", "Risk Assessment Net"], status: "processing" },
  { id: "output", label: "PREDICTIONS", items: ["Fish Cluster Forecast", "Biodiversity Risk", "Conservation Action", "Ecosystem Stress"], status: "complete" },
];

/* ── Model Performance ────────────────────────────────── */
export interface ModelMetric {
  label: string;
  value: number;
  benchmark: number;
  color: string;
}

export const MODEL_METRICS: ModelMetric[] = [
  { label: "Accuracy", value: 91.7, benchmark: 88.0, color: "#a6cfbe" },
  { label: "Precision", value: 89.4, benchmark: 85.0, color: "#a8cecd" },
  { label: "Recall", value: 93.1, benchmark: 87.0, color: "#00A3FF" },
  { label: "F1 Score", value: 91.2, benchmark: 86.0, color: "#afcdc2" },
  { label: "Stability", value: 96.8, benchmark: 90.0, color: "#FFCE00" },
];

/* ── Live Prediction Feed ─────────────────────────────── */
export interface LivePrediction {
  id: string;
  type: string;
  prediction: string;
  confidence: number;
  severity: "safe" | "moderate" | "high" | "critical";
  timestamp: string;
}

export const LIVE_PREDICTIONS: LivePrediction[] = [
  { id: "P-001", type: "Fish Cluster", prediction: "Tuna aggregation 15nm SW — peak in 48h", confidence: 91, severity: "safe", timestamp: "2s ago" },
  { id: "P-002", type: "Marine Health", prediction: "Sector 7-G stress index rising — 6.8 → 7.4", confidence: 87, severity: "high", timestamp: "14s ago" },
  { id: "P-003", type: "Species Forecast", prediction: "Sardine migration shifting 8nm southward", confidence: 82, severity: "moderate", timestamp: "32s ago" },
  { id: "P-004", type: "Conservation", prediction: "Expand Malvan reef buffer zone by 3nm", confidence: 89, severity: "moderate", timestamp: "1m ago" },
  { id: "P-005", type: "Biodiversity Risk", prediction: "Coral bleaching probability 68% — Sector 4", confidence: 78, severity: "high", timestamp: "2m ago" },
  { id: "P-006", type: "Fish Cluster", prediction: "Mackerel school detected near thermocline 22m", confidence: 84, severity: "safe", timestamp: "4m ago" },
];

/* ── Explainable AI ───────────────────────────────────── */
export interface FeatureImportance {
  feature: string;
  importance: number;
  direction: "positive" | "negative";
}

export const FEATURE_IMPORTANCE: FeatureImportance[] = [
  { feature: "Sea Surface Temperature", importance: 0.28, direction: "negative" },
  { feature: "Chlorophyll-a Density", importance: 0.22, direction: "positive" },
  { feature: "Ocean Current Velocity", importance: 0.18, direction: "positive" },
  { feature: "eDNA Species Richness", importance: 0.14, direction: "positive" },
  { feature: "Historical Catch Density", importance: 0.10, direction: "positive" },
  { feature: "Depth Profile", importance: 0.08, direction: "negative" },
];

/* ── Species Predictions ──────────────────────────────── */
export interface SpeciesPrediction {
  name: string;
  probability: number;
  habitat: "optimal" | "suitable" | "marginal" | "unsuitable";
  migration: string;
  confidence: number;
  color: string;
}

export const SPECIES_PREDICTIONS: SpeciesPrediction[] = [
  { name: "Yellowfin Tuna", probability: 88, habitat: "optimal", migration: "Southward shift — peak season", confidence: 91, color: "#a6cfbe" },
  { name: "Sardine", probability: 72, habitat: "suitable", migration: "Stable nearshore aggregation", confidence: 84, color: "#afcdc2" },
  { name: "Anchovy", probability: 45, habitat: "marginal", migration: "Deeper thermocline retreat", confidence: 78, color: "#a8cecd" },
  { name: "Indian Mackerel", probability: 64, habitat: "suitable", migration: "Upwelling zone congregation", confidence: 82, color: "#719989" },
];

/* ── Recommendations ──────────────────────────────────── */
export interface Recommendation {
  type: "fishing" | "conservation" | "zone" | "risk";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  confidence: number;
}

export const RECOMMENDATIONS: Recommendation[] = [
  { type: "fishing", title: "Optimal Tuna Harvesting Window", description: "Deploy trawlers to Zone Delta-7 within 48h. Peak biomass predicted at 12.4t with 91% confidence.", priority: "high", confidence: 91 },
  { type: "conservation", title: "Coral Reef Emergency Action", description: "Initiate cooling protocols for Sector 7-G. Bleaching threshold approaching at current SST trajectory.", priority: "high", confidence: 87 },
  { type: "zone", title: "Dynamic Zone Expansion", description: "Extend Malvan Marine Sanctuary buffer by 3nm to protect spawning sardine population.", priority: "medium", confidence: 89 },
  { type: "risk", title: "Illegal Fishing Deterrence", description: "Increase patrol frequency in Zone Echo. 2 unregistered vessels flagged with anomalous drift patterns.", priority: "medium", confidence: 94 },
];

/* ── Climate Analytics ────────────────────────────────── */
export interface ClimateKPI {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  severity: "safe" | "warning" | "critical";
}

export const CLIMATE_KPIS: ClimateKPI[] = [
  { label: "Ocean Temperature", value: "+0.8°C", change: "vs 2020 baseline", trend: "up", severity: "warning" },
  { label: "Species Migration", value: "12nm South", change: "Avg displacement", trend: "up", severity: "warning" },
  { label: "Habitat Degradation", value: "18%", change: "Reef area lost", trend: "up", severity: "critical" },
  { label: "Coral Stress", value: "Level 2", change: "NOAA Bleaching", trend: "up", severity: "warning" },
  { label: "Biodiversity Change", value: "-4.2%", change: "Shannon Index", trend: "down", severity: "warning" },
];

export interface FutureProjection {
  year: string;
  sst: string;
  migration: string;
  coralLoss: string;
  biodiversity: string;
  riskZones: number;
  priority: string;
}

export const PROJECTIONS: FutureProjection[] = [
  { year: "2030", sst: "+1.4°C", migration: "25nm S", coralLoss: "32%", biodiversity: "-8.1%", riskZones: 7, priority: "Adaptive zones" },
  { year: "2040", sst: "+2.1°C", migration: "40nm S", coralLoss: "51%", biodiversity: "-14.3%", riskZones: 12, priority: "Emergency corridors" },
  { year: "2050", sst: "+2.8°C", migration: "60nm S", coralLoss: "67%", biodiversity: "-21.6%", riskZones: 18, priority: "Recovery programs" },
];

export const TEMP_TREND = [
  { year: "2020", value: 27.2 }, { year: "2021", value: 27.4 }, { year: "2022", value: 27.5 },
  { year: "2023", value: 27.8 }, { year: "2024", value: 28.0 }, { year: "2025", value: 28.1 },
  { year: "2030", value: 28.6 }, { year: "2040", value: 29.3 }, { year: "2050", value: 30.0 },
];

export const BIODIVERSITY_TREND = [
  { year: "2020", value: 100 }, { year: "2021", value: 98.2 }, { year: "2022", value: 97.1 },
  { year: "2023", value: 96.4 }, { year: "2024", value: 95.8 }, { year: "2025", value: 95.2 },
  { year: "2030", value: 91.9 }, { year: "2040", value: 85.7 }, { year: "2050", value: 78.4 },
];

export interface ClimateRecommendation {
  title: string;
  description: string;
  type: "adaptive" | "seasonal" | "monitoring" | "recovery";
  timeframe: string;
}

export const CLIMATE_RECOMMENDATIONS: ClimateRecommendation[] = [
  { title: "Adaptive Conservation Zones", description: "Shift protected zone boundaries 8nm south annually to track species migration patterns.", type: "adaptive", timeframe: "Ongoing" },
  { title: "Seasonal Fishing Adjustments", description: "Reduce trawling permits by 30% during Jun–Aug to protect spawning populations.", type: "seasonal", timeframe: "Annual" },
  { title: "High-Risk Area Monitoring", description: "Deploy additional buoys in Sectors 4, 7-G, and Delta-7 for continuous SST monitoring.", type: "monitoring", timeframe: "Q1 2025" },
  { title: "Marine Recovery Plan", description: "Establish 5 new no-take zones in identified coral recovery areas with 24/7 enforcement.", type: "recovery", timeframe: "2025–2030" },
];
