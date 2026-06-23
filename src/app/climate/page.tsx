"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { FloatingParticles } from "@/components/animations/floating-particles";
import { TrendingUp, TrendingDown, Minus, Thermometer, Ship, TreePine, Waves, BarChart3, Calendar, Shield, Compass, Eye, AlertTriangle } from "lucide-react";
import {
  CLIMATE_KPIS, PROJECTIONS, TEMP_TREND, BIODIVERSITY_TREND, CLIMATE_RECOMMENDATIONS
} from "@/lib/ai-data";

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const sevColor = { safe: "text-primary", warning: "text-status-warning", critical: "text-status-critical" };
const typeIcon: Record<string, typeof Shield> = { adaptive: Compass, seasonal: Calendar, monitoring: Eye, recovery: TreePine };
const TIME_RANGES = ["1 Month", "6 Months", "1 Year", "5 Years", "10 Years"];

export default function ClimatePage() {
  const [timeRange, setTimeRange] = useState("5 Years");

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <FloatingParticles />

      <main className="relative z-10 pt-20 px-4 pb-8 max-w-[1600px] mx-auto space-y-5">
        {/* Title */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Climate Impact Analytics
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Long-term ecosystem trajectory analysis. Ocean warming, species migration, and conservation forecasting.
          </p>
        </div>

        {/* ── Climate Command KPIs ─────────────── */}
        <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-3"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {CLIMATE_KPIS.map((kpi, i) => {
            const Icon = trendIcon[kpi.trend];
            return (
              <motion.div key={kpi.label} className="glass-panel rounded-lg p-4"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.03 }}>
                <span className="font-label-caps text-[9px] text-on-surface-variant block mb-1">{kpi.label}</span>
                <span className={`text-xl font-bold ${sevColor[kpi.severity]}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {kpi.value}
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <Icon className={`h-3 w-3 ${sevColor[kpi.severity]}`} />
                  <span className="text-[9px] text-on-surface-variant">{kpi.change}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Temporal Range ───────────────────── */}
        <div className="flex items-center gap-2 justify-center">
          {TIME_RANGES.map((r) => (
            <button key={r} onClick={() => setTimeRange(r)}
              className={`rounded-full px-4 py-1.5 font-label-caps text-[10px] transition-all ${
                timeRange === r ? "bg-primary text-on-primary" : "glass-panel text-on-surface-variant hover:bg-surface-container-highest"
              }`}>
              {r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* ── Temperature Trend ──────────────── */}
          <motion.div className="glass-panel rounded-lg p-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h3 className="font-label-caps text-[11px] text-status-warning mb-4 flex items-center gap-2">
              <Thermometer className="h-4 w-4" /> SST TEMPERATURE TREND
            </h3>
            <div className="h-48 flex items-end gap-1.5">
              {TEMP_TREND.map((d, i) => {
                const minVal = 27.0;
                const maxVal = 30.2;
                const height = 20 + ((d.value - minVal) / (maxVal - minVal)) * 75;
                const isFuture = parseInt(d.year) > 2025;
                return (
                  <div key={d.year} className="flex-1 flex flex-col items-center group">
                    <span className="text-[8px] text-on-surface-variant/50 opacity-0 group-hover:opacity-100 transition-opacity mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {d.value}°C
                    </span>
                    <motion.div
                      className={`w-full rounded-t ${isFuture ? "bg-gradient-to-t from-status-warning/40 to-status-warning/70 border border-dashed border-status-warning/30" : "bg-gradient-to-t from-primary/30 to-primary/70"}`}
                      initial={{ height: 0 }} animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: i * 0.06 }}
                    />
                    <span className="text-[7px] text-on-surface-variant/40 mt-1 rotate-[-45deg]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {d.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Biodiversity Decline ───────────── */}
          <motion.div className="glass-panel rounded-lg p-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="font-label-caps text-[11px] text-status-critical mb-4 flex items-center gap-2">
              <TreePine className="h-4 w-4" /> BIODIVERSITY INDEX DECLINE
            </h3>
            <div className="h-48 flex items-end gap-1.5">
              {BIODIVERSITY_TREND.map((d, i) => {
                const minVal = 75;
                const maxVal = 102;
                const height = 15 + ((d.value - minVal) / (maxVal - minVal)) * 80;
                const isFuture = parseInt(d.year) > 2025;
                return (
                  <div key={d.year} className="flex-1 flex flex-col items-center group">
                    <span className="text-[8px] text-on-surface-variant/50 opacity-0 group-hover:opacity-100 transition-opacity mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {d.value}%
                    </span>
                    <motion.div
                      className={`w-full rounded-t ${isFuture ? "bg-gradient-to-t from-status-critical/30 to-status-critical/60 border border-dashed border-status-critical/30" : "bg-gradient-to-t from-tertiary/30 to-tertiary/70"}`}
                      initial={{ height: 0 }} animate={{ height: `${Math.max(height, 10)}%` }}
                      transition={{ duration: 0.8, delay: i * 0.06 }}
                    />
                    <span className="text-[7px] text-on-surface-variant/40 mt-1 rotate-[-45deg]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {d.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Future Projections ───────────────── */}
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> FUTURE PROJECTION ENGINE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTIONS.map((p, i) => (
              <motion.div key={p.year} className="rounded-lg border border-border-glow bg-surface-container-low p-4"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }} whileHover={{ scale: 1.02 }}>
                <div className="text-center mb-3">
                  <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.year}</span>
                  <span className="block text-[9px] text-on-surface-variant">PROJECTION</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "SST Change", value: p.sst, color: "text-status-warning" },
                    { label: "Migration", value: p.migration, color: "text-status-warning" },
                    { label: "Coral Loss", value: p.coralLoss, color: "text-status-critical" },
                    { label: "Biodiversity", value: p.biodiversity, color: "text-status-critical" },
                    { label: "Risk Zones", value: `${p.riskZones} sectors`, color: "text-on-surface-variant" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-[10px]">
                      <span className="text-on-surface-variant">{row.label}</span>
                      <span className={`font-medium ${row.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-border-glow text-center">
                  <span className="text-[9px] text-primary font-label-caps">{p.priority}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Climate Recommendations ──────────── */}
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> CLIMATE RECOMMENDATIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CLIMATE_RECOMMENDATIONS.map((rec, i) => {
              const Icon = typeIcon[rec.type] || Shield;
              return (
                <motion.div key={rec.title}
                  className="rounded-lg border border-border-glow bg-surface-container-low p-4"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }} whileHover={{ scale: 1.01 }}>
                  <div className="flex items-start gap-3">
                    <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[12px] text-on-surface font-medium block">{rec.title}</span>
                      <p className="text-[10px] text-on-surface-variant leading-snug mt-1">{rec.description}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-on-surface-variant/40" />
                        <span className="text-[8px] text-on-surface-variant/60 font-label-caps">{rec.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
