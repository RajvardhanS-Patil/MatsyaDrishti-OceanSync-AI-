"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Dna,
  AlertTriangle,
} from "lucide-react";
import {
  SECTOR_DATA,
  EDNA_METRICS,
  AI_PREDICTIONS,
  CLIMATE_METRICS,
} from "@/lib/digital-twin-data";
import { getSimulationData } from "@/lib/simulation-engine";
import { staggerContainer, staggerItem } from "@/lib/animations";

const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };
const severityColor = {
  safe: "text-primary",
  moderate: "text-status-warning",
  high: "text-status-critical",
  critical: "text-status-critical",
};

interface RightIntelPanelProps {
  timeValue?: number;
}

export function RightIntelPanel({ timeValue = 50 }: RightIntelPanelProps) {
  // Fetch live simulation metrics
  const simData = getSimulationData(timeValue);
  const metrics = simData.globalMetrics;

  // Calculate dynamic regional values based on time scrub
  const t = (timeValue / 100) * 2 * Math.PI;
  const dynamicBiomass = (1.4 + 0.3 * Math.sin(t)).toFixed(1);
  const dynamicO2Sat = Math.round(metrics.waterQualityScore - 6 + 2 * Math.cos(t));
  const dynamicEcoStress = (6.2 + 0.8 * Math.sin(t)).toFixed(1);

  // Dynamic health gauges matching simulation outputs
  const dynamicHealthGauges = [
    {
      label: "Marine Health",
      value: parseFloat((84.2 - (metrics.avgTemp - 25.4) * 1.5).toFixed(1)),
      color: "#a6cfbe",
      trend: Math.sin(t) > 0 ? "up" : "down" as const,
    },
    {
      label: "Coral Health",
      value: simData.coral[0].health,
      color: "#FFCE00",
      trend: simData.coral[0].bleachingRisk === "Critical" ? "down" : "stable" as const,
    },
    {
      label: "Biodiversity Index",
      value: parseFloat((72.8 + 2.5 * Math.sin(t)).toFixed(1)),
      color: "#a8cecd",
      trend: Math.sin(t) > 0 ? "up" : "stable" as const,
    },
    {
      label: "Habitat Score",
      value: parseFloat((69.7 - 2.0 * Math.max(0, Math.sin(t))).toFixed(1)),
      color: "#afcdc2",
      trend: "down" as const,
    },
    {
      label: "Water Quality",
      value: metrics.waterQualityScore,
      color: "#00A3FF",
      trend: metrics.activeFishingVessels > 0 ? "down" : "up" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-full pr-1 scrollbar-none">
      {/* ── Sector Intelligence ────────────── */}
      <motion.div
        className="glass-panel rounded-xl p-4 border border-secondary/20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h3 className="font-label-caps text-primary text-[11px]">
            REGION: {SECTOR_DATA.name}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded border border-secondary/20 bg-surface/50 p-2.5">
            <p className="font-label-caps text-[8px] text-secondary/50">BIOMASS</p>
            <p
              className="text-primary text-base font-bold mt-0.5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {dynamicBiomass}
              <span className="text-[10px] ml-0.5 font-normal">MT</span>
            </p>
          </div>
          <div className="rounded border border-secondary/20 bg-surface/50 p-2.5">
            <p className="font-label-caps text-[8px] text-secondary/50">O₂ SAT</p>
            <p
              className="text-status-warning text-base font-bold mt-0.5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {dynamicO2Sat}
              <span className="text-[10px] ml-0.5 font-normal">%</span>
            </p>
          </div>
        </div>
        {/* Eco stress bar */}
        <div className="mb-2">
          <div className="flex justify-between text-[9px] mb-1">
            <span className="font-label-caps text-secondary/70">
              ECO-STRESS INDEX
            </span>
            <span
              className="text-status-critical font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {dynamicEcoStress} / 10
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/10">
            <motion.div
              className="h-full rounded-full bg-status-critical"
              initial={{ width: "0%" }}
              animate={{ width: `${parseFloat(dynamicEcoStress) * 10}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
        {/* Fusion alert */}
        <div className="rounded border border-primary/20 bg-primary/5 p-2.5">
          <p className="text-[10px] text-secondary leading-normal">
            <span className="text-primary font-bold">Fusion Alert:</span>{" "}
            {metrics.avgTemp > 26.5
              ? "High correlation between thermal anomalies and decrease in schooling behavior. Mitigation protocols recommended."
              : "Telemetry nominal. Standard conservation boundaries enforced."}
          </p>
        </div>
      </motion.div>

      {/* ── Ecosystem Health Gauges ─────────── */}
      <motion.div
        className="glass-panel rounded-xl p-4 border border-secondary/20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="font-label-caps text-primary text-[11px] mb-3">
          ECOSYSTEM HEALTH
        </h3>
        <motion.div
          className="space-y-2.5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {dynamicHealthGauges.map((g, i) => {
            const TrendIcon = trendIcons[g.trend as keyof typeof trendIcons];
            return (
              <motion.div key={g.label} variants={staggerItem}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-secondary">{g.label}</span>
                  <div className="flex items-center gap-1">
                    <TrendIcon
                      className={`h-3 w-3 ${
                        g.trend === "up"
                          ? "text-primary"
                          : g.trend === "down"
                            ? "text-status-warning"
                            : "text-secondary/40"
                      }`}
                    />
                    <span
                      className="text-[10px] font-bold"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: g.color,
                      }}
                    >
                      {g.value}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: g.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${g.value}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ── eDNA Biodiversity ───────────────── */}
      <motion.div
        className="glass-panel rounded-xl p-4 border border-secondary/20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="font-label-caps text-primary text-[11px] mb-3 flex items-center gap-1.5">
          <Dna className="h-3.5 w-3.5" /> eDNA BIODIVERSITY
        </h3>
        <div className="space-y-2">
          {EDNA_METRICS.map((m, idx) => {
            const statusColor =
              m.status === "normal"
                ? "text-primary"
                : m.status === "elevated"
                  ? "text-status-warning"
                  : "text-status-critical";
            const statusBg =
              m.status === "normal"
                ? "bg-primary/5"
                : m.status === "elevated"
                  ? "bg-status-warning/5"
                  : "bg-status-critical/10";
            
            // Fluctuates slightly on time scrub
            const dispValue = m.label.includes("Richness")
              ? `${Math.round(247 + 5 * Math.sin(t + idx))}`
              : m.value;

            return (
              <div
                key={m.label}
                className={`rounded border border-secondary/20 p-2.5 ${statusBg}`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-label-caps text-[8px] text-secondary/60">
                    {m.label}
                  </span>
                  <span
                    className={`text-[11px] font-bold ${statusColor}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {dispValue}
                  </span>
                </div>
                <p className="text-[9px] text-secondary/60 leading-normal">
                  {m.insight}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── AI Predictions ──────────────────── */}
      <motion.div
        className="glass-panel rounded-xl p-4 border border-secondary/20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="font-label-caps text-primary text-[11px] mb-3">
          AI PREDICTIONS
        </h3>
        <div className="space-y-2">
          {AI_PREDICTIONS.map((p, idx) => {
            // dynamic confidence based on the current timeline
            const conf = Math.min(99, Math.round(p.confidence + 3 * Math.sin(t + idx)));
            return (
              <div
                key={p.label}
                className="rounded border border-secondary/20 bg-surface/50 p-2.5"
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={`font-label-caps text-[8px] ${
                      severityColor[p.severity]
                    }`}
                  >
                    {p.label}
                  </span>
                  <span
                    className="text-[9px] text-secondary/60"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {conf}%
                  </span>
                </div>
                <p className="text-[9px] text-secondary leading-normal">
                  {p.value}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Climate Impact ──────────────────── */}
      <motion.div
        className="glass-panel rounded-xl p-4 border border-secondary/20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="font-label-caps-[11px] text-status-warning mb-3 flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5" /> CLIMATE IMPACT
        </h3>
        <div className="space-y-2">
          {CLIMATE_METRICS.map((c) => {
            // dynamic SST change reflecting the active temp
            const currVal = c.label.includes("SST")
              ? `+${(metrics.avgTemp - 25.0).toFixed(1)}°C`
              : c.current;
            return (
              <div
                key={c.label}
                className="flex items-center justify-between rounded border border-secondary/20 bg-surface/50 p-2 text-[9px]"
              >
                <span className="text-secondary/60">{c.label}</span>
                <div className="text-right">
                  <span
                    className="text-secondary font-bold"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {currVal}
                  </span>
                  <span
                    className={`block text-[7px] ${
                      c.risk === "high"
                        ? "text-status-critical"
                        : "text-status-warning"
                    }`}
                  >
                    {c.projected}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
