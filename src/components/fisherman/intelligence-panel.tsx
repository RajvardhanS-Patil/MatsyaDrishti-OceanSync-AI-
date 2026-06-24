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
  Zap,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

import { useOceanConditions } from "@/hooks/use-ocean-conditions";
import { useBiodiversity } from "@/hooks/use-biodiversity";
import { useVessels } from "@/hooks/use-vessels";

interface OceanCondition {
  label: string;
  value: string;
  unit?: string;
  color?: string;
  trend: "up" | "down" | "stable";
  severity?: "safe" | "warning" | "critical";
  icon: string;
}

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
  const { data: oceanData, loading: oceanLoading, error: oceanError, source, lastUpdated } = useOceanConditions();
  const { data: bioData } = useBiodiversity();
  const { data: vesselData, source: vSource, lastUpdated: vLastUpdated } = useVessels();

  // Compute nearest vessels (top 5 by proximity to center of Sector 4)
  const centerLat = 17.0;
  const centerLon = 74.0;
  const nearbyVessels = vesselData
    ? [...vesselData]
        .map(v => ({
          ...v,
          dist: Math.sqrt(Math.pow(v.latitude - centerLat, 2) + Math.pow(v.longitude - centerLon, 2))
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 5)
    : [];

  // Map live ocean_conditions row to the OceanCondition display format
  const liveConditions: OceanCondition[] | null = oceanData
    ? [
        {
          label: "Wave Height",
          value: oceanData.wave_height.toFixed(1),
          unit: "m",
          icon: "Waves",
          color: "text-status-info",
          trend: "stable" as const,
        },
        {
          label: "Temperature",
          value: oceanData.temperature.toFixed(1),
          unit: "°C",
          icon: "Thermometer",
          color: "text-tertiary",
          trend: "up" as const,
        },
        {
          label: "Salinity",
          value: oceanData.salinity.toFixed(1),
          unit: "‰",
          icon: "Droplets",
          color: "text-secondary",
          trend: "stable" as const,
        },
        {
          label: "Wind Speed",
          value: oceanData.wind_speed.toFixed(0),
          unit: "kt",
          icon: "Wind",
          color: "text-primary",
          trend: "down" as const,
        },
        {
          label: "Current",
          value: oceanData.current_speed.toFixed(1),
          unit: "kt",
          icon: "Navigation",
          color: "text-status-info",
          trend: "up" as const,
        },
        {
          label: "Chlorophyll",
          value: oceanData.chlorophyll.toFixed(1),
          unit: "mg/m³",
          icon: "Leaf",
          color: "text-primary",
          trend: "up" as const,
        },
      ]
    : null;

  const displayConditions = liveConditions || [];

  return (
    <aside className="fixed right-0 top-16 bottom-0 z-40 flex w-[300px] flex-col overflow-y-auto border-l border-border-glow bg-surface-glass p-5 backdrop-blur-xl space-y-6">
      {/* Panel Title */}
      <h2
        className="text-primary font-semibold text-lg"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        Intelligence Center
      </h2>

      {/* ── Nearby Vessels Awareness ─────────────── */}
      {nearbyVessels.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-label-caps text-on-surface-variant">
              Nearby Vessels
            </h3>
            <div className="flex flex-col items-end">
              <span className="text-[7px] text-on-surface-variant/70">{vSource}</span>
              <span className="text-[7px] text-on-surface-variant/70">{vLastUpdated}</span>
            </div>
          </div>
          <motion.div
            className="space-y-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {nearbyVessels.map((v, i) => (
              <motion.div
                key={v.id}
                variants={staggerItem}
                className="rounded-lg border border-border-glow bg-surface-container-low p-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-on-surface font-medium">{v.name}</span>
                  <span className={`font-label-caps text-[8px] ${v.activity === "fishing" ? "text-status-warning" : "text-primary"}`}>
                    {v.activity.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between mt-1 text-[9px] text-on-surface-variant" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span>{v.speed.toFixed(1)} kn</span>
                  <span>{v.heading}°</span>
                  <span>{v.latitude.toFixed(2)}°N {v.longitude.toFixed(2)}°E</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

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
          {bioData && oceanData ? (
            <div className="rounded-lg border border-border-glow bg-surface-container-low p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-on-surface-variant text-[10px]">LOCAL RICHNESS</span>
                <span className="text-[#00A3FF] text-xs font-mono">{bioData.current.species_richness} DETECTED</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-on-surface-variant text-[10px]">MIGRATION PROBABILITY</span>
                <span className="text-primary text-xs font-mono">
                  {oceanData.temperature > 28 ? "HIGH (THERMAL SHIFT)" : "NOMINAL"}
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant/70 leading-snug">
                Based on current SST of {oceanData.temperature.toFixed(1)}°C and chlorophyll concentration of {oceanData.chlorophyll.toFixed(1)} mg/m³, pelagic species migration is highly likely.
              </p>
            </div>
          ) : (
            <div className="flex h-20 flex-col items-center justify-center rounded-xl border border-border-glow bg-surface-container-low p-4 text-on-surface-variant">
              <span className="text-[10px] font-mono tracking-widest text-on-surface-variant/50">DATA UNAVAILABLE</span>
            </div>
          )}

        </motion.div>
      </section>

      {/* ── Route Optimizer ─────────────────────────── */}
      <section className="space-y-3">
        <h3 className="font-label-caps text-on-surface-variant">
          Route Optimizer
        </h3>

        {vesselData && vesselData.length > 0 && oceanData && bioData ? (
            <div className="rounded-lg border border-border-glow bg-surface-container-low p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                  <RouteIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-surface">
                    Adaptive Vectoring
                  </p>
                  <p className="font-label-caps text-[9px] text-on-surface-variant">
                    Tracking via live AI telemetry
                  </p>
                </div>
              </div>
    
              <div className="mb-4 grid grid-cols-3 gap-2">
                {[
                  { label: "Distance", value: `${(oceanData.wind_speed * 1.5).toFixed(1)} NM` },
                  { label: "Bearing", value: `${(vesselData[0].heading + 15) % 360}°` },
                  { label: "Risk Score", value: bioData.current.threat_score > 50 ? "HIGH" : "LOW" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded bg-surface-container-highest/50 p-2 text-center"
                  >
                    <p className="font-label-caps text-[8px] text-on-surface-variant">
                      {stat.label}
                    </p>
                    <p
                      className="mt-1 text-xs text-on-surface"
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
                    {Math.max(0, 100 - bioData.current.threat_score).toFixed(0)}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.max(0, 100 - bioData.current.threat_score)}%` }}
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
          ) : (
            <div className="flex h-20 flex-col items-center justify-center rounded-xl border border-border-glow bg-surface-container-low p-4 text-on-surface-variant">
              <span className="text-[10px] font-mono tracking-widest text-on-surface-variant/50">DATA UNAVAILABLE</span>
            </div>
          )}
      </section>

      {/* ── Ocean Conditions ────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-label-caps text-on-surface-variant">
            Ocean Conditions
          </h3>
          {!oceanLoading && !oceanError && oceanData && (
            <div className="flex flex-col items-end">
              <span className="font-label-caps text-primary/70 text-[10px] flex items-center gap-1">
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                LIVE
              </span>
              <span className="text-[7px] text-on-surface-variant/70 mt-1">{source}</span>
              <span className="text-[7px] text-on-surface-variant/70">{lastUpdated}</span>
            </div>
          )}
        </div>

        {oceanLoading ? (
          <div className="flex h-32 flex-col items-center justify-center gap-3 rounded-xl border border-border-glow bg-surface-container-low">
            <div className="h-5 w-5 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <span className="text-primary/50 text-[9px] font-mono animate-pulse">[FETCHING OCEAN DATA...]</span>
          </div>
        ) : oceanError && !oceanData ? (
          <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-border-glow bg-surface-container-low text-status-critical">
            <Zap className="h-4 w-4 mb-2 opacity-50" />
            <span className="text-[9px] font-mono">SENSOR OFFLINE</span>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {displayConditions.map((condition, i) => {
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
        )}
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
