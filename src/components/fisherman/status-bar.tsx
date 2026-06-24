"use client";

import { motion } from "framer-motion";
import { Satellite, Navigation, Cpu, Clock, Anchor } from "lucide-react";
import { useVessels } from "@/hooks/use-vessels";

export function StatusBar() {
  const { data: vessels } = useVessels();
  const v = vessels && vessels.length > 0 ? vessels[0] : null;

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
            {v ? v.name : "UNAVAILABLE"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Satellite className="h-3.5 w-3.5 text-on-surface-variant" />
          <motion.span
            className={`h-2 w-2 rounded-full ${v ? gpsColors.strong : gpsColors.weak}`}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="text-on-surface-variant text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            GPS {v ? "STRONG" : "OFFLINE"}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Navigation className="h-3.5 w-3.5 text-on-surface-variant" />
          <span
            className="text-on-surface-variant text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {v ? `${v.latitude.toFixed(4)}° | ${v.longitude.toFixed(4)}°` : "N/A | N/A"}
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
            {v ? `${v.speed}kt / ${v.heading}°` : "N/A / N/A"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-primary" />
          <span
            className="text-primary text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            AI: {v ? "LIVE" : "UNAVAILABLE"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-on-surface-variant" />
          <motion.span
            className="text-secondary text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {v ? "SYNCED" : "OFFLINE"}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
