"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, Grid3X3, Radio, Leaf, TrendingUp, TrendingDown, Minus, ShieldAlert, Zap } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useBiodiversity } from "@/hooks/use-biodiversity";
import { useVessels } from "@/hooks/use-vessels";
import { useFishingZones } from "@/hooks/use-fishing-zones";
import { useOceanConditions } from "@/hooks/use-ocean-conditions";
import { Ship } from "lucide-react";

const trendIcon = { improving: TrendingUp, declining: TrendingDown, stable: Minus };
const trendColor = { improving: "text-primary", declining: "text-status-critical", stable: "text-on-surface-variant" };

export function RightDecisionPanel() {
  const { data: bioData, loading: bioLoading, error: bioError, source, lastUpdated } = useBiodiversity();
  const { data: vesselData, source: vSource, lastUpdated: vLastUpdated } = useVessels();
  const { data: zonesData, loading: zonesLoading, error: zonesError } = useFishingZones();
  const { data: oceanData } = useOceanConditions();

  // Build chart data from history (oldest to newest for left-to-right chart)
  const chartData = bioData 
    ? [...bioData.history].reverse().map((row, i) => ({
        week: `WK0${i+1}`,
        threat: row.threat_score
      }))
    : [];

  return (
    <div className="flex flex-col gap-4 overflow-y-auto pl-1 pb-4">
      {/* ── Biodiversity Intelligence ─────── */}
      <div className="glass-panel rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-label-caps text-on-surface-variant text-[10px]">Biodiversity Intelligence</h3>
          {!bioLoading && !bioError && (
            <div className="flex flex-col items-end">
              <span className="font-label-caps text-[9px] text-primary flex items-center gap-1.5">
                <motion.span className="h-1.5 w-1.5 rounded-full bg-primary" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                LIVE
              </span>
              <span className="text-[7px] text-on-surface-variant/70 mt-1">{source}</span>
              <span className="text-[7px] text-on-surface-variant/70">{lastUpdated}</span>
            </div>
          )}
        </div>

        {bioLoading ? (
          <div className="flex h-40 flex-col items-center justify-center gap-3">
             <div className="h-6 w-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
             <span className="text-primary/50 text-[10px] font-mono animate-pulse">[FETCHING BIODIVERSITY...]</span>
          </div>
        ) : bioError ? (
          <div className="flex h-40 flex-col items-center justify-center text-status-critical">
             <Zap className="h-5 w-5 mb-2 opacity-50" />
             <span className="text-[10px] font-mono">CONNECTION LOST</span>
          </div>
        ) : bioData && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
            
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* BHI Score */}
              <motion.div variants={staggerItem} className="rounded border border-border-glow bg-surface-container-low p-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-label-caps text-[9px] text-on-surface-variant block mb-1">Health Index (BHI)</span>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {bioData.bhi.toFixed(1)}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="font-label-caps text-[9px] mb-0.5">{bioData.status}</span>
                    <span className="text-[9px] flex items-center gap-1 text-on-surface-variant">
                       {(() => {
                         const Icon = trendIcon[bioData.trends.bhi];
                         return <Icon className={`h-3 w-3 ${trendColor[bioData.trends.bhi]}`} />;
                       })()}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Habitat Stability */}
              <motion.div variants={staggerItem} className="rounded border border-border-glow bg-surface-container-low p-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-label-caps text-[9px] text-on-surface-variant block mb-1">Habitat Stability</span>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-on-surface" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {bioData.current.habitat_score.toFixed(1)}
                  </span>
                  <span className="text-[9px] flex items-center gap-1 text-on-surface-variant">
                     {(() => {
                       const Icon = trendIcon[bioData.trends.habitat];
                       return <Icon className={`h-3 w-3 ${trendColor[bioData.trends.habitat]}`} />;
                     })()}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Threat Indicator */}
            <motion.div variants={staggerItem} className="flex items-center justify-between rounded border border-status-warning/20 bg-status-warning/5 p-3">
               <div className="flex items-center gap-2">
                 <ShieldAlert className="h-4 w-4 text-status-warning" />
                 <span className="font-label-caps text-[10px] text-status-warning">Ecosystem Threat</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-sm font-bold text-status-warning" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                   {bioData.current.threat_score.toFixed(1)}
                 </span>
                 <div className="flex items-center gap-1 rounded bg-surface-container-highest px-1.5 py-0.5">
                   {(() => {
                     const Icon = trendIcon[bioData.trends.threat];
                     return <Icon className={`h-3 w-3 ${trendColor[bioData.trends.threat]}`} />;
                   })()}
                 </div>
               </div>
            </motion.div>

            {/* Threat Chart */}
            <motion.div variants={staggerItem} className="pt-2">
              <span className="font-label-caps text-[9px] text-on-surface-variant block mb-2">Threat Evolution Timeline</span>
              <div className="flex h-20 items-end gap-1 px-1">
                {chartData.map((d, i) => {
                  const isHighest = d.threat >= 60;
                  return (
                    <motion.div key={d.week} className="flex-1 group relative"
                      initial={{ height: 0 }} animate={{ height: `${d.threat}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}>
                      <div className={`h-full w-full rounded-t transition-all ${
                        isHighest ? "bg-status-warning/80" : "bg-surface-container-highest hover:bg-primary/40"
                      }`} />
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-on-surface whitespace-nowrap"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {d.threat}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-[8px] text-on-surface-variant" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <span>{chartData[0]?.week}</span><span>{chartData[chartData.length-1]?.week}</span>
              </div>
            </motion.div>

          </motion.div>
        )}
      </div>

      {/* ── Vessel Intelligence ───────────────── */}
      {vesselData && vesselData.length > 0 && (
        <div className="glass-panel rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-label-caps text-on-surface-variant text-[10px] flex items-center gap-1.5">
              <Ship className="h-3.5 w-3.5 text-[#00E5FF]" /> Vessel Intelligence
            </h3>
            <div className="flex flex-col items-end">
              <span className="text-[7px] text-on-surface-variant/70">{vSource}</span>
              <span className="text-[7px] text-on-surface-variant/70">{vLastUpdated}</span>
            </div>
          </div>
          <motion.div className="grid grid-cols-2 gap-2" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={staggerItem} className="rounded border border-border-glow bg-surface-container-low p-2.5">
              <p className="font-label-caps text-[8px] text-on-surface-variant">TOTAL LIVE</p>
              <p className="text-[#00E5FF] text-lg mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {vesselData.length}
              </p>
            </motion.div>
            <motion.div variants={staggerItem} className="rounded border border-border-glow bg-surface-container-low p-2.5">
              <p className="font-label-caps text-[8px] text-on-surface-variant">ACTIVE NOW</p>
              <p className="text-primary text-lg mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {vesselData.filter((v: any) => v.status === "active").length}
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* ── Zone Management ───────────────── */}
      <div className="glass-panel rounded-lg p-5">
        <h3 className="font-label-caps text-primary mb-3 flex items-center gap-2 text-[11px]">
          <Grid3X3 className="h-4 w-4" /> Zone Management
        </h3>
        {zonesLoading ? (
           <span className="text-[10px] text-on-surface-variant font-mono">LOADING ZONES...</span>
        ) : zonesError || !zonesData || zonesData.length === 0 ? (
           <span className="text-[10px] text-on-surface-variant font-mono">DATA UNAVAILABLE</span>
        ) : (
          <motion.div className="space-y-2.5" variants={staggerContainer} initial="hidden" animate="visible">
            {zonesData.map((zone, i) => {
              const statusColor = zone.zone_status === "active" ? "text-status-info" : "text-status-warning";
              return (
                <motion.div key={zone.id} variants={staggerItem}
                  className="flex items-center justify-between rounded border border-border-glow bg-surface-container-low p-3">
                  <div>
                    <span className="text-on-surface text-[12px]">{zone.name}</span>
                    <span className={`block font-label-caps text-[8px] mt-0.5 ${statusColor}`}>{zone.zone_status?.toUpperCase() || "ACTIVE"}</span>
                  </div>
                  <motion.button
                    className={`relative h-5 w-10 rounded-full px-1 flex items-center transition-colors cursor-pointer ${
                      zone.zone_status === "active" ? "bg-primary/40" : "bg-surface-container-highest"
                    }`}
                    whileTap={{ scale: 0.95 }}>
                    <motion.div className={`h-3 w-3 rounded-full ${zone.zone_status === "active" ? "bg-primary" : "bg-on-surface-variant"}`}
                      animate={{ x: zone.zone_status === "active" ? 18 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* ── Ecosystem Telemetry ── */}
      <div className="glass-panel rounded-lg p-5 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-label-caps text-on-surface-variant text-[10px]">Ecosystem Telemetry</h3>
          <Radio className="h-4 w-4 text-on-surface-variant/50" />
        </div>
        {bioData && oceanData ? (
          <div className="space-y-4">
             <div className="flex items-center justify-between mb-1">
               <span className="font-label-caps text-[9px] text-on-surface-variant">SST Anomaly</span>
               <span className="text-[11px] font-mono text-[#00A3FF]">{oceanData.temperature.toFixed(1)}°C</span>
             </div>
             <div className="flex items-center justify-between mb-1">
               <span className="font-label-caps text-[9px] text-on-surface-variant">Threat Level</span>
               <span className="text-[11px] font-mono text-status-warning">{bioData.current.threat_score.toFixed(1)}/100</span>
             </div>
             <div className="flex items-center justify-between mb-1">
               <span className="font-label-caps text-[9px] text-on-surface-variant">Wave Energy</span>
               <span className="text-[11px] font-mono text-primary">{oceanData.wave_height.toFixed(1)}m</span>
             </div>
          </div>
        ) : (
           <span className="text-[10px] text-on-surface-variant font-mono">DATA UNAVAILABLE</span>
        )}
      </div>
    </div>
  );
}
