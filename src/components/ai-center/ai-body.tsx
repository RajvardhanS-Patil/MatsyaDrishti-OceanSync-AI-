"use client";

import { motion } from "framer-motion";
import { MODEL_METRICS, LIVE_PREDICTIONS, FEATURE_IMPORTANCE, SPECIES_PREDICTIONS, RECOMMENDATIONS } from "@/lib/ai-data";
import { Activity, Crosshair, Lightbulb, Fish, Compass, Shield, AlertTriangle, Anchor } from "lucide-react";

const severityColor = { safe: "text-primary border-primary/20 bg-primary/5", moderate: "text-status-warning border-status-warning/20 bg-status-warning/5", high: "text-status-critical border-status-critical/20 bg-status-critical/5", critical: "text-status-critical border-status-critical/30 bg-status-critical/10" };
const habitatColor = { optimal: "text-primary", suitable: "text-secondary", marginal: "text-status-warning", unsuitable: "text-status-critical" };
const typeIcon: Record<string, typeof Fish> = { fishing: Anchor, conservation: Shield, zone: Compass, risk: AlertTriangle };

export function AIBody() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* ── Column 1: Model Performance + Predictions ── */}
      <div className="space-y-4">
        {/* Model Performance */}
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4" /> MODEL PERFORMANCE
          </h3>
          <div className="space-y-3">
            {MODEL_METRICS.map((m, i) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-on-surface">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-on-surface-variant/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      bench: {m.benchmark}%
                    </span>
                    <span className="text-[12px] font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: m.color }}>
                      {m.value}%
                    </span>
                  </div>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  {/* Benchmark marker */}
                  <div className="absolute top-0 bottom-0 w-px bg-on-surface-variant/30 z-10" style={{ left: `${m.benchmark}%` }} />
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: m.color }}
                    initial={{ width: "0%" }} animate={{ width: `${m.value}%` }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live Prediction Feed */}
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-3 flex items-center gap-2">
            <Crosshair className="h-4 w-4" /> LIVE PREDICTION FEED
            <motion.span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </h3>
          <div className="space-y-2 max-h-[320px] overflow-y-auto">
            {LIVE_PREDICTIONS.map((p, i) => (
              <motion.div key={p.id}
                className={`rounded border p-2.5 ${severityColor[p.severity]}`}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-label-caps text-[8px]">{p.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] opacity-60" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.confidence}%</span>
                    <span className="text-[8px] opacity-40">{p.timestamp}</span>
                  </div>
                </div>
                <p className="text-[10px] text-on-surface-variant leading-snug">{p.prediction}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Column 2: XAI + Species ──────────────── */}
      <div className="space-y-4">
        {/* Explainable AI */}
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" /> EXPLAINABLE AI
          </h3>
          <span className="font-label-caps text-[9px] text-on-surface-variant block mb-2">FEATURE IMPORTANCE</span>
          <div className="space-y-2">
            {FEATURE_IMPORTANCE.map((f, i) => (
              <div key={f.feature}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-on-surface truncate max-w-[160px]">{f.feature}</span>
                  <span className={`text-[10px] ${f.direction === "positive" ? "text-primary" : "text-status-warning"}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {f.direction === "positive" ? "+" : "−"}{(f.importance * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <motion.div className="h-full rounded-full"
                    style={{ backgroundColor: f.direction === "positive" ? "#a6cfbe" : "#FFCE00" }}
                    initial={{ width: "0%" }} animate={{ width: `${f.importance * 100 * 3}%` }}
                    transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border-glow pt-3">
            <span className="font-label-caps text-[9px] text-on-surface-variant block mb-1.5">PREDICTION DRIVER</span>
            <p className="text-[10px] text-on-surface-variant leading-snug italic border-l-2 border-primary pl-2">
              "Elevated SST (+0.8°C) is the dominant risk factor, offset by above-average chlorophyll concentrations supporting fish biomass."
            </p>
          </div>
        </motion.div>

        {/* Species Prediction */}
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-3 flex items-center gap-2">
            <Fish className="h-4 w-4" /> SPECIES PREDICTIONS
          </h3>
          <div className="space-y-3">
            {SPECIES_PREDICTIONS.map((sp, i) => (
              <motion.div key={sp.name} className="rounded border border-border-glow bg-surface-container-low p-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.08 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-on-surface font-medium">{sp.name}</span>
                  <span className="text-[12px] font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: sp.color }}>
                    {sp.probability}%
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest mb-1.5">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: sp.color }}
                    initial={{ width: "0%" }} animate={{ width: `${sp.probability}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-[9px]">
                  <div>
                    <span className="text-on-surface-variant/50 block">HABITAT</span>
                    <span className={`font-medium uppercase ${habitatColor[sp.habitat]}`}>{sp.habitat}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant/50 block">MIGRATION</span>
                    <span className="text-on-surface-variant">{sp.migration.split("—")[0]}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant/50 block">CONF.</span>
                    <span className="text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{sp.confidence}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Column 3: Recommendations ────────────── */}
      <div className="space-y-4">
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <Compass className="h-4 w-4" /> RECOMMENDATION ENGINE
          </h3>
          <div className="space-y-3">
            {RECOMMENDATIONS.map((rec, i) => {
              const Icon = typeIcon[rec.type] || Compass;
              const priBg = rec.priority === "high" ? "bg-status-critical/10 border-status-critical/20" : "bg-status-warning/10 border-status-warning/20";
              const priText = rec.priority === "high" ? "text-status-critical" : "text-status-warning";
              return (
                <motion.div key={rec.title} className={`rounded-lg border p-4 ${priBg}`}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }} whileHover={{ scale: 1.01 }}>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      <Icon className={`h-4 w-4 ${priText}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] text-on-surface font-medium">{rec.title}</span>
                        <span className={`text-[8px] font-label-caps px-1.5 py-0.5 rounded ${priText} bg-surface-container-highest/50`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant leading-snug">{rec.description}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <span className="text-[8px] text-on-surface-variant/50">Confidence:</span>
                        <span className="text-[9px] text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{rec.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
