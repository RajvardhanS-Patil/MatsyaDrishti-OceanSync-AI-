"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type EcoLayer } from "@/lib/digital-twin-data";
import {
  getSimulationData,
  type SimVessel,
} from "@/lib/simulation-engine";
import {
  Ship,
  Shield,
  Info,
  Compass,
  AlertTriangle,
  Activity,
  Droplet,
  Thermometer,
} from "lucide-react";

interface TwinCanvasProps {
  layers: EcoLayer[];
  timeValue: number;
}

export function TwinCanvas({ layers, timeValue }: TwinCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive coordinates & telemetry
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [coords, setCoords] = useState({ lat: "15.4210° N", lon: "73.8400° E" });
  const [hoveredEntity, setHoveredEntity] = useState<{
    type: "fish" | "vessel" | "coral" | "zone";
    data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  } | null>(null);
  const [selectedVessel, setSelectedVessel] = useState<SimVessel | null>(null);

  // Local telemetry interpolation based on mouse coordinates
  const [localSST, setLocalSST] = useState(26.4);
  const [localDepth, setLocalDepth] = useState(120);

  // Get active simulation dataset
  const simData = getSimulationData(timeValue);
  const isLayerOn = (id: string) => layers.find((l) => l.id === id)?.enabled ?? false;

  // Handle mouse movement to update coordinates and local telemetry
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 100;
    const cy = ((e.clientY - rect.top) / rect.height) * 100;

    // Constrain within 0 - 100
    const clampedX = Math.max(0, Math.min(100, cx));
    const clampedY = Math.max(0, Math.min(100, cy));

    setMousePos({ x: clampedX, y: clampedY });

    // Map X/Y to real geospatial coordinates (Goa Coast)
    const latNum = 16.05 - (clampedY / 100) * 1.15;
    const lonNum = 73.15 + (clampedX / 100) * 1.35;
    setCoords({
      lat: `${latNum.toFixed(4)}° N`,
      lon: `${lonNum.toFixed(4)}° E`,
    });

    // Interpolate depth: shallower near top-right (coastline), deeper in SW (bottom-left)
    const baseDepth = 40 + (clampedX * 0.8) + ((100 - clampedY) * 3.2);
    setLocalDepth(Math.round(baseDepth));

    // Interpolate SST: base is 26.2°C, modified by thermal plumes in simData
    let temp = 26.0;
    if (isLayerOn("sst")) {
      simData.sst.forEach((plume) => {
        const px = parseFloat(plume.x);
        const py = parseFloat(plume.y);
        const dist = Math.sqrt(Math.pow(clampedX - px, 2) + Math.pow(clampedY - py, 2));
        const influenceRadius = plume.size / 6;
        if (dist < influenceRadius) {
          const factor = Math.exp(-Math.pow(dist, 2) / Math.pow(influenceRadius / 2, 2));
          temp += (plume.temperature - 26.0) * factor;
        }
      });
    }
    setLocalSST(parseFloat(temp.toFixed(1)));
  };

  // Close entity tooltip on double click or click background
  const handleBgClick = () => {
    setSelectedVessel(null);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-[#02080c] overflow-hidden select-none cursor-crosshair"
      onMouseMove={handleMouseMove}
      onClick={handleBgClick}
    >
      {/* ── OCEAN BACKGROUND & DEPTH GRADIENT ────────────────── */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse at ${40 + timeValue * 0.2}% ${30 + timeValue * 0.1}%, rgba(8, 48, 62, 0.75) 0%, rgba(2, 8, 12, 1) 75%)`,
        }}
      />

      {/* ── GEOSPATIAL COORDINATE GRID LINES ────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] grid grid-cols-12 grid-rows-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`grid-v-${i}`} className="border-r border-primary h-full" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`grid-h-${i}`} className="border-b border-primary w-full" />
        ))}
      </div>

      {/* Crosshair Overlay following Mouse */}
      <div
        className="absolute pointer-events-none border border-primary/10 h-full"
        style={{ left: `${mousePos.x}%`, width: 1 }}
      />
      <div
        className="absolute pointer-events-none border-b border-primary/10 w-full"
        style={{ top: `${mousePos.y}%`, height: 1 }}
      />

      {/* Edge Lat/Long Markers */}
      <div className="absolute left-2 top-2 pointer-events-none font-mono text-[9px] text-primary/30">16.05°N</div>
      <div className="absolute left-2 bottom-2 pointer-events-none font-mono text-[9px] text-primary/30">14.90°N</div>
      <div className="absolute right-2 bottom-2 pointer-events-none font-mono text-[9px] text-primary/30">74.50°E</div>
      <div className="absolute left-1/2 bottom-2 -translate-x-1/2 pointer-events-none font-mono text-[9px] text-primary/30">73.82°E</div>

      {/* ── LAYER: Ocean Currents (SVG Flow Waves) ────────── */}
      {isLayerOn("currents") && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {simData.currents.map((curr, idx) => {
            const points: string[] = [];
            const steps = 40;
            for (let x = -50; x <= 1100; x += 1150 / steps) {
              const rad = (x / 1100) * 4 * Math.PI + curr.phase;
              const yVal = (curr.y / 100) * 800 + Math.sin(rad) * curr.amplitude;
              points.push(`${x},${yVal}`);
            }
            const pathData = `M ${points.join(" L ")}`;
            return (
              <motion.path
                key={`current-wave-${idx}`}
                d={pathData}
                fill="none"
                stroke={`rgba(168, 206, 205, ${curr.opacity})`}
                strokeWidth={curr.thickness}
                strokeDasharray="8 12"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -100 }}
                transition={{
                  duration: 25 / (curr.speed / 10),
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          })}
        </svg>
      )}

      {/* ── LAYER: SST Heatmap Plumes ────────────────────── */}
      {isLayerOn("sst") &&
        simData.sst.map((plume, idx) => (
          <div
            key={`plume-${idx}`}
            className="absolute rounded-full pointer-events-none mix-blend-screen transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
            style={{
              left: plume.x,
              top: plume.y,
              width: plume.size,
              height: plume.size,
              background: `radial-gradient(circle, ${plume.temperature > 27 ? "rgba(239,68,68,0.22)" : "rgba(59,130,246,0.18)"} 0%, transparent 75%)`,
            }}
          />
        ))}

      {/* ── LAYER: Biodiversity Hotspot Zones ────────────── */}
      {isLayerOn("biodiversity") &&
        simData.biodiversity.map((zone, idx) => (
          <motion.div
            key={`bio-${idx}`}
            className="absolute rounded-full border border-primary/20 bg-primary/[0.02]"
            style={{
              left: zone.x,
              top: zone.y,
              width: zone.w,
              height: zone.h,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              borderRadius: ["48% 52% 50% 50%", "52% 48% 52% 48%", "48% 52% 50% 50%"],
            }}
            transition={{
              duration: 8 + idx * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-sm pointer-events-none" />
          </motion.div>
        ))}

      {/* ── LAYER: Conservation Boundaries ────────────────── */}
      {isLayerOn("zones") &&
        simData.zones.map((zone, idx) => (
          <div
            key={`zone-${idx}`}
            className="absolute border border-dashed border-status-critical/30 bg-status-critical/[0.015] rounded-lg p-2"
            style={{
              left: zone.x,
              top: zone.y,
              width: zone.w,
              height: zone.h,
            }}
            onMouseEnter={() => setHoveredEntity({ type: "zone", data: zone })}
            onMouseLeave={() => setHoveredEntity(null)}
          >
            <span className="font-label-caps text-[6px] tracking-wider text-status-critical/60 flex items-center gap-1">
              <Shield className="w-2 h-2" /> {zone.name.toUpperCase()}
            </span>
          </div>
        ))}

      {/* ── LAYER: Coral Reef Sites ──────────────────────── */}
      {isLayerOn("coral") &&
        simData.coral.map((reef, idx) => {
          const colorClass =
            reef.bleachingRisk === "Critical"
              ? "border-status-critical text-status-critical bg-status-critical/10"
              : reef.bleachingRisk === "Warning"
                ? "border-status-warning text-status-warning bg-status-warning/10"
                : "border-primary text-primary bg-primary/10";
          return (
            <div
              key={`coral-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: reef.x, top: reef.y }}
              onMouseEnter={() => setHoveredEntity({ type: "coral", data: reef })}
              onMouseLeave={() => setHoveredEntity(null)}
            >
              {/* Pulsing ring indicator */}
              <motion.div
                className={`absolute rounded-full border border-dashed ${colorClass}`}
                style={{
                  width: reef.radius * 2,
                  height: reef.radius * 2,
                  left: -reef.radius,
                  top: -reef.radius,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className={`absolute rounded-full opacity-35 ${reef.bleachingRisk === "Critical" ? "bg-status-critical" : reef.bleachingRisk === "Warning" ? "bg-status-warning" : "bg-primary"}`}
                style={{
                  width: reef.radius * 0.8,
                  height: reef.radius * 0.8,
                  left: -reef.radius * 0.4,
                  top: -reef.radius * 0.4,
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
              />
              {/* Anchored label */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-surface/80 border border-secondary/30 backdrop-blur-sm shadow-md whitespace-nowrap text-[7px] text-secondary font-mono flex items-center gap-1">
                <span className={`w-1 h-1 rounded-full ${reef.bleachingRisk === "Critical" ? "bg-status-critical animate-ping" : reef.bleachingRisk === "Warning" ? "bg-status-warning" : "bg-primary"}`} />
                {reef.name}
              </div>
            </div>
          );
        })}

      {/* ── LAYER: Vessel Routes & Tracks (SVG path) ──────── */}
      {isLayerOn("vessels") && (selectedVessel || hoveredEntity?.type === "vessel") && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {simData.vessels.map((v, idx) => {
            const isHovered = hoveredEntity?.type === "vessel" && hoveredEntity.data.id === v.id;
            const isSelected = selectedVessel?.id === v.id;
            if (!isHovered && !isSelected) return null;

            const pathStr = v.route.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p[0]}% ${p[1]}%`).join(" ");
            return (
              <motion.path
                key={`route-${idx}`}
                d={pathStr}
                fill="none"
                stroke={isSelected ? "#00A3FF" : "rgba(166,207,190,0.5)"}
                strokeWidth={1.5}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
            );
          })}
        </svg>
      )}

      {/* ── LAYER: Active Vessel Tracking Node Markers ───── */}
      {isLayerOn("vessels") &&
        simData.vessels.map((vessel, idx) => {
          const isSelected = selectedVessel?.id === vessel.id;
          return (
            <div
              key={`vessel-node-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{ left: vessel.x, top: vessel.y }}
              onMouseEnter={() => setHoveredEntity({ type: "vessel", data: vessel })}
              onMouseLeave={() => setHoveredEntity(null)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVessel(vessel);
              }}
            >
              {vessel.active && (
                <motion.div
                  className="absolute -inset-4 rounded-full bg-[#00A3FF]/15"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {/* Rotated compass heading arrow indicator */}
              <motion.div
                className={`p-1 rounded-full border flex items-center justify-center transition-all ${isSelected ? "bg-primary text-surface border-primary shadow-[0_0_12px_rgba(0,163,255,0.6)]" : "bg-surface/90 text-primary border-secondary/50 hover:border-primary"}`}
                style={{ transform: `rotate(${vessel.heading}deg)` }}
              >
                <Compass className="w-3.5 h-3.5" />
              </motion.div>
              {/* Vessel callsign tag */}
              <div className="absolute left-5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface/90 border border-secondary/30 backdrop-blur-sm shadow-md whitespace-nowrap text-[7px] text-secondary font-mono">
                {vessel.name}
              </div>
            </div>
          );
        })}

      {/* ── LAYER: Fish School Species Targets ─────────────── */}
      {isLayerOn("fish") &&
        simData.fish.map((cluster, idx) => (
          <div
            key={`fish-group-${idx}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ left: cluster.x, top: cluster.y }}
            onMouseEnter={() => setHoveredEntity({ type: "fish", data: cluster })}
            onMouseLeave={() => setHoveredEntity(null)}
          >
            {/* Visual radar area */}
            <motion.div
              className="absolute rounded-full border border-status-info/20"
              style={{
                width: cluster.size,
                height: cluster.size,
                left: -cluster.size / 2,
                top: -cluster.size / 2,
                background: "radial-gradient(circle, rgba(0,163,255,0.12) 0%, transparent 75%)",
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.6 }}
            />
            {/* Core dot */}
            <div className="absolute w-2 h-2 -left-1 -top-1 rounded-full bg-status-info border border-on-surface shadow-[0_0_10px_rgba(0,163,255,0.8)]" />
          </div>
        ))}

      {/* ── INTERACTIVE DRIFTING FISH PARTICLES ──────────────── */}
      {isLayerOn("fish") &&
        [...Array(15)].map((_, i) => {
          const clusterIndex = i % simData.fish.length;
          const cluster = simData.fish[clusterIndex];
          const cx = parseFloat(cluster.x);
          const cy = parseFloat(cluster.y);
          const offsetRadius = 2 + (i * 1.5) % 8;
          const angle = (i * 45 + timeValue * 3) * (Math.PI / 180);
          const fx = cx + offsetRadius * Math.cos(angle) * 0.7;
          const fy = cy + offsetRadius * Math.sin(angle) * 0.7;

          return (
            <motion.div
              key={`fish-particle-${i}`}
              className="absolute w-1 h-0.5 rounded-full bg-status-info/40 pointer-events-none"
              style={{ left: `${fx}%`, top: `${fy}%` }}
              animate={{ rotate: (angle * 180) / Math.PI }}
            />
          );
        })}

      {/* ── INTERACTIVE TELEMETRY HOVER TOOLTIPS ───────────── */}
      <AnimatePresence>
        {hoveredEntity && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute z-50 pointer-events-none max-w-[220px] rounded-lg border border-secondary/50 bg-surface/95 p-3 backdrop-blur-md shadow-2xl font-mono text-[9px] text-secondary"
            style={{
              left: `${mousePos.x + 3 > 75 ? mousePos.x - 25 : mousePos.x + 2}%`,
              top: `${mousePos.y + 3 > 70 ? mousePos.y - 25 : mousePos.y + 2}%`,
            }}
          >
            {/* Tooltip Content based on type */}
            {hoveredEntity.type === "vessel" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between border-b border-secondary/30 pb-1">
                  <span className="font-bold text-primary flex items-center gap-1">
                    <Ship className="w-3 h-3" /> {hoveredEntity.data.name}
                  </span>
                  <span className="text-[7px] bg-secondary/20 px-1 rounded font-bold">
                    {hoveredEntity.data.id}
                  </span>
                </div>
                <p>
                  <span className="text-secondary/60">Heading:</span> {hoveredEntity.data.heading}° (Compass)
                </p>
                <p>
                  <span className="text-secondary/60">Speed:</span> {hoveredEntity.data.speed} knots
                </p>
                <p>
                  <span className="text-secondary/60">Operational Status:</span>
                  <br />
                  <span className={hoveredEntity.data.status.includes("Trawling") ? "text-status-critical" : "text-primary"}>
                    {hoveredEntity.data.status}
                  </span>
                </p>
                <div className="text-[7px] text-secondary/40 pt-1 border-t border-secondary/20 flex items-center gap-1">
                  <Info className="w-2.5 h-2.5" /> Click vessel to view route path.
                </div>
              </div>
            )}

            {hoveredEntity.type === "fish" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between border-b border-secondary/30 pb-1">
                  <span className="font-bold text-status-info flex items-center gap-1">
                    <Activity className="w-3 h-3" /> {hoveredEntity.data.species}
                  </span>
                  <span className="text-[8px] text-secondary/50">Sonar School</span>
                </div>
                <p>
                  <span className="text-secondary/60">Est. Abundance:</span> {hoveredEntity.data.count} units
                </p>
                <p>
                  <span className="text-secondary/60">Aggregation Area:</span> {hoveredEntity.data.size}m²
                </p>
                <p>
                  <span className="text-secondary/60">Swimming Depth:</span> {Math.round(hoveredEntity.data.depth)}m
                </p>
                <p>
                  <span className="text-secondary/60">Behavior Anomaly:</span>
                  <br />
                  <span className="text-primary font-semibold">{hoveredEntity.data.healthImpact}</span>
                </p>
              </div>
            )}

            {hoveredEntity.type === "coral" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between border-b border-secondary/30 pb-1">
                  <span className="font-bold text-status-warning flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {hoveredEntity.data.name}
                  </span>
                </div>
                <p>
                  <span className="text-secondary/60">Reef Vitality Health:</span>
                  <br />
                  <span className={`font-bold ${hoveredEntity.data.health < 60 ? "text-status-critical" : "text-status-warning"}`}>
                    {hoveredEntity.data.health}%
                  </span>
                </p>
                <p>
                  <span className="text-secondary/60">Coral Bleaching Risk:</span>
                  <br />
                  <span
                    className={`font-semibold ${
                      hoveredEntity.data.bleachingRisk === "Critical"
                        ? "text-status-critical font-bold animate-pulse"
                        : hoveredEntity.data.bleachingRisk === "Warning"
                          ? "text-status-warning"
                          : "text-primary"
                    }`}
                  >
                    {hoveredEntity.data.bleachingRisk.toUpperCase()}
                  </span>
                </p>
                <p>
                  <span className="text-secondary/60">Sanctuary Radius:</span> {hoveredEntity.data.radius}nm
                </p>
              </div>
            )}

            {hoveredEntity.type === "zone" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between border-b border-secondary/30 pb-1">
                  <span className="font-bold text-status-critical flex items-center gap-1">
                    <Shield className="w-3 h-3" /> {hoveredEntity.data.name}
                  </span>
                </div>
                <p>
                  <span className="text-secondary/60">Enforcement Rules:</span>
                  <br />
                  <span className="text-status-critical font-semibold">{hoveredEntity.data.restriction}</span>
                </p>
                <p>
                  <span className="text-secondary/60">Active Threat Level:</span>
                  <br />
                  <span className={`font-bold ${hoveredEntity.data.threatLevel === "High" ? "text-status-critical animate-pulse" : "text-status-warning"}`}>
                    {hoveredEntity.data.threatLevel}
                  </span>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CONTEXT TELEMETRY LIVE MONITOR OVERLAY (Bottom-Right Panel) ── */}
      <div className="absolute right-5 bottom-16 z-20 w-[240px] glass-panel border border-secondary/40 backdrop-blur-md rounded-lg p-3 shadow-xl font-mono text-[9px] text-secondary">
        <div className="flex items-center gap-1 border-b border-secondary/30 pb-1.5 mb-1.5 justify-between">
          <span className="font-bold text-primary flex items-center gap-1 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Live Telemetry
          </span>
          <span className="text-[7px] text-secondary/50 font-semibold bg-secondary/15 px-1 rounded">
            GOA COASTAL
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
          <div>
            <span className="text-secondary/50 block">Latitude</span>
            <span className="text-secondary font-medium">{coords.lat}</span>
          </div>
          <div>
            <span className="text-secondary/50 block">Longitude</span>
            <span className="text-secondary font-medium">{coords.lon}</span>
          </div>
          <div className="border-t border-secondary/20 pt-1">
            <span className="text-secondary/50 block flex items-center gap-0.5">
              <Thermometer className="w-2.5 h-2.5" /> SST Anomaly
            </span>
            <span className={`text-[10px] font-bold ${localSST > 27.5 ? "text-status-critical" : "text-primary"}`}>
              {localSST.toFixed(1)}°C
            </span>
          </div>
          <div className="border-t border-secondary/20 pt-1">
            <span className="text-secondary/50 block flex items-center gap-0.5">
              <Droplet className="w-2.5 h-2.5" /> Depth
            </span>
            <span className="text-[10px] font-bold text-secondary">
              {localDepth}m
            </span>
          </div>
        </div>
        <div className="border-t border-secondary/20 pt-1.5 mt-1.5 flex items-center justify-between text-[7px] text-secondary/40">
          <span>Simulation Speed: 1.0x</span>
          <span>Buffer: SYNCED</span>
        </div>
      </div>
    </div>
  );
}
