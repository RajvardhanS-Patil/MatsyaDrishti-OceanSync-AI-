"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Minus, Plus, ZoomIn, Crosshair, Dna, Satellite, AlertTriangle } from "lucide-react";
import { SECTOR_DATA, HEALTH_GAUGES, EDNA_METRICS, AI_PREDICTIONS, CLIMATE_METRICS, SENSOR_FEEDS } from "@/lib/digital-twin-data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };
const severityColor = { safe: "text-primary", moderate: "text-status-warning", high: "text-status-critical", critical: "text-status-critical" };

export function RightIntelPanel() {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-full pr-1">
      {/* ── Sector Intelligence ────────────── */}
      <motion.div className="glass-panel rounded-xl p-4"
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h3 className="font-label-caps text-primary text-[11px]">REGION: {SECTOR_DATA.name}</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded border border-border-glow bg-surface-container-low p-2.5">
            <p className="font-label-caps text-[8px] text-on-surface-variant">BIOMASS</p>
            <p className="text-primary text-lg mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {SECTOR_DATA.biomass}<span className="text-[10px] ml-1">MT</span>
            </p>
          </div>
          <div className="rounded border border-border-glow bg-surface-container-low p-2.5">
            <p className="font-label-caps text-[8px] text-on-surface-variant">O₂ SAT</p>
            <p className="text-status-warning text-lg mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {SECTOR_DATA.o2Sat}<span className="text-[10px] ml-1">%</span>
            </p>
          </div>
        </div>
        {/* Eco stress bar */}
        <div className="mb-2">
          <div className="flex justify-between text-[9px] mb-1">
            <span className="font-label-caps text-on-surface-variant">ECO-STRESS INDEX</span>
            <span className="text-status-critical" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{SECTOR_DATA.ecoStress} / 10</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
            <motion.div className="h-full rounded-full bg-status-critical"
              initial={{ width: "0%" }} animate={{ width: `${SECTOR_DATA.ecoStress * 10}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }} />
          </div>
        </div>
        {/* Fusion alert */}
        <div className="rounded border border-primary/20 bg-primary/5 p-2.5">
          <p className="text-[11px] text-on-surface leading-snug">
            <span className="text-primary font-bold">Fusion Alert:</span> {SECTOR_DATA.fusionAlert}
          </p>
        </div>
      </motion.div>

      {/* ── Ecosystem Health Gauges ─────────── */}
      <motion.div className="glass-panel rounded-xl p-4"
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <h3 className="font-label-caps text-primary text-[11px] mb-3">ECOSYSTEM HEALTH</h3>
        <motion.div className="space-y-2.5" variants={staggerContainer} initial="hidden" animate="visible">
          {HEALTH_GAUGES.map((g, i) => {
            const TrendIcon = trendIcons[g.trend];
            return (
              <motion.div key={g.label} variants={staggerItem}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] text-on-surface">{g.label}</span>
                  <div className="flex items-center gap-1.5">
                    <TrendIcon className={`h-3 w-3 ${g.trend === "up" ? "text-primary" : g.trend === "down" ? "text-status-warning" : "text-on-surface-variant/50"}`} />
                    <span className="text-[11px] font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: g.color }}>
                      {g.value}
                    </span>
                  </div>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: g.color }}
                    initial={{ width: "0%" }} animate={{ width: `${g.value}%` }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ── eDNA Biodiversity ───────────────── */}
      <motion.div className="glass-panel rounded-xl p-4"
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h3 className="font-label-caps text-primary text-[11px] mb-3 flex items-center gap-1.5">
          <Dna className="h-3.5 w-3.5" /> eDNA BIODIVERSITY
        </h3>
        <div className="space-y-2">
          {EDNA_METRICS.map((m) => {
            const statusColor = m.status === "normal" ? "text-primary" : m.status === "elevated" ? "text-status-warning" : "text-status-critical";
            const statusBg = m.status === "normal" ? "bg-primary/5" : m.status === "elevated" ? "bg-status-warning/5" : "bg-status-critical/10";
            return (
              <div key={m.label} className={`rounded border border-border-glow p-2.5 ${statusBg}`}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-label-caps text-[9px] text-on-surface-variant">{m.label}</span>
                  <span className={`text-[12px] font-medium ${statusColor}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.value}</span>
                </div>
                <p className="text-[9px] text-on-surface-variant/70 leading-snug">{m.insight}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── AI Predictions ──────────────────── */}
      <motion.div className="glass-panel rounded-xl p-4"
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <h3 className="font-label-caps text-primary text-[11px] mb-3">AI PREDICTIONS</h3>
        <div className="space-y-2">
          {AI_PREDICTIONS.map((p) => (
            <div key={p.label} className="rounded border border-border-glow bg-surface-container-low p-2.5">
              <div className="flex items-center justify-between mb-0.5">
                <span className={`font-label-caps text-[8px] ${severityColor[p.severity]}`}>{p.label}</span>
                <span className="text-[9px] text-on-surface-variant" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.confidence}%</span>
              </div>
              <p className="text-[10px] text-on-surface-variant leading-snug">{p.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Climate Impact ──────────────────── */}
      <motion.div className="glass-panel rounded-xl p-4"
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <h3 className="font-label-caps text-[11px] text-status-warning mb-3 flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5" /> CLIMATE IMPACT
        </h3>
        <div className="space-y-2">
          {CLIMATE_METRICS.map((c) => (
            <div key={c.label} className="flex items-center justify-between rounded border border-border-glow bg-surface-container-low p-2 text-[10px]">
              <span className="text-on-surface-variant">{c.label}</span>
              <div className="text-right">
                <span className="text-on-surface" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{c.current}</span>
                <span className={`block text-[8px] ${c.risk === "high" ? "text-status-critical" : "text-status-warning"}`}>{c.projected}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
