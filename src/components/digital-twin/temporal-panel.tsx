"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { TIME_PERIODS } from "@/lib/digital-twin-data";

const TIMELINE_LABELS = [
  { pos: 0, label: "JAN 2024 (HIST)" },
  { pos: 25, label: "APR 2024 (HIST)" },
  { pos: 50, label: "JUL 2024 (LIVE)" },
  { pos: 75, label: "OCT 2024 (PROJ)" },
  { pos: 100, label: "JAN 2025 (PRED)" },
];

function getTimeLabel(val: number): string {
  if (val > 80) return "JAN 2025 (PRED)";
  if (val > 60) return "OCT 2024 (PROJ)";
  if (val > 40) return "JUL 2024 (LIVE)";
  if (val > 20) return "APR 2024 (HIST)";
  return "JAN 2024 (HIST)";
}

function getTimeTag(val: number): string {
  if (val > 60) return "PREDICTIVE";
  if (val > 40) return "LIVE";
  return "HISTORICAL";
}

export function TemporalPanel({ timeValue, onTimeChange }: { timeValue: number; onTimeChange: (v: number) => void }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      className="glass-panel rounded-xl p-4"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <h3 className="font-label-caps text-primary text-[11px] mb-3">TEMPORAL ANALYSIS</h3>

      <div className="flex justify-between text-[9px] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <span className="text-on-surface-variant">HISTORICAL (-24M)</span>
        <span className="text-primary">PREDICTIVE (+12M)</span>
      </div>

      {/* Timeline slider */}
      <div className="relative mb-3">
        <input
          type="range"
          min="0"
          max="100"
          value={timeValue}
          onChange={(e) => onTimeChange(Number(e.target.value))}
          className="w-full h-1 appearance-none cursor-pointer rounded-lg bg-surface-container-highest [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(166,207,190,0.6)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-on-surface"
        />
        {/* Progress fill */}
        <div
          className="pointer-events-none absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-lg bg-gradient-to-r from-primary/60 to-primary"
          style={{ width: `${timeValue}%` }}
        />
      </div>

      {/* Quick period buttons */}
      <div className="flex gap-1 mb-3 flex-wrap">
        {TIME_PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => onTimeChange(p.value)}
            className={`rounded px-2 py-1 text-[8px] font-label-caps transition-all ${
              Math.abs(timeValue - p.value) < 10
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-surface-container-highest/50 text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-3">
        <button className="glass-panel rounded p-1.5 hover:bg-primary/10 transition-colors" onClick={() => onTimeChange(Math.max(0, timeValue - 10))}>
          <SkipBack className="h-3.5 w-3.5 text-on-surface-variant" />
        </button>
        <motion.button
          className="glass-panel rounded p-2 hover:bg-primary/10 transition-colors"
          onClick={() => setPlaying(!playing)}
          whileTap={{ scale: 0.9 }}
        >
          {playing ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
        </motion.button>
        <button className="glass-panel rounded p-1.5 hover:bg-primary/10 transition-colors" onClick={() => onTimeChange(Math.min(100, timeValue + 10))}>
          <SkipForward className="h-3.5 w-3.5 text-on-surface-variant" />
        </button>
        <div className="text-primary text-[12px] ml-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {getTimeLabel(timeValue)}
        </div>
      </div>

      {/* Tag */}
      <div className="mt-2 text-center">
        <span className={`text-[9px] font-label-caps px-2 py-0.5 rounded ${
          getTimeTag(timeValue) === "LIVE" ? "bg-primary/20 text-primary" :
          getTimeTag(timeValue) === "PREDICTIVE" ? "bg-status-info/20 text-status-info" :
          "bg-surface-container-highest text-on-surface-variant"
        }`}>
          {getTimeTag(timeValue)} MODE
        </span>
      </div>
    </motion.div>
  );
}
