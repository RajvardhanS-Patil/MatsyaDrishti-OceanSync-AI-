import { useMarineHealth } from "./use-marine-health";
import { useBiodiversity } from "./use-biodiversity";
import { useOceanConditions } from "./use-ocean-conditions";
import { useAlerts } from "./use-alerts";
import { useFishingZones } from "./use-fishing-zones";
import { useVessels } from "./use-vessels";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: "fishing" | "conservation" | "zone" | "risk";
  priority: "high" | "medium" | "low";
  confidence: number;
  dataSources: string[];
  reasoning: string;
}

export function useMatsyaEngine() {
  const { data: healthData, loading: healthLoading } = useMarineHealth();
  const { data: bioData, loading: bioLoading } = useBiodiversity();
  const { data: oceanData, loading: oceanLoading } = useOceanConditions();
  const { data: alertsData, loading: alertsLoading } = useAlerts();
  const { data: zonesData, loading: zonesLoading } = useFishingZones();
  const { data: vesselsData, loading: vesselsLoading } = useVessels();

  const loading = healthLoading || bioLoading || oceanLoading || alertsLoading || zonesLoading || vesselsLoading;

  // Active Streams Count
  const streams = [healthData, bioData, oceanData, alertsData, zonesData, vesselsData];
  const activeStreamsCount = streams.filter((s) => s !== null).length;

  // Confidence Score
  let confidenceScore = 100;
  const missingStreams = 6 - activeStreamsCount;
  confidenceScore -= missingStreams * 15;
  if (confidenceScore < 0) confidenceScore = 0;

  let riskScore = 0;
  let riskLevel = "Low";
  let threatLevel = "Stable";
  let fishingAdvisory = "Recommended";
  const recommendations: Recommendation[] = [];

  if (!loading && healthData && bioData && oceanData) {
    // 1. Weighted Ecological Risk Score
    const ecosystemRisk = 100 - healthData.health_score;
    const biodiversityRisk = 100 - bioData.bhi;
    
    // Ocean Condition Risk (Temp > 29C is bad, Wave > 3m is bad)
    let oceanRisk = 0;
    if (oceanData.temperature > 28) oceanRisk += (oceanData.temperature - 28) * 10;
    if (oceanData.wave_height > 2) oceanRisk += (oceanData.wave_height - 2) * 15;
    oceanRisk = Math.min(100, Math.max(0, oceanRisk));

    // Alert Risk
    let alertRisk = 0;
    if (alertsData) {
      const criticalCount = alertsData.filter((a) => a.severity === "critical" || a.severity === "high").length;
      alertRisk = Math.min(100, criticalCount * 25);
    }

    // Vessel Risk
    let vesselRisk = 0;
    if (vesselsData) {
      const violators = vesselsData.filter((v) => v.compliance !== "compliant").length;
      vesselRisk = Math.min(100, (violators / vesselsData.length) * 100);
    }

    riskScore = 
      (ecosystemRisk * 0.30) + 
      (biodiversityRisk * 0.25) + 
      (oceanRisk * 0.20) + 
      (alertRisk * 0.15) + 
      (vesselRisk * 0.10);

    if (riskScore > 75) riskLevel = "Critical";
    else if (riskScore > 50) riskLevel = "High";
    else if (riskScore > 25) riskLevel = "Moderate";
    else riskLevel = "Low";

    // 2. Biodiversity Threat Engine
    const threatVal = bioData.current.threat_score;
    const coralHealth = bioData.current.coral_health;
    const waterQuality = bioData.current.water_quality;
    
    if (threatVal > 75 && coralHealth < 60) threatLevel = "Critical";
    else if (bioData.trends.threat === "declining") threatLevel = "Declining";
    else if (bioData.trends.threat === "improving") threatLevel = "Improving";
    else threatLevel = "Stable";

    // 3. Fishing Advisory Engine
    let avgFishProb = 50;
    if (zonesData && zonesData.length > 0) {
      avgFishProb = zonesData.reduce((acc, z) => acc + z.matchPercent, 0) / zonesData.length;
    }

    if (oceanData.wave_height > 4.0 || oceanData.wind_speed > 30 || alertRisk > 50) {
      fishingAdvisory = "Avoid";
    } else if (oceanData.wave_height > 2.5 || oceanData.wind_speed > 20 || avgFishProb < 40) {
      fishingAdvisory = "Caution";
    } else {
      fishingAdvisory = "Recommended";
    }

    // 4. Conservation Recommendation Engine
    if (riskScore > 70) {
      recommendations.push({
        id: "REC-01",
        title: "Temporary Fishing Restriction",
        description: "Critical ecosystem risk detected across multiple metrics. Temporary halt required to prevent cascading collapse.",
        type: "fishing",
        priority: "high",
        confidence: Math.round(confidenceScore * 0.95),
        dataSources: ["marine_health", "biodiversity_metrics", "alerts"],
        reasoning: `Risk score elevated to ${riskScore.toFixed(1)}/100 driven by high active alert density and dropping ecosystem stability.`
      });
    }

    if (coralHealth < 60 || oceanData.temperature > 29) {
      recommendations.push({
        id: "REC-02",
        title: "Coral Protection Zone Expansion",
        description: "Coral health dropping below safe thresholds compounded by thermal stress.",
        type: "conservation",
        priority: "high",
        confidence: Math.round(confidenceScore * 0.88),
        dataSources: ["biodiversity_metrics", "ocean_conditions"],
        reasoning: `SST measured at ${oceanData.temperature.toFixed(1)}°C causing bleaching risk. Coral health index at ${coralHealth.toFixed(1)}.`
      });
    }

    if (bioData.bhi < 65) {
      recommendations.push({
        id: "REC-03",
        title: "Biodiversity Monitoring Increase",
        description: "Significant drop in species richness and habitat stability.",
        type: "zone",
        priority: "medium",
        confidence: Math.round(confidenceScore * 0.92),
        dataSources: ["biodiversity_metrics"],
        reasoning: `Biodiversity Health Index (BHI) fell to ${bioData.bhi.toFixed(1)}. eDNA surveillance glider deployment recommended.`
      });
    }

    if (waterQuality < 70 || oceanData.chlorophyll > 5.0) {
      recommendations.push({
        id: "REC-04",
        title: "Water Quality Intervention",
        description: "Chlorophyll and pH levels outside normal bounds indicating potential algal bloom.",
        type: "risk",
        priority: "medium",
        confidence: Math.round(confidenceScore * 0.85),
        dataSources: ["biodiversity_metrics", "ocean_conditions"],
        reasoning: `Chlorophyll spiked to ${oceanData.chlorophyll.toFixed(1)} mg/m³. Water quality index at ${waterQuality.toFixed(1)}.`
      });
    }

    // Fallback if no critical recommendations
    if (recommendations.length === 0) {
      recommendations.push({
        id: "REC-05",
        title: "Maintain Standard Operations",
        description: "All ecological metrics within acceptable bounds.",
        type: "conservation",
        priority: "low",
        confidence: confidenceScore,
        dataSources: ["marine_health", "biodiversity_metrics", "ocean_conditions", "fishing_zones", "vessels", "alerts"],
        reasoning: `Overall risk score is ${riskScore.toFixed(1)}/100. Ecosystem is stable.`
      });
    }
  }

  return {
    loading,
    activeStreamsCount,
    confidenceScore,
    riskScore,
    riskLevel,
    threatLevel,
    fishingAdvisory,
    recommendations,
    // Provide stream status for UI
    streams: {
      marineHealth: healthData !== null,
      biodiversity: bioData !== null,
      oceanConditions: oceanData !== null,
      alerts: alertsData !== null,
      fishingZones: zonesData !== null,
      vessels: vesselsData !== null,
    }
  };
}
