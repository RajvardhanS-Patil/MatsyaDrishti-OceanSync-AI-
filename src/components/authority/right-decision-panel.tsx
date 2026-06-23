"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, Grid3X3, Radio } from "lucide-react";
import { BIODIVERSITY_CHART, MANAGED_ZONES, TELEMETRY_STREAMS } from "@/lib/authority-data";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function RightDecisionPanel() {
  const [zones, setZones] = useState(MANAGED_ZONES);

  const toggleZone = (idx: number) => {
    setZones((prev) => prev.map((z, i) => i === idx ? { ...z, enabled: !z.enabled } : z));
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto pl-1 pb-4">
      {/* ── Biodiversity Threat Chart ─────── */}
      <div className="glass-panel rounded-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-label-caps text-on-surface-variant text-[10px]">Biodiversity Threat Level</h3>
          <AlertTriangle className="h-4 w-4 text-status-warning" />
        </div>
        <div className="flex h-28 items-end gap-1 px-1">
          {BIODIVERSITY_CHART.map((d, i) => {
            const isHighest = d.threat >= 80;
            return (
              <motion.div key={d.week} className="flex-1 group relative"
                initial={{ height: 0 }} animate={{ height: `${d.threat}%` }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}>
                <div className={`h-full w-full rounded-t transition-all ${
                  isHighest ? "bg-status-warning/80" : "bg-surface-container-highest hover:bg-primary/40"
                }`} />
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-on-surface whitespace-nowrap"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {d.threat}%
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-on-surface-variant" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <span>WK 01</span><span>WK 07</span>
        </div>
      </div>

      {/* ── Zone Management ───────────────── */}
      <div className="glass-panel rounded-lg p-5">
        <h3 className="font-label-caps text-primary mb-3 flex items-center gap-2 text-[11px]">
          <Grid3X3 className="h-4 w-4" /> Zone Management
        </h3>
        <motion.div className="space-y-2.5" variants={staggerContainer} initial="hidden" animate="visible">
          {zones.map((zone, i) => {
            const statusColor = zone.status === "active" ? "text-status-info" : zone.status === "revision" ? "text-status-warning" : "text-on-surface-variant";
            return (
              <motion.div key={zone.name} variants={staggerItem}
                className="flex items-center justify-between rounded border border-border-glow bg-surface-container-low p-3">
                <div>
                  <span className="text-on-surface text-[12px]">{zone.name}</span>
                  <span className={`block font-label-caps text-[8px] mt-0.5 ${statusColor}`}>{zone.statusLabel}</span>
                </div>
                <motion.button onClick={() => toggleZone(i)}
                  className={`relative h-5 w-10 rounded-full px-1 flex items-center transition-colors cursor-pointer ${
                    zone.enabled ? "bg-primary/40" : "bg-surface-container-highest"
                  }`}
                  whileTap={{ scale: 0.95 }}>
                  <motion.div className={`h-3 w-3 rounded-full ${zone.enabled ? "bg-primary" : "bg-on-surface-variant"}`}
                    animate={{ x: zone.enabled ? 18 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Ecosystem Telemetry Sparklines ── */}
      <div className="glass-panel rounded-lg p-5 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-label-caps text-on-surface-variant text-[10px]">Ecosystem Telemetry</h3>
          <Radio className="h-4 w-4 text-on-surface-variant/50" />
        </div>
        <div className="space-y-4">
          {TELEMETRY_STREAMS.map((stream, i) => (
            <div key={stream.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-caps text-[9px] text-on-surface-variant">{stream.label}</span>
                <span className="text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace", color: stream.color }}>
                  {stream.value}{stream.unit}
                </span>
              </div>
              {/* SVG Sparkline */}
              <div className="h-7 w-full">
                <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <motion.polyline
                    fill="none" stroke={stream.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    points={stream.sparkline.map((v, j) => `${(j / (stream.sparkline.length - 1)) * 100},${20 - v}`).join(" ")}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
