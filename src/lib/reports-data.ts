/* ──────────────────────────────────────────────────────────
   Reports & Executive Decision Center — Mock Data
   Aggregates intelligence from all modules.
   ────────────────────────────────────────────────────────── */

/* ── Executive KPIs ───────────────────────────────────── */
export interface ExecKPI {
  label: string;
  value: string;
  unit?: string;
  status: "healthy" | "warning" | "critical";
  change: string;
}

export const EXEC_KPIS: ExecKPI[] = [
  { label: "Marine Health", value: "84.2", unit: "/100", status: "healthy", change: "+2.1 (7d)" },
  { label: "Biodiversity", value: "72.8", unit: "/100", status: "warning", change: "−1.4 (7d)" },
  { label: "Climate Risk", value: "MODERATE", status: "warning", change: "Stable" },
  { label: "Fishing Productivity", value: "92.4", unit: "%", status: "healthy", change: "+5.3 (30d)" },
  { label: "Conservation Score", value: "78.6", unit: "/100", status: "healthy", change: "+3.8 (30d)" },
  { label: "AI Confidence", value: "89.3", unit: "%", status: "healthy", change: "Stable" },
];

/* ── Executive Briefing ───────────────────────────────── */
export interface BriefingCard {
  category: "status" | "risk" | "opportunity" | "action";
  title: string;
  items: string[];
}

export const BRIEFINGS: BriefingCard[] = [
  { category: "status", title: "Current Ecosystem Status", items: [
    "Marine health stable at 84.2 — improving trend over 30 days",
    "12 active data streams feeding Matsya Engine in real-time",
    "4/5 sensor stations online with 99.9% uptime",
    "847 active fishing vessels tracked across 14 protected zones",
  ]},
  { category: "risk", title: "Top Risks", items: [
    "Coral bleaching probability 68% in Sector 7-G (SST anomaly)",
    "Biodiversity index declining — 3 new threatened species detected via eDNA",
    "Cyclone formation probability 42% — Bay of Bengal monitoring active",
    "2 unregistered vessels detected in protected Marine Sanctuary",
  ]},
  { category: "opportunity", title: "Top Opportunities", items: [
    "Tuna aggregation forecast — 12.4t biomass predicted 15nm SW in 48h",
    "Sardine population recovery in rehabilitated mangrove zone",
    "Coral recovery rate 14% in areas with enforced no-trawl buffer",
    "eDNA sampling reveals 247 species — above seasonal average",
  ]},
  { category: "action", title: "Recommended Actions", items: [
    "Deploy trawlers to Zone Delta-7 within 48h for optimal tuna harvest",
    "Initiate cooling protocols for Sector 7-G coral reef preservation",
    "Extend Malvan Sanctuary buffer by 3nm to protect sardine spawning",
    "Increase patrol frequency in Zone Echo — illegal activity flagged",
  ]},
];

/* ── Report Types ─────────────────────────────────────── */
export interface ReportType {
  id: string;
  title: string;
  description: string;
  lastGenerated: string;
  status: "ready" | "generating" | "scheduled";
  pages: number;
}

export const REPORT_TYPES: ReportType[] = [
  { id: "marine-health", title: "Marine Health Report", description: "Comprehensive ecosystem health assessment with trend analysis", lastGenerated: "2h ago", status: "ready", pages: 24 },
  { id: "biodiversity", title: "Biodiversity Report", description: "Species richness, eDNA analysis, and population dynamics", lastGenerated: "6h ago", status: "ready", pages: 18 },
  { id: "climate", title: "Climate Impact Report", description: "SST trends, migration shifts, coral stress, and 2030-2050 projections", lastGenerated: "1d ago", status: "ready", pages: 32 },
  { id: "fishing", title: "Fishing Productivity Report", description: "Catch analytics, zone performance, and sustainability metrics", lastGenerated: "4h ago", status: "ready", pages: 16 },
  { id: "conservation", title: "Conservation Report", description: "Protected area effectiveness, species recovery, and habitat restoration", lastGenerated: "12h ago", status: "ready", pages: 22 },
  { id: "compliance", title: "Compliance Audit", description: "Zone violations, permit compliance, regulatory actions, and resolution", lastGenerated: "3h ago", status: "ready", pages: 14 },
];

/* ── Historical Trends ────────────────────────────────── */
export interface TrendPoint { month: string; value: number }

export const MARINE_HEALTH_TREND: TrendPoint[] = [
  { month: "Jan", value: 79 }, { month: "Feb", value: 80 }, { month: "Mar", value: 78 },
  { month: "Apr", value: 81 }, { month: "May", value: 82 }, { month: "Jun", value: 80 },
  { month: "Jul", value: 83 }, { month: "Aug", value: 82 }, { month: "Sep", value: 84 },
  { month: "Oct", value: 83 }, { month: "Nov", value: 84 }, { month: "Dec", value: 84.2 },
];

