"use client";

import { motion } from "framer-motion";
import {
  Waves,
  Thermometer,
  Droplets,
  Wind,
  Navigation,
  Leaf,
  Route as RouteIcon,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from "lucide-react";
import { SPECIES_DATA, OCEAN_CONDITIONS, ROUTE_DATA } from "@/lib/fisherman-data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const conditionIcons: Record<string, LucideIcon> = {
  Waves,
  Thermometer,
  Droplets,
  Wind,
  Navigation,
  Leaf,
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

export function IntelligencePanel() {
  return (
    <aside className="fixed right-0 top-16 bottom-0 z-40 flex w-[300px] flex-col overflow-y-auto border-l border-border-glow bg-surface-glass p-5 backdrop-blur-xl space-y-6">
      {/* Panel Title */}
      <h2
        className="text-primary font-semibold text-lg"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        Intelligence Center
      </h2>

      {/* ── Species Analysis ───────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-label-caps text-on-surface-variant">
            Species Analysis
          </h3>
          <span className="font-label-caps text-primary/70 text-[10px] flex items-center gap-1">
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Live Feed
          </span>
        </div>

        <motion.div
          className="space-y-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {SPECIES_DATA.map((species, i) => (
            <motion.div
              key={species.name}
              variants={staggerItem}
              className="rounded-lg border border-border-glow bg-surface-container-low p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-on-surface text-sm">{species.name}</span>
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: species.color,
                  }}
                >
                  {species.probability}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: species.color }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${species.probability}%` }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                />
              </div>
              <div className="mt-1.5 flex gap-3">
                <span className="font-label-caps text-[9px] text-on-surface-variant/60">
                  Habitat:{" "}
                  <span className={species.habitat === "optimal" ? "text-primary" : "text-on-surface-variant"}>
                    {species.habitat}
                  </span>
                </span>
                <span className="font-label-caps text-[9px] text-on-surface-variant/60">
                  Season:{" "}
                  <span className={species.seasonalActivity === "peak" ? "text-status-warning" : "text-on-surface-variant"}>
                    {species.seasonalActivity}
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Route Optimizer ─────────────────────────── */}
      <section className="space-y-3">
        <h3 className="font-label-caps text-on-surface-variant">
          Route Optimizer
        </h3>
        <div className="rounded-lg border border-border-glow bg-surface-container-low p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
              <RouteIcon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                {ROUTE_DATA.name}
              </p>
              <p className="font-label-caps text-[9px] text-on-surface-variant">
                Avoiding {ROUTE_DATA.avoidingZones} protected zones
              </p>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2">
            {[
              { label: "Distance", value: ROUTE_DATA.distance },
              { label: "Est. Fuel", value: ROUTE_DATA.fuel },
              { label: "Time", value: ROUTE_DATA.time },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded bg-surface-container-highest/50 p-2 text-center"
              >
                <p className="font-label-caps text-[9px] text-on-surface-variant">
                  {stat.label}
                </p>
                <p
                  className="text-primary text-sm mt-0.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Sustainability score */}
          <div className="mb-3">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="font-label-caps text-on-surface-variant">
                Sustainability
              </span>
              <span
                className="text-primary"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {ROUTE_DATA.sustainability}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${ROUTE_DATA.sustainability}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              />
            </div>
          </div>

          <motion.button
            className="w-full rounded border border-primary/50 py-2 font-label-caps text-[10px] text-primary transition-all hover:bg-primary/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send to Vessel Autopilot
          </motion.button>
        </div>
      </section>

      {/* ── Ocean Conditions ────────────────────────── */}
      <section className="space-y-3">
        <h3 className="font-label-caps text-on-surface-variant">
          Ocean Conditions
        </h3>
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {OCEAN_CONDITIONS.map((condition, i) => {
            const Icon = conditionIcons[condition.icon] || Waves;
            const TrendIcon = condition.trend ? trendIcons[condition.trend] : Minus;
            return (
              <motion.div
                key={condition.label}
                variants={staggerItem}
                className="flex flex-col items-center justify-center rounded-xl border border-border-glow bg-surface-container-low p-3"
              >
                <Icon className={`mb-1.5 h-5 w-5 ${condition.color}`} />
                <p className="font-label-caps text-[9px] text-on-surface-variant mb-0.5">
                  {condition.label}
                </p>
                <p
                  className="text-on-surface text-lg"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {condition.value}
                  <span className="text-xs text-on-surface-variant ml-0.5">
                    {condition.unit}
                  </span>
                </p>
                {condition.trend && (
                  <TrendIcon
                    className={`mt-1 h-3 w-3 ${
                      condition.trend === "up"
                        ? "text-status-warning"
                        : condition.trend === "down"
                        ? "text-primary"
                        : "text-on-surface-variant/50"
                    }`}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Radar Visualization ─────────────────────── */}
      <div className="relative mx-auto w-full aspect-square max-w-[200px] overflow-hidden rounded-full border border-border-glow bg-surface-container-lowest flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
        {/* Radar sweep */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(166, 207, 190, 0.2) 30deg, transparent 60deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {/* Grid circles */}
        <div className="absolute inset-[15%] rounded-full border border-primary/10" />
        <div className="absolute inset-[30%] rounded-full border border-primary/10" />
        <div className="absolute inset-[45%] rounded-full border border-primary/10" />
        {/* Center label */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.span
            className="font-label-caps text-[10px] text-primary"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scanning Active...
          </motion.span>
        </div>
      </div>
    </aside>
  );
}
