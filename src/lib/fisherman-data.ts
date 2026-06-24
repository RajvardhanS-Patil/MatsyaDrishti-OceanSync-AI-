/* ──────────────────────────────────────────────────────────
   Fisherman Intelligence Dashboard — Mock Data
   All values are realistic marine intelligence metrics.
   ────────────────────────────────────────────────────────── */

export interface FishingZone {
  id: string;
  name: string;
  matchPercent: number;
  catchPotential: string;
  species: string;
  confidence: "high" | "medium" | "low";
  description: string;
  color: "primary" | "secondary" | "tertiary";
  latitude?: number;
  longitude?: number;
}

export interface SpeciesData {
  name: string;
  probability: number;
  habitat: "optimal" | "moderate" | "low";
  seasonalActivity: "peak" | "active" | "dormant";
  color: string;
}

export interface OceanCondition {
  label: string;
  value: string;
  unit?: string;
  icon: string;
  color: string;
  trend?: "up" | "down" | "stable";
}

export interface AlertData {
  id: string;
  type: "critical" | "warning" | "info" | "notice";
  title: string;
  message: string;
  time: string;
  icon: string;
}

export interface RouteData {
  name: string;
  distance: string;
  fuel: string;
  time: string;
  sustainability: number;
  avoidingZones: number;
}

export interface VesselStatus {
  name: string;
  gpsSignal: "strong" | "moderate" | "weak";
  lat: string;
  lon: string;
  speed: string;
  heading: string;
  engineStatus: "running" | "idle" | "off";
  aiConfidence: number;
  lastUpdate: string;
}

/* ── Fishing Zones ─────────────────────────────────────── */

export const FISHING_ZONES: FishingZone[] = [
  {
    id: "delta-7",
    name: "Zone Delta-7",
    matchPercent: 92,
    catchPotential: "12.4t",
    species: "Yellowfin Tuna",
    confidence: "high",
    description: "Optimal Tuna probability. Thermocline convergence zone detected at 45m depth.",
    color: "primary",
  },
  {
    id: "echo-2",
    name: "Zone Echo-2",
    matchPercent: 68,
    catchPotential: "4.2t",
    species: "Indian Mackerel",
    confidence: "medium",
    description: "Mackerel run detected. Schooling behavior confirmed via sonar at 20m.",
    color: "secondary",
  },
  {
    id: "atlas-4",
    name: "Zone Atlas-4",
    matchPercent: 54,
    catchPotential: "7.8t",
    species: "Sardine",
    confidence: "medium",
    description: "Sardine aggregation near upwelling zone. Chlorophyll density elevated.",
    color: "tertiary",
  },
];

/* ── Species Analysis ──────────────────────────────────── */

export const SPECIES_DATA: SpeciesData[] = [
  {
    name: "Yellowfin Tuna",
    probability: 88,
    habitat: "optimal",
    seasonalActivity: "peak",
    color: "#a6cfbe",
  },
  {
    name: "Sardines",
    probability: 64,
    habitat: "moderate",
    seasonalActivity: "active",
    color: "#afcdc2",
  },
  {
    name: "Indian Mackerel",
    probability: 51,
    habitat: "moderate",
    seasonalActivity: "active",
    color: "#a8cecd",
  },
  {
    name: "Anchovy",
    probability: 37,
    habitat: "low",
    seasonalActivity: "dormant",
    color: "#719989",
  },
];

/* ── Ocean Conditions ──────────────────────────────────── */

export const OCEAN_CONDITIONS: OceanCondition[] = [
  {
    label: "Wave Height",
    value: "1.2",
    unit: "m",
    icon: "Waves",
    color: "text-status-info",
    trend: "stable",
  },
  {
    label: "Temperature",
    value: "28.4",
    unit: "°C",
    icon: "Thermometer",
    color: "text-tertiary",
    trend: "up",
  },
  {
    label: "Salinity",
    value: "35.2",
    unit: "‰",
    icon: "Droplets",
    color: "text-secondary",
    trend: "stable",
  },
  {
    label: "Wind Speed",
    value: "12",
    unit: "kt",
    icon: "Wind",
    color: "text-primary",
    trend: "down",
  },
  {
    label: "Current",
    value: "2.1",
    unit: "kt",
    icon: "Navigation",
    color: "text-status-info",
    trend: "up",
  },
  {
    label: "Chlorophyll",
    value: "4.8",
    unit: "mg/m³",
    icon: "Leaf",
    color: "text-primary",
    trend: "up",
  },
];

/* ── Alerts ────────────────────────────────────────────── */

export const ALERTS: AlertData[] = [
  {
    id: "alert-1",
    type: "critical",
    title: "Weather Alert",
    message: "Cyclonic formation 12nm NE. Advisory to maintain safe harbor distance.",
    time: "2 min ago",
    icon: "AlertTriangle",
  },
  {
    id: "alert-2",
    type: "warning",
    title: "Regulatory Update",
    message: "New restricted zone near Malvan effective 00:00 IST.",
    time: "15 min ago",
    icon: "Gavel",
  },
  {
    id: "alert-3",
    type: "info",
    title: "Protected Zone",
    message: "Approaching coral reef buffer zone. Reduce trawl depth to 15m.",
    time: "30 min ago",
    icon: "ShieldAlert",
  },
  {
    id: "alert-4",
    type: "notice",
    title: "Current Shift",
    message: "Eastward current shift detected. Route recalculation recommended.",
    time: "45 min ago",
    icon: "Compass",
  },
];

/* ── Route Optimizer ───────────────────────────────────── */

export const ROUTE_DATA: RouteData = {
  name: "Eco-Optimized Path",
  distance: "47.3 nm",
  fuel: "140L",
  time: "3h 40m",
  sustainability: 92,
  avoidingZones: 2,
};

/* ── Vessel Status ─────────────────────────────────────── */

export const VESSEL_STATUS: VesselStatus = {
  name: "MV OCEAN HUNTER",
  gpsSignal: "strong",
  lat: "15.4507° N",
  lon: "73.8120° E",
  speed: "8.2 kt",
  heading: "247° WSW",
  engineStatus: "running",
  aiConfidence: 94,
  lastUpdate: "2s ago",
};

/* ── Sidebar Nav Items ─────────────────────────────────── */

export interface SidebarItem {
  label: string;
  icon: string;
  id: string;
  active?: boolean;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Dashboard", icon: "LayoutDashboard", id: "dashboard" },
  { label: "Fish Radar", icon: "Radar", id: "radar", active: true },
  { label: "Route Optimizer", icon: "Route", id: "route" },
  { label: "Ocean Conditions", icon: "Waves", id: "conditions" },
  { label: "Alerts", icon: "Bell", id: "alerts" },
  { label: "Vessel Profile", icon: "Ship", id: "vessel" },
];
