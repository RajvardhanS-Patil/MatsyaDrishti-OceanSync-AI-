"use client";

import { motion } from "framer-motion";
import { Satellite, Navigation, Cpu, Clock, Anchor } from "lucide-react";
import { VESSEL_STATUS } from "@/lib/fisherman-data";

export function StatusBar() {
  const gpsColors = {
    strong: "bg-primary",
    moderate: "bg-status-warning",
    weak: "bg-status-critical",
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-10 items-center justify-between border-t border-outline-variant bg-surface-container-lowest px-6">
      {/* Left: Vessel & GPS */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Anchor className="h-3.5 w-3.5 text-primary" />
          <span
            className="text-on-surface text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {VESSEL_STATUS.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Satellite className="h-3.5 w-3.5 text-on-surface-variant" />
          <motion.span
            className={`h-2 w-2 rounded-full ${gpsColors[VESSEL_STATUS.gpsSignal]}`}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="text-on-surface-variant text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            GPS {VESSEL_STATUS.gpsSignal.toUpperCase()}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Navigation className="h-3.5 w-3.5 text-on-surface-variant" />
          <span
            className="text-on-surface-variant text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {VESSEL_STATUS.lat} | {VESSEL_STATUS.lon}
          </span>
        </div>
      </div>

      {/* Right: AI Confidence & Last Update */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2">
          <span
            className="text-on-surface-variant text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {VESSEL_STATUS.speed} · {VESSEL_STATUS.heading}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-primary" />
          <span
            className="text-primary text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            AI: {VESSEL_STATUS.aiConfidence}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-on-surface-variant" />
          <motion.span
            className="text-secondary text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Updated {VESSEL_STATUS.lastUpdate}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
