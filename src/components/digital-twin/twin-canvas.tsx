"use client";

import { motion } from "framer-motion";
import { type TwinLayer } from "@/app/digital-twin/page";

interface TwinCanvasProps {
  layers: TwinLayer[];
  timeValue: number;
  streams: any;
}

export function TwinCanvas({ layers, timeValue, streams }: TwinCanvasProps) {
  const isLayerOn = (id: string) => layers.find((l) => l.id === id)?.enabled ?? false;

  const vesselsData = streams.vessels?.data || [];
  const alertsData = streams.alerts?.data || [];
  const oceanData = streams.oceanConditions?.data;
  const aiData = streams.aiPredictions?.data;

  // Spatial mapping rules as defined in DIGITAL_TWIN_ARCHITECTURE.md
  const mapLat = (lat: number) => 100 - (((lat - 14.0) / (20.0 - 14.0)) * 100);
  const mapLon = (lon: number) => (((lon - 72.0) / (76.0 - 72.0)) * 100);

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

      {/* ── LAYER: Ocean Conditions ─────────────────── */}
      {isLayerOn("ocean_conditions") && (
        <>
          {/* Currents */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`current-${i}`}
              className="absolute h-px"
              style={{
                top: `${10 + i * 11}%`,
                left: "-15%",
                width: "130%",
                background: `linear-gradient(${90 + i * 5}deg, transparent 0%, rgba(0, 163, 255, ${0.12 + i * 0.02}) 30%, rgba(0, 163, 255, 0.05) 60%, transparent 100%)`,
              }}
              animate={{ x: ["-20%", "20%", "-20%"], opacity: [0.08, 0.25, 0.08] }}
              transition={{ duration: 12 + i * 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            />
          ))}
          {/* SST Heatmap scaled by temperature */}
          {oceanData && (
            <motion.div className="absolute top-[15%] right-[20%] w-72 h-72 rounded-full"
              style={{ background: `radial-gradient(circle, rgba(255,107,107,${oceanData.temperature > 29 ? 0.4 : 0.15}) 0%, transparent 70%)` }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
              initial={{ opacity: 0 }} />
          )}
          {/* Chlorophyll scaled by concentration */}
          {oceanData && (
             <motion.div className="absolute top-[40%] left-[25%] w-[40%] h-[35%] rounded-[50%]"
             style={{ background: `radial-gradient(ellipse, rgba(74,222,128,${oceanData.chlorophyll > 5 ? 0.3 : 0.1}) 0%, transparent 70%)` }}
             animate={{ opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 7, repeat: Infinity }}
             initial={{ opacity: 0 }} />
          )}
        </>
      )}

      {/* ── LAYER: Biodiversity ──────────────────── */}
      {isLayerOn("biodiversity") && (
        <>
          {[
            { x: "22%", y: "30%", size: 90, delay: 0 },
            { x: "55%", y: "45%", size: 65, delay: 1 },
            { x: "70%", y: "25%", size: 50, delay: 0.5 },
            { x: "35%", y: "65%", size: 75, delay: 1.5 }
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
                background: "radial-gradient(circle, rgba(74,222,128,0.25) 0%, rgba(74,222,128,0.05) 50%, transparent 75%)"
              }} />
              <div className="absolute inset-[35%] rounded-full bg-status-info/30 border border-status-info/20" />
            </motion.div>
          ))}
        </>
      )}

      {/* ── LAYER: Vessel Tracking ────────────────── */}
      {isLayerOn("vessels") && vesselsData.map((v: any) => {
        const x = mapLon(v.longitude);
        const y = mapLat(v.latitude);
        const isCompliant = v.compliance === "compliant";

        return (
          <div key={v.id} className="absolute z-10" style={{ left: `${x}%`, top: `${y}%` }}>
            {!isCompliant && (
              <motion.div className="absolute -inset-5 rounded-full bg-status-warning/10"
                animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }} />
            )}
            <motion.div
              className={`h-2.5 w-2.5 rounded-full border ${isCompliant ? "bg-primary border-on-surface shadow-[0_0_12px_rgba(166,207,190,0.7)]" : "bg-status-warning border-status-warning/30"}`}
              animate={isCompliant ? {} : { opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 glass-panel rounded px-1.5 py-0.5 whitespace-nowrap">
              <span className={`text-[7px] ${isCompliant ? "text-primary" : "text-status-warning"}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.vessel_name}</span>
            </div>
          </div>
        );
      })}

      {/* ── LAYER: Alerts ─────────────────────────── */}
      {isLayerOn("alerts") && alertsData.map((a: any) => {
        const x = mapLon(a.longitude);
        const y = mapLat(a.latitude);
        const isCritical = a.severity === "critical" || a.severity === "high";

        return (
          <div key={a.id} className="absolute z-20" style={{ left: `${x}%`, top: `${y}%` }}>
            <motion.div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed ${isCritical ? 'border-status-critical/50' : 'border-status-warning/50'}`}
              style={{ width: 100, height: 100 }}
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }} />
            <motion.div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${isCritical ? 'bg-status-critical/20' : 'bg-status-warning/20'}`}
              style={{ width: 40, height: 40 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 glass-panel rounded px-1.5 py-0.5 whitespace-nowrap text-center">
               <span className={`block text-[7px] font-bold ${isCritical ? 'text-status-critical' : 'text-status-warning'}`}>{a.type}</span>
            </div>
          </div>
        );
      })}

      {/* ── LAYER: AI Risk Overlay ────────────────── */}
      {isLayerOn("ai_risk") && aiData && (
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 50%, rgba(255,206,0,${aiData.risk_score > 50 ? 0.15 : 0.05}) 0%, transparent 60%)` }}
          animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 8, repeat: Infinity }} />
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
