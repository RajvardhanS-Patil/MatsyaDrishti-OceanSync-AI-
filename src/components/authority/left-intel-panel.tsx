"use client";

import { motion } from "framer-motion";
import { Zap, ArrowDown, Satellite, Anchor, Dna, Ship, Radio } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useMarineHealth } from "@/hooks/use-marine-health";

const statusColors = { live: "bg-status-info", processing: "bg-status-warning", queued: "bg-on-surface-variant/40" };
const severityColors = { safe: "text-primary", moderate: "text-status-warning", high: "text-status-critical", critical: "text-status-critical" };
const severityBg = { safe: "bg-primary/10", moderate: "bg-status-warning/10", high: "bg-status-critical/10", critical: "bg-status-critical/20" };

export function LeftIntelPanel() {
  const { data, loading, error } = useMarineHealth();

  const liveMetrics = [
    { label: "Overall Marine Health", score: data ? data.health_score : 0, trend: "stable", forecast: "stable", color: "#a6cfbe" },
    { label: "Coral Health", score: data ? data.coral_health : 0, trend: "stable", forecast: "stable", color: "#4ade80" },
    { label: "Biodiversity Score", score: data ? data.biodiversity_score : 0, trend: "stable", forecast: "stable", color: "#3b82f6" },
    { label: "Water Quality", score: data ? data.water_quality : 0, trend: "stable", forecast: "stable", color: "#818cf8" }
  ];

  const displayScore = data ? data.health_score : 84.2;

  return (
    <div className="flex flex-col gap-4 overflow-y-auto pr-1 pb-4">
      {/* ── Marine Health Score ──────────────── */}
      <div className="glass-panel rounded-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-label-caps text-on-surface-variant">Marine Health Score</span>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <Radio className="h-4 w-4 text-primary/50" />
          </motion.div>
        </div>

        {loading ? (
          <div className="flex h-48 flex-col items-center justify-center gap-4">
             <div className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
             <span className="text-primary/50 text-xs font-mono animate-pulse">[FETCHING TELEMETRY...]</span>
          </div>
        ) : error ? (
          <div className="flex h-48 flex-col items-center justify-center text-status-critical">
             <Zap className="h-6 w-6 mb-2 opacity-50" />
             <span className="text-xs font-mono">CONNECTION LOST</span>
             <span className="text-[10px] opacity-70 mt-1">Check Supabase Config</span>
          </div>
        ) : (
          <>
            {/* Ring visualization */}
            <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(166,207,190,0.1)" strokeWidth="4" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" stroke="#a6cfbe" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - displayScore / 100) }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </svg>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {displayScore.toFixed(1)}
                </span>
                <span className="block text-[10px] text-on-surface-variant font-label-caps">/ 100</span>
              </div>
            </div>

            {/* Health breakdown */}
            <motion.div className="space-y-2.5" variants={staggerContainer} initial="hidden" animate="visible">
              {liveMetrics.map((m, i) => (
                <motion.div key={m.label} variants={staggerItem} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-on-surface-variant">{m.label}</span>
                    <span className="text-[11px] font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: m.color }}>{m.score.toFixed(1)}</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: m.color }}
                      initial={{ width: "0%" }} animate={{ width: `${m.score}%` }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className={m.trend === "improving" ? "text-primary" : m.trend === "declining" ? "text-status-warning" : "text-on-surface-variant/50"}>
                      {m.trend.toUpperCase()}
                    </span>
                    <span className="text-on-surface-variant/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>→ {m.forecast}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* ── AI Fusion Center ────────────────── */}
      <div className="glass-panel rounded-lg p-5 flex-1">
        <h3 className="font-label-caps text-primary mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          AI Fusion Center
        </h3>

        <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-border-glow bg-surface-container-low p-4 text-on-surface-variant">
          <Zap className="h-6 w-6 mb-2 opacity-50" />
          <span className="text-[12px] font-mono tracking-widest text-on-surface-variant/50">DATA UNAVAILABLE</span>
          <span className="text-[10px] text-on-surface-variant/40 mt-1">Requires active Matsya Engine stream</span>
        </div>
      </div>
    </div>
  );
}
