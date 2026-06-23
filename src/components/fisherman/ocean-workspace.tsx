"use client";

import { motion } from "framer-motion";
import { Plus, Minus, Crosshair, Layers, Shield } from "lucide-react";
import { VESSEL_STATUS } from "@/lib/fisherman-data";

export function OceanWorkspace() {
  return (
    <div className="relative h-full w-full bg-[#06141a] overflow-hidden">
      {/* Ocean depth gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(10, 40, 40, 0.6) 0%, rgba(6, 20, 26, 1) 70%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(166, 207, 190, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(166, 207, 190, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated current lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`current-${i}`}
          className="absolute h-px opacity-20"
          style={{
            top: `${20 + i * 15}%`,
            left: "-10%",
            width: "120%",
            background: `linear-gradient(90deg, transparent, rgba(166, 207, 190, 0.3), transparent)`,
          }}
          animate={{
            x: ["-20%", "20%"],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Fish cluster indicators */}
      {[
        { top: "25%", left: "20%", size: 80, delay: 0 },
        { top: "40%", left: "65%", size: 40, delay: 1 },
        { top: "60%", left: "35%", size: 60, delay: 2 },
        { top: "15%", left: "75%", size: 30, delay: 0.5 },
      ].map((cluster, i) => (
        <motion.div
          key={`cluster-${i}`}
          className="absolute rounded-full border border-primary/20"
          style={{
            top: cluster.top,
            left: cluster.left,
            width: cluster.size,
            height: cluster.size,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cluster.delay,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(166, 207, 190, 0.15) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      ))}

      {/* Protected Reef Area */}
      <div className="absolute top-[22%] right-[15%] z-[5]">
        <motion.div
          className="w-52 h-52 rounded-full border-2 border-status-critical/30 bg-status-critical/5 flex items-center justify-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2 rounded-full border border-status-critical/40 bg-surface-glass px-3 py-1.5 backdrop-blur-md">
            <Shield className="h-3.5 w-3.5 text-status-critical" />
            <span className="font-label-caps text-[9px] text-status-critical">
              PROTECTED REEF AREA
            </span>
          </div>
        </motion.div>
      </div>

      {/* Vessel Position */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          {/* Pulse rings */}
          <motion.div
            className="absolute -inset-6 rounded-full bg-primary/15"
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-4 rounded-full bg-primary/20"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          {/* Vessel dot */}
          <div className="relative h-4 w-4 rounded-full border-2 border-on-surface bg-primary shadow-[0_0_15px_rgba(166,207,190,0.8)]" />
          {/* Vessel label */}
          <div className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded border border-border-glow bg-surface-glass px-2.5 py-1 backdrop-blur-md">
            <span
              className="text-primary text-[10px] font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {VESSEL_STATUS.name}
            </span>
          </div>
        </div>
      </div>

      {/* Fishing zone boundaries */}
      <motion.div
        className="absolute bottom-[20%] left-[15%] w-40 h-40 rounded-full border border-dashed border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        </div>
      </motion.div>

      {/* Map Controls */}
      <div className="absolute right-5 top-5 z-20 flex flex-col gap-2">
        {[
          { Icon: Plus, glow: false },
          { Icon: Minus, glow: false },
        ].map(({ Icon, glow }, i) => (
          <motion.button
            key={i}
            className={`flex h-10 w-10 items-center justify-center rounded border border-border-glow bg-surface-glass text-on-surface backdrop-blur-md transition-all hover:text-primary ${
              glow ? "shadow-[0_0_10px_rgba(166,207,190,0.3)] text-primary" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="h-5 w-5" />
          </motion.button>
        ))}
        <div className="mx-1 my-1 h-px bg-border-glow" />
        <motion.button
          className="flex h-10 w-10 items-center justify-center rounded border border-border-glow bg-surface-glass text-primary backdrop-blur-md shadow-[0_0_10px_rgba(166,207,190,0.3)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Crosshair className="h-5 w-5" />
        </motion.button>
        <motion.button
          className="flex h-10 w-10 items-center justify-center rounded border border-border-glow bg-surface-glass text-on-surface backdrop-blur-md transition-all hover:text-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Layers className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Radial gradient overlay (edge fade) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(10, 21, 26, 0.5) 100%)",
        }}
      />
    </div>
  );
}
