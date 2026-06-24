"use client";

import { motion } from "framer-motion";
import { Crosshair, Lightbulb, Fish, Compass, Shield, AlertTriangle, Anchor, Target, Zap } from "lucide-react";
import { useMatsyaEngine } from "@/hooks/use-matsya-engine";
import { useFishingZones } from "@/hooks/use-fishing-zones";

const severityColor = { safe: "text-primary border-primary/20 bg-primary/5", moderate: "text-status-warning border-status-warning/20 bg-status-warning/5", high: "text-status-critical border-status-critical/20 bg-status-critical/5", critical: "text-status-critical border-status-critical/30 bg-status-critical/10" };
const typeIcon: Record<string, typeof Fish> = { fishing: Anchor, conservation: Shield, zone: Compass, risk: AlertTriangle };

export function AIBody() {
  const { recommendations, riskScore, riskLevel, loading } = useMatsyaEngine();
  const { data: zones } = useFishingZones();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* ── Column 1: Risk Engine & Species ── */}
      <div className="space-y-4">
        {/* Risk Breakdown (Replaces Model Metrics) */}
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <Target className="h-4 w-4" /> RISK SCORING ENGINE
          </h3>
          <div className="space-y-3">
            {[
              { label: "Ecosystem Instability", weight: 30, color: "#FF6B6B" },
              { label: "Biodiversity Threat", weight: 25, color: "#FFCE00" },
              { label: "Ocean Condition Penalty", weight: 20, color: "#a8cecd" },
              { label: "Alert Severity Factor", weight: 15, color: "#FF3B30" },
              { label: "Vessel Non-Compliance", weight: 10, color: "#00A3FF" },
            ].map((m, i) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-on-surface">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-on-surface-variant/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      weight: {m.weight}%
                    </span>
                  </div>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: m.color }}
                    initial={{ width: "0%" }} animate={{ width: `${loading ? 0 : m.weight}%` }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border-glow pt-3 flex justify-between items-center">
             <span className="font-label-caps text-[10px] text-on-surface-variant">COMPUTED RISK SCORE</span>
             <span className="text-xl font-bold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
               {loading ? "--" : riskScore.toFixed(1)}
             </span>
          </div>
        </motion.div>

        {/* Live Species Detection (from zones) */}
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-3 flex items-center gap-2">
            <Fish className="h-4 w-4" /> LIVE SPECIES DETECTION
          </h3>
          <div className="space-y-3">
            {zones ? zones.slice(0, 4).map((zone, i) => (
              <motion.div key={zone.id} className="rounded border border-border-glow bg-surface-container-low p-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.08 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-on-surface font-medium">{zone.species}</span>
                  <span className="text-[12px] font-bold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {zone.matchPercent}%
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest mb-1.5">
                  <motion.div className="h-full rounded-full bg-primary"
                    initial={{ width: "0%" }} animate={{ width: `${zone.matchPercent}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }} />
                </div>
                <div className="flex justify-between text-[9px] mt-2">
                   <span className="text-on-surface-variant/50">Location: {zone.name}</span>
                   <span className="text-status-warning">Yield: {zone.catchPotential}</span>
                </div>
              </motion.div>
            )) : (
              <div className="flex flex-col items-center p-4">
                 <div className="h-5 w-5 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-2" />
                 <span className="text-[9px] text-on-surface-variant font-mono">SCANNING ZONES...</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Column 2: Explainable AI ──────────────── */}
      <div className="space-y-4">
        {/* Explainable AI Panel */}
        <motion.div className="glass-panel rounded-lg p-5 h-full"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" /> EXPLAINABLE AI PANEL
          </h3>
          <span className="font-label-caps text-[9px] text-on-surface-variant block mb-3">REASONING & TRACEABILITY</span>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {loading ? (
               <div className="flex flex-col items-center p-8">
                 <Zap className="h-6 w-6 text-primary/30 mb-2 animate-pulse" />
                 <span className="text-[10px] text-on-surface-variant font-mono">GENERATING EXPLANATIONS...</span>
               </div>
            ) : recommendations.map((rec, i) => (
              <motion.div key={rec.id} className="rounded border border-border-glow bg-surface-container-lowest p-3"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border-glow/50">
                  <span className="text-[11px] text-on-surface font-medium truncate flex-1">{rec.title}</span>
                  <span className="text-[10px] text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{rec.confidence}%</span>
                </div>

                <div className="space-y-2">
                   <div>
                     <span className="font-label-caps text-[8px] text-on-surface-variant/50 block mb-0.5">REASONING</span>
                     <p className="text-[10px] text-on-surface-variant italic leading-relaxed border-l-2 border-primary/30 pl-2">
                       "{rec.reasoning}"
                     </p>
                   </div>
                   <div>
                     <span className="font-label-caps text-[8px] text-on-surface-variant/50 block mb-1">DATA SOURCES</span>
                     <div className="flex flex-wrap gap-1">
                       {rec.dataSources.map(ds => (
                         <span key={ds} className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">
                           {ds}
                         </span>
                       ))}
                     </div>
                   </div>
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Column 3: Recommendations ────────────── */}
      <div className="space-y-4">
        <motion.div className="glass-panel rounded-lg p-5 h-full"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <Compass className="h-4 w-4" /> CONSERVATION ADVISORY
          </h3>
          <div className="space-y-3">
            {loading ? (
               <div className="flex flex-col items-center p-8">
                 <div className="h-6 w-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-2" />
                 <span className="text-[10px] text-on-surface-variant font-mono">COMPUTING ADVISORY...</span>
               </div>
            ) : recommendations.map((rec, i) => {
              const Icon = typeIcon[rec.type] || Compass;
              const priBg = rec.priority === "high" ? "bg-status-critical/10 border-status-critical/20" : rec.priority === "medium" ? "bg-status-warning/10 border-status-warning/20" : "bg-primary/10 border-primary/20";
              const priText = rec.priority === "high" ? "text-status-critical" : rec.priority === "medium" ? "text-status-warning" : "text-primary";
              
              return (
                <motion.div key={rec.id} className={`rounded-lg border p-4 ${priBg}`}
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
