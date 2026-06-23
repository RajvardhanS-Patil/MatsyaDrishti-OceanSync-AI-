"use client";

import { motion } from "framer-motion";
import { type EcoLayer } from "@/lib/digital-twin-data";

/* Immersive full-screen ocean ecosystem visualization.
   Renders animated overlays based on active layers. */

interface TwinCanvasProps {
  layers: EcoLayer[];
  timeValue: number;
}

export function TwinCanvas({ layers, timeValue }: TwinCanvasProps) {
  const isLayerOn = (id: string) => layers.find((l) => l.id === id)?.enabled ?? false;

  return (
    <div className="absolute inset-0 bg-[#040c10] overflow-hidden">
      {/* Deep ocean base gradient */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at ${30 + timeValue * 0.3}% 40%, rgba(6, 40, 50, 0.8) 0%, rgba(4, 12, 16, 1) 70%)`
      }} />

      {/* Subtle depth grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(166,207,190,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(166,207,190,0.6) 1px, transparent 1px)",
        backgroundSize: "100px 100px",
      }} />

      {/* ── LAYER: Ocean Currents ─────────────────── */}
      {isLayerOn("currents") && [...Array(8)].map((_, i) => (
        <motion.div
          key={`current-${i}`}
          className="absolute h-px"
          style={{
            top: `${10 + i * 11}%`,
            left: "-15%",
            width: "130%",
            background: `linear-gradient(${90 + i * 5}deg, transparent 0%, rgba(168, 206, 205, ${0.12 + i * 0.02}) 30%, rgba(168, 206, 205, 0.05) 60%, transparent 100%)`,
          }}
          animate={{ x: ["-20%", "20%", "-20%"], opacity: [0.08, 0.25, 0.08] }}
          transition={{ duration: 12 + i * 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        />
      ))}

      {/* ── LAYER: Fish Clusters ──────────────────── */}
      {isLayerOn("fish") && [
        { x: "22%", y: "30%", size: 90, delay: 0 },
        { x: "55%", y: "45%", size: 65, delay: 1 },
        { x: "70%", y: "25%", size: 50, delay: 0.5 },
        { x: "35%", y: "65%", size: 75, delay: 1.5 },
        { x: "80%", y: "60%", size: 40, delay: 2 },
      ].map((cluster, i) => (
        <motion.div
          key={`fish-${i}`}
          className="absolute rounded-full"
          style={{ left: cluster.x, top: cluster.y, width: cluster.size, height: cluster.size }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: cluster.delay, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full" style={{
            background: "radial-gradient(circle, rgba(0,163,255,0.25) 0%, rgba(0,163,255,0.05) 50%, transparent 75%)"
          }} />
          <div className="absolute inset-[35%] rounded-full bg-status-info/30 border border-status-info/20" />
        </motion.div>
      ))}

      {/* ── LAYER: Biodiversity Zones ─────────────── */}
      {isLayerOn("biodiversity") && [
        { x: "15%", y: "20%", w: 160, h: 120 },
        { x: "60%", y: "35%", w: 140, h: 100 },
        { x: "40%", y: "55%", w: 180, h: 130 },
      ].map((zone, i) => (
        <motion.div
          key={`bio-${i}`}
          className="absolute rounded-[40%] border border-primary/15"
          style={{ left: zone.x, top: zone.y, width: zone.w, height: zone.h }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 1.5 }}
        >
          <div className="absolute inset-0 rounded-[40%]" style={{
            background: "radial-gradient(ellipse, rgba(166,207,190,0.12) 0%, transparent 70%)"
          }} />
        </motion.div>
      ))}

      {/* ── LAYER: SST Heatmap ───────────────────── */}
      {isLayerOn("sst") && (
        <>
          <motion.div className="absolute top-[15%] right-[20%] w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,107,107,0.2) 0%, rgba(255,107,107,0.05) 40%, transparent 70%)" }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity }}
            initial={{ opacity: 0 }} />
          <motion.div className="absolute bottom-[25%] left-[30%] w-48 h-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,206,0,0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            initial={{ opacity: 0 }} />
        </>
      )}

      {/* ── LAYER: Coral Health ───────────────────── */}
      {isLayerOn("coral") && [
        { x: "25%", y: "50%", r: 50 },
        { x: "65%", y: "40%", r: 65 },
        { x: "45%", y: "70%", r: 40 },
      ].map((c, i) => (
        <motion.div key={`coral-${i}`} className="absolute"
          style={{ left: c.x, top: c.y, width: c.r * 2, height: c.r * 2 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }}>
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-status-warning/30" />
          <motion.div className="absolute inset-[20%] rounded-full bg-status-warning/10"
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }} />
        </motion.div>
      ))}

      {/* ── LAYER: Chlorophyll ────────────────────── */}
      {isLayerOn("chlorophyll") && (
        <motion.div className="absolute top-[30%] left-[10%] w-[50%] h-[40%] rounded-[50%]"
          style={{ background: "radial-gradient(ellipse, rgba(74,222,128,0.12) 0%, rgba(74,222,128,0.03) 50%, transparent 80%)" }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity }}
          initial={{ opacity: 0 }} />
      )}

      {/* ── LAYER: Vessel Tracking ────────────────── */}
      {isLayerOn("vessels") && [
        { x: "42%", y: "48%", name: "MV OCEAN HUNTER", active: true },
        { x: "68%", y: "30%", name: "FV MATSYA RANI", active: false },
        { x: "28%", y: "62%", name: "RV SAMUDRA K.", active: false },
        { x: "75%", y: "55%", name: "FV DEEP HORIZON", active: false },
      ].map((v, i) => (
        <div key={`vessel-${i}`} className="absolute z-10" style={{ left: v.x, top: v.y }}>
          {v.active && (
            <motion.div className="absolute -inset-5 rounded-full bg-primary/10"
              animate={{ scale: [1, 2], opacity: [0.4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }} />
          )}
          <motion.div
            className={`h-2.5 w-2.5 rounded-full border ${v.active ? "bg-primary border-on-surface shadow-[0_0_12px_rgba(166,207,190,0.7)]" : "bg-secondary/50 border-secondary/30"}`}
            animate={v.active ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 glass-panel rounded px-1.5 py-0.5 whitespace-nowrap">
            <span className="text-[7px] text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.name}</span>
          </div>
        </div>
      ))}

      {/* ── LAYER: Conservation Zones ─────────────── */}
      {isLayerOn("zones") && (
        <>
          <motion.div className="absolute top-[20%] left-[15%] w-48 h-48 rounded-full border-2 border-dashed border-status-critical/25"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel rounded px-2 py-1">
              <span className="font-label-caps text-[7px] text-status-critical">NO-FISHING ZONE</span>
            </div>
          </motion.div>
          <motion.div className="absolute bottom-[30%] right-[20%] w-36 h-36 rounded-full border-2 border-primary/25"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel rounded px-2 py-1">
              <span className="font-label-caps text-[7px] text-primary">MARINE SANCTUARY</span>
            </div>
          </motion.div>
        </>
      )}

      {/* Atmospheric particles */}
      {[...Array(20)].map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 23) % 100;
        const duration = 4 + (i % 4);
        const delay = (i % 5);
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-0.5 w-0.5 rounded-full bg-primary/30"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration, repeat: Infinity, delay }}
          />
        );
      })}

      {/* Edge vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(4,12,16,0.7) 100%)"
      }} />
    </div>
  );
}
