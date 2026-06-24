"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Dna, Waves, ShieldCheck, HeartPulse, Zap } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function RightIntelPanel({ streams }: { streams: any }) {
  const healthData = streams.marineHealth.data;
  const bioData = streams.biodiversity.data;
  const oceanData = streams.oceanConditions.data;
  const aiData = streams.aiPredictions.data;

  const loading = streams.marineHealth.loading || streams.biodiversity.loading || streams.oceanConditions.loading || streams.aiPredictions.loading;

  if (loading) {
    return (
      <div className="flex flex-col gap-3 h-full items-center justify-center glass-panel rounded-xl">
        <Zap className="h-8 w-8 text-primary/30 animate-pulse mb-2" />
        <span className="text-[10px] text-primary/50 font-mono">SYNCING TWIN INTEL...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-full pr-1 pb-4">
      
      {/* ── Ocean Conditions ────────────── */}
      {oceanData && (
        <motion.div className="glass-panel rounded-xl p-4"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4 text-[#00A3FF]" />
              <h3 className="font-label-caps text-[#00A3FF] text-[11px]">OCEAN CONDITIONS</h3>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[7px] text-on-surface-variant/70">{streams.oceanConditions.source}</span>
              <span className="text-[7px] text-on-surface-variant/70">{streams.oceanConditions.lastUpdated}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="rounded border border-border-glow bg-surface-container-low p-2.5">
              <p className="font-label-caps text-[8px] text-on-surface-variant">SST TEMP</p>
              <p className="text-[#00A3FF] text-lg mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {oceanData.temperature.toFixed(1)}<span className="text-[10px] ml-1">°C</span>
              </p>
            </div>
            <div className="rounded border border-border-glow bg-surface-container-low p-2.5">
              <p className="font-label-caps text-[8px] text-on-surface-variant">CHLOROPHYLL</p>
              <p className="text-status-warning text-lg mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {oceanData.chlorophyll.toFixed(1)}<span className="text-[10px] ml-1">mg/m³</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
             <div className="text-center rounded bg-surface-container-highest/30 p-1.5">
                <span className="block text-[8px] text-on-surface-variant/70">WAVE</span>
                <span className="text-[10px] text-on-surface font-mono">{oceanData.wave_height}m</span>
             </div>
             <div className="text-center rounded bg-surface-container-highest/30 p-1.5">
                <span className="block text-[8px] text-on-surface-variant/70">CURRENT</span>
                <span className="text-[10px] text-on-surface font-mono">{oceanData.current_speed}kt</span>
             </div>
             <div className="text-center rounded bg-surface-container-highest/30 p-1.5">
                <span className="block text-[8px] text-on-surface-variant/70">SALINITY</span>
                <span className="text-[10px] text-on-surface font-mono">{oceanData.salinity}psu</span>
             </div>
          </div>
        </motion.div>
      )}

      {/* ── Ecosystem Health ─────────── */}
      {(healthData && bioData) && (
        <motion.div className="glass-panel rounded-xl p-4"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-label-caps text-primary text-[11px] flex items-center gap-1.5">
              <HeartPulse className="h-3.5 w-3.5" /> MARINE HEALTH
            </h3>
            <div className="flex flex-col items-end">
              <span className="text-[7px] text-on-surface-variant/70">{streams.marineHealth?.source}</span>
              <span className="text-[7px] text-on-surface-variant/70">{streams.marineHealth?.lastUpdated}</span>
            </div>
          </div>
          <motion.div className="space-y-2.5" variants={staggerContainer} initial="hidden" animate="visible">
            {[
              { label: "Overall Health Score", value: healthData.health_score, color: "#a6cfbe" },
              { label: "Biodiversity Health Index", value: bioData.bhi, color: "#4ade80" },
              { label: "Coral Health Index", value: bioData.current.coral_health, color: "#FFCE00" },
              { label: "Water Quality Index", value: bioData.current.water_quality, color: "#00A3FF" }
            ].map((g, i) => (
              <motion.div key={g.label} variants={staggerItem}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] text-on-surface">{g.label}</span>
                  <span className="text-[11px] font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: g.color }}>
                    {g.value.toFixed(1)}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: g.color }}
                    initial={{ width: "0%" }} animate={{ width: `${g.value}%` }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* ── Live Biodiversity ───────────────── */}
      {bioData && (
        <motion.div className="glass-panel rounded-xl p-4"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-label-caps text-primary text-[11px] flex items-center gap-1.5">
              <Dna className="h-3.5 w-3.5" /> BIODIVERSITY OVERVIEW
            </h3>
            <div className="flex flex-col items-end">
              <span className="text-[7px] text-on-surface-variant/70">{streams.biodiversity.source}</span>
              <span className="text-[7px] text-on-surface-variant/70">{streams.biodiversity.lastUpdated}</span>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "HABITAT STABILITY", value: bioData.current.habitat_score.toFixed(1), insight: `Historical trend is currently ${bioData.trends.habitat}.`, color: "text-primary" },
              { label: "ECOSYSTEM THREAT", value: bioData.current.threat_score.toFixed(1), insight: `Threat trajectory identified as ${bioData.trends.threat}.`, color: bioData.trends.threat === "declining" ? "text-status-warning" : "text-primary" },
              { label: "SPECIES RICHNESS", value: bioData.current.species_richness.toString(), insight: "Count based on latest eDNA and acoustic sensing.", color: "text-[#00A3FF]" },
            ].map((m) => (
              <div key={m.label} className="rounded border border-border-glow bg-surface-container-low p-2.5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-label-caps text-[9px] text-on-surface-variant">{m.label}</span>
                  <span className={`text-[12px] font-medium ${m.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.value}</span>
                </div>
                <p className="text-[9px] text-on-surface-variant/70 leading-snug">{m.insight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── AI Center Outputs ──────────────────── */}
      {aiData && (
        <motion.div className="glass-panel rounded-xl p-4"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <h3 className="font-label-caps text-[#FFCE00] text-[11px] mb-3 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> MATSYA ENGINE AI
          </h3>
          <div className="space-y-2">
            {[
              { label: "RISK SCORE", value: `${aiData.risk_score.toFixed(1)} / 100`, color: "text-status-warning" },
              { label: "THREAT LEVEL", value: aiData.threat_level.toUpperCase(), color: "text-status-warning" },
              { label: "FISHING ADVISORY", value: aiData.fishing_advisory.toUpperCase(), color: "text-status-critical" },
              { label: "CONFIDENCE", value: `${aiData.confidence_score}%`, color: "text-primary" }
            ].map((p) => (
              <div key={p.label} className="flex justify-between items-center rounded border border-border-glow bg-surface-container-low p-2.5">
                <span className="font-label-caps text-[8px] text-on-surface-variant">{p.label}</span>
                <span className={`text-[10px] font-bold ${p.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      {/* ── Live Vessels ──────────────────────── */}
      {streams.vessels.data && streams.vessels.data.length > 0 && (
        <motion.div className="glass-panel rounded-xl p-4"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-label-caps text-[#00E5FF] text-[11px] flex items-center gap-1.5">
              <Waves className="h-3.5 w-3.5" /> LIVE VESSELS
            </h3>
            <div className="flex flex-col items-end">
              <span className="text-[7px] text-on-surface-variant/70">{streams.vessels.source}</span>
              <span className="text-[7px] text-on-surface-variant/70">{streams.vessels.lastUpdated}</span>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "TOTAL TRACKED", value: streams.vessels.data.length.toString(), color: "text-[#00E5FF]" },
              { label: "ACTIVE", value: streams.vessels.data.filter((v: any) => v.status === "active").length.toString(), color: "text-primary" },
              { label: "FISHING", value: streams.vessels.data.filter((v: any) => v.activity === "fishing").length.toString(), color: "text-status-warning" },
            ].map((p) => (
              <div key={p.label} className="flex justify-between items-center rounded border border-border-glow bg-surface-container-low p-2.5">
                <span className="font-label-caps text-[8px] text-on-surface-variant">{p.label}</span>
                <span className={`text-[12px] font-bold ${p.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
