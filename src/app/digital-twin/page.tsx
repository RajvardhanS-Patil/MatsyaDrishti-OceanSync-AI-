"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import {
  LayerPanel,
  TemporalPanel,
  TwinCanvas,
  RightIntelPanel,
  SensorStatusBar,
} from "@/components/digital-twin";

import { useMarineHealth } from "@/hooks/use-marine-health";
import { useBiodiversity } from "@/hooks/use-biodiversity";
import { useOceanConditions } from "@/hooks/use-ocean-conditions";
import { useVessels } from "@/hooks/use-vessels";
import { useAlerts } from "@/hooks/use-alerts";
import { useAIPredictions } from "@/hooks/use-ai-predictions";

export interface TwinLayer {
  id: string;
  label: string;
  icon: string;
  color: string;
  enabled: boolean;
}

const INITIAL_LAYERS: TwinLayer[] = [
  { id: "marine_health", label: "Marine Health", icon: "HeartPulse", color: "#a6cfbe", enabled: true },
  { id: "biodiversity", label: "Biodiversity", icon: "Dna", color: "#4ade80", enabled: true },
  { id: "ocean_conditions", label: "Ocean Conditions", icon: "Waves", color: "#00A3FF", enabled: true },
  { id: "vessels", label: "Vessel Tracking", icon: "Ship", color: "#a8cecd", enabled: true },
  { id: "alerts", label: "Live Alerts", icon: "AlertTriangle", color: "#FF3B30", enabled: true },
  { id: "ai_risk", label: "AI Risk Overlay", icon: "Shield", color: "#FFCE00", enabled: false }
];

export default function DigitalTwinPage() {
  const [layers, setLayers] = useState<TwinLayer[]>(INITIAL_LAYERS);
  const [timeValue, setTimeValue] = useState(75);

  // Lift state up to prevent multiple API calls across twin components
  const { data: healthData, loading: hl } = useMarineHealth();
  const { data: bioData, loading: bl, source: bSource, lastUpdated: bLastUpdated } = useBiodiversity();
  const { data: oceanData, loading: ol, source: osource, lastUpdated: oLastUpdated } = useOceanConditions();
  const { data: vesselsData, loading: vl, source: vSource, lastUpdated: vLastUpdated } = useVessels();
  const { data: alertsData, loading: al } = useAlerts();
  const { data: aiData, loading: ail } = useAIPredictions();

  const streams = {
    marineHealth: { data: healthData, loading: hl },
    biodiversity: { data: bioData, loading: bl, source: bSource, lastUpdated: bLastUpdated },
    oceanConditions: { data: oceanData, loading: ol, source: osource, lastUpdated: oLastUpdated },
    vessels: { data: vesselsData, loading: vl, source: vSource, lastUpdated: vLastUpdated },
    alerts: { data: alertsData, loading: al },
    aiPredictions: { data: aiData, loading: ail }
  };

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-surface">
      <Navbar />

      <main className="fixed inset-0 pt-16">
        <TwinCanvas layers={layers} timeValue={timeValue} streams={streams} />

        <div className="absolute left-5 top-20 z-10 w-[260px] space-y-3 bottom-14 overflow-y-auto scrollbar-thin">
          <LayerPanel layers={layers} onToggle={toggleLayer} />
          <TemporalPanel timeValue={timeValue} onTimeChange={setTimeValue} />
        </div>

        <div className="absolute right-5 top-20 bottom-14 z-10 w-[280px]">
          <RightIntelPanel streams={streams} />
        </div>

        <SensorStatusBar streams={streams} />
      </main>
    </div>
  );
}
