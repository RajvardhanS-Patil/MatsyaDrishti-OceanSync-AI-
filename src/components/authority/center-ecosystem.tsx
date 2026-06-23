"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Grid3X3, Waves, Shield, ZoomIn, Crosshair, Layers, RotateCcw } from "lucide-react";

const LAYER_TABS = [
  { id: "base", label: "Base Map", icon: Globe },
  { id: "threat", label: "Threat Heatmap", icon: Grid3X3 },
  { id: "currents", label: "Currents", icon: Waves },
  { id: "zones", label: "Zones", icon: Shield },
];

export function CenterEcosystem() {
  const [activeLayer, setActiveLayer] = useState("base");

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Layer Toggle Bar */}
      <div className="glass-panel rounded-full self-center flex items-center gap-1 p-1">
        {LAYER_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeLayer === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-label-caps text-[10px] transition-all ${
                active ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Ecosystem Viewport */}
      <div className="relative flex-1 glass-panel rounded-lg overflow-hidden group">
        {/* Background ocean */}
        <div className="absolute inset-0 bg-[#06141a]">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(10, 50, 50, 0.5) 0%, rgba(6, 20, 26, 1) 70%)"
          }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(rgba(166,207,190,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(166,207,190,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
        </div>

        {/* Animated current flows */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute h-px opacity-15"
            style={{ top: `${15 + i * 14}%`, left: "-10%", width: "120%",
              background: "linear-gradient(90deg, transparent, rgba(166,207,190,0.4), transparent)" }}
            animate={{ x: ["-15%", "15%"], opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 10 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          />
        ))}

        {/* Threat heatmap zones */}
        {activeLayer === "threat" && (
          <>
            <motion.div className="absolute top-[20%] left-[25%] w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,206,0,0.15) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
              initial={{ opacity: 0 }} />
            <motion.div className="absolute top-[40%] right-[20%] w-56 h-56 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(157,3,0,0.2) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              initial={{ opacity: 0 }} />
          </>
        )}

        {/* Zone boundaries */}
        {activeLayer === "zones" && (
          <>
            <motion.div className="absolute top-[15%] left-[10%] w-44 h-44 rounded-full border-2 border-dashed border-primary/30"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel rounded px-2 py-1">
                <span className="font-label-caps text-[8px] text-primary">SECTOR 4 — PROTECTED</span>
              </div>
            </motion.div>
            <motion.div className="absolute bottom-[25%] right-[15%] w-36 h-36 rounded-full border-2 border-status-warning/30"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel rounded px-2 py-1">
                <span className="font-label-caps text-[8px] text-status-warning">SECTOR 7-G — WARNING</span>
              </div>
            </motion.div>
          </>
        )}

        {/* Vessel dots */}
        {[
          { top: "45%", left: "40%", label: "MV OCEAN HUNTER", active: true },
          { top: "30%", left: "55%", label: "FV MATSYA RANI", active: false },
          { top: "60%", left: "25%", label: "SS COASTAL RAY", active: false },
        ].map((v, i) => (
          <div key={i} className="absolute z-10" style={{ top: v.top, left: v.left }}>
            {v.active && (
              <motion.div className="absolute -inset-4 rounded-full bg-primary/15"
                animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity }} />
            )}
            <div className={`h-2.5 w-2.5 rounded-full border border-on-surface ${v.active ? "bg-primary shadow-[0_0_10px_rgba(166,207,190,0.6)]" : "bg-secondary/60"}`} />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 glass-panel rounded px-1.5 py-0.5 whitespace-nowrap">
              <span className="text-[8px] text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.label}</span>
            </div>
          </div>
        ))}

        {/* Top-left HUD */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <div className="glass-panel rounded px-2.5 py-1 flex items-center gap-2">
            <motion.span className="h-1.5 w-1.5 rounded-full bg-status-critical"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            <span className="text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>LIVE_FEED: SECTOR_7G</span>
          </div>
        </div>

        {/* Bottom-left HUD */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <div className="glass-panel rounded p-2">
            <div className="font-label-caps text-[8px] text-on-surface-variant">ZOOM</div>
            <div className="text-primary text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>14.5x</div>
          </div>
          <div className="glass-panel rounded p-2">
            <div className="font-label-caps text-[8px] text-on-surface-variant">DEPTH</div>
            <div className="text-primary text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>-4,200m</div>
          </div>
        </div>

        {/* Bottom-right controls */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {[ZoomIn, Crosshair].map((Icon, i) => (
            <motion.button key={i} className="glass-panel flex h-9 w-9 items-center justify-center rounded hover:border-primary/50 transition-all"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Icon className="h-4 w-4 text-on-surface-variant" />
            </motion.button>
          ))}
        </div>

        {/* Edge gradient */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(circle at center, transparent 40%, rgba(10,21,26,0.6) 100%)"
        }} />
      </div>
    </div>
  );
}