export const FISH_POP_TREND: TrendPoint[] = [
  { month: "Jan", value: 68 }, { month: "Feb", value: 70 }, { month: "Mar", value: 74 },
  { month: "Apr", value: 78 }, { month: "May", value: 82 }, { month: "Jun", value: 85 },
  { month: "Jul", value: 88 }, { month: "Aug", value: 86 }, { month: "Sep", value: 84 },
  { month: "Oct", value: 82 }, { month: "Nov", value: 80 }, { month: "Dec", value: 78 },
];

export const BIO_TREND: TrendPoint[] = [
  { month: "Jan", value: 76 }, { month: "Feb", value: 75 }, { month: "Mar", value: 74.8 },
  { month: "Apr", value: 74.2 }, { month: "May", value: 73.8 }, { month: "Jun", value: 73.5 },
  { month: "Jul", value: 73.1 }, { month: "Aug", value: 73 }, { month: "Sep", value: 72.8 },
  { month: "Oct", value: 73.2 }, { month: "Nov", value: 73 }, { month: "Dec", value: 72.8 },
];

/* ── Conservation Impact ──────────────────────────────── */
export interface ConservationMetric {
  label: string;
  before: number;
  after: number;
  unit: string;
  improvement: string;
}

export const CONSERVATION_METRICS: ConservationMetric[] = [
  { label: "Protected Area Effectiveness", before: 54, after: 78, unit: "%", improvement: "+24%" },
  { label: "Species Recovery Index", before: 42, after: 67, unit: "/100", improvement: "+25 pts" },
  { label: "Habitat Restoration", before: 18, after: 41, unit: "km²", improvement: "+128%" },
  { label: "Coral Health Recovery", before: 38, after: 62, unit: "%", improvement: "+24%" },
];

/* ── Compliance ───────────────────────────────────────── */
export interface ComplianceItem {
  label: string;
  value: string;
  score: number;
  severity: "safe" | "warning" | "critical";
}

export const COMPLIANCE_DATA: ComplianceItem[] = [
  { label: "Zone Violations", value: "7 incidents", score: 82, severity: "warning" },
  { label: "Fishing Permits", value: "94% compliant", score: 94, severity: "safe" },
  { label: "Regulatory Actions", value: "12 enforced", score: 88, severity: "safe" },
  { label: "Incident Resolution", value: "89% resolved", score: 89, severity: "safe" },
  { label: "Overall Compliance", value: "Grade A−", score: 88, severity: "safe" },
];

/* ── Strategic Recommendations ────────────────────────── */
export interface StratRec {
  audience: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  impact: string;
  confidence: number;
  timeHorizon: string;
}

export const STRATEGIC_RECS: StratRec[] = [
  { audience: "Government Agencies", title: "Expand Dynamic Marine Protected Areas", description: "Use AI-driven migration forecasts to adjust protected zone boundaries seasonally.", priority: "high", impact: "32% increase in species coverage", confidence: 89, timeHorizon: "6–12 months" },
  { audience: "Researchers", title: "Deploy eDNA Rapid Assessment Network", description: "Establish 15 new eDNA sampling stations across critical biodiversity corridors.", priority: "high", impact: "3x improvement in species detection", confidence: 91, timeHorizon: "3–6 months" },
  { audience: "Conservation Authorities", title: "Coral Reef Emergency Protocol", description: "Initiate thermal stress mitigation in Sector 7-G with shading and cooling systems.", priority: "high", impact: "Prevent 68% bleaching probability", confidence: 87, timeHorizon: "Immediate" },
  { audience: "Fishing Communities", title: "Sustainable Catch Optimization", description: "Leverage Matsya Engine forecasts for 48h advance fishing zone recommendations.", priority: "medium", impact: "22% increase in catch efficiency", confidence: 91, timeHorizon: "Ongoing" },
];

/* ── Mission Timeline ─────────────────────────────────── */
export interface TimelineEvent {
  date: string;
  type: "alert" | "climate" | "policy" | "recovery" | "success";
  title: string;
  description: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { date: "Jun 2025", type: "alert", title: "Marine Stress Alert — Sector 7-G", description: "SST anomaly detected +0.8°C above seasonal baseline. Coral bleaching watch initiated." },
  { date: "May 2025", type: "success", title: "Sardine Recovery Milestone", description: "Sardine population in rehabilitated mangrove zone reached 180,000 — 40% above 2023 levels." },
  { date: "Apr 2025", type: "policy", title: "Dynamic Zone Expansion Enacted", description: "Malvan Sanctuary buffer extended 3nm. No-trawl enforcement activated." },
  { date: "Mar 2025", type: "climate", title: "Bay of Bengal Cyclone Season Prep", description: "Pre-season monitoring deployed. 12 additional buoys activated." },
  { date: "Feb 2025", type: "recovery", title: "Coral Restoration Phase 2 Complete", description: "4.2 km² of degraded reef restored using AI-optimized transplantation patterns." },
  { date: "Jan 2025", type: "success", title: "MatsyaDrishti v4.2 Launch", description: "Matsya Engine upgraded to Deep Ensemble v3.2. Prediction accuracy improved to 91.7%." },
];
