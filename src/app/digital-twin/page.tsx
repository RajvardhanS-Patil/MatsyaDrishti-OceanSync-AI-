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
import { ECO_LAYERS, type EcoLayer } from "@/lib/digital-twin-data";

export default function DigitalTwinPage() {
  const [layers, setLayers] = useState<EcoLayer[]>(ECO_LAYERS);
  const [timeValue, setTimeValue] = useState(75);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-surface">
      {/* Minimal top navbar */}
      <Navbar />

      {/* Full-screen immersive viewport */}
      <main className="fixed inset-0 pt-16">
        {/* Digital Twin Canvas (full viewport) */}
        <TwinCanvas layers={layers} timeValue={timeValue} />

        {/* Left floating panels */}
        <div className="absolute left-5 top-20 z-10 w-[260px] space-y-3 bottom-14 overflow-y-auto scrollbar-thin">
          <LayerPanel layers={layers} onToggle={toggleLayer} />
          <TemporalPanel timeValue={timeValue} onTimeChange={setTimeValue} />
        </div>

        {/* Right intelligence panel */}
        <div className="absolute right-5 top-20 bottom-14 z-10 w-[280px]">
          <RightIntelPanel timeValue={timeValue} />
        </div>

        {/* Bottom sensor bar */}
        <SensorStatusBar />
      </main>
    </div>
  );
}
