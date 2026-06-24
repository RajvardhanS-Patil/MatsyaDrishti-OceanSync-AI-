"use client";

import { motion } from "framer-motion";
import { VESSEL_FEED, INCIDENTS } from "@/lib/authority-data";
import { AlertTriangle, CloudLightning, Fish, ShieldAlert, Thermometer, Ship, type LucideIcon, Zap } from "lucide-react";
import { useAlerts } from "@/hooks/use-alerts";
import { useVessels } from "@/hooks/use-vessels";

const incidentIcons: Record<string, LucideIcon> = {
  weather: CloudLightning,
  coral: Thermometer,
  illegal: ShieldAlert,
  biodiversity: Fish,
  stress: AlertTriangle,
  unknown: AlertTriangle,
};

const severityColor = {
  critical: "text-status-critical bg-status-critical/15 border-status-critical/30",
  high: "text-status-warning bg-status-warning/10 border-status-warning/30",
  moderate: "text-status-info bg-status-info/10 border-status-info/30",
  low: "text-on-surface-variant bg-surface-container-highest border-border-glow",
};

const complianceColor: Record<string, string> = {
  compliant: "text-primary",
  warning: "text-status-warning",
  violation: "text-status-critical",
};

const activityColor: Record<string, string> = {
  fishing: "bg-primary",
  transit: "bg-status-info",
  anchored: "bg-on-surface-variant/40",
  drifting: "bg-status-warning",
};

export function BottomTelemetry() {
  const { data: alertsData, loading: alertsLoading, error: alertsError } = useAlerts();
  const { data: vesselsData, loading: vesselsLoading, error: vesselsError } = useVessels();

  // Fallback to mock data if no live data is available
  const activeIncidents = alertsData || INCIDENTS;

  // Map live vessel data to the display format, fallback to mock
  const vesselFeed = vesselsData
    ? vesselsData.map((v) => ({
        id: v.imo_number || v.id,
        name: v.name,
        type: v.vessel_type,
        lat: `${v.latitude.toFixed(2)}°N`,
        lon: `${v.longitude.toFixed(2)}°E`,
        speed: `${v.speed}kt`,
        activity: v.activity as "fishing" | "transit" | "anchored" | "drifting",
        compliance: v.compliance as "compliant" | "warning" | "violation",
      }))
    : VESSEL_FEED;

  return (
    <div className="flex gap-3 h-full min-h-0">
      {/* ── Vessel Telemetry Feed ────────── */}
      <div className="flex-1 glass-panel rounded-lg p-3 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-label-caps text-on-surface-variant text-[10px] flex items-center gap-1.5">
            <Ship className="h-3.5 w-3.5" /> VESSEL TELEMETRY — {vesselFeed.length} ACTIVE
          </h3>
          <motion.span className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>

        {vesselsLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="h-6 w-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <span className="text-primary/50 text-[10px] font-mono animate-pulse">[SCANNING VESSELS...]</span>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin">
            {vesselFeed.map((v, i) => (
              <motion.div key={v.id}
                className="flex items-center gap-3 rounded border border-border-glow bg-surface-container-low p-2 text-[10px]"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <motion.span className={`h-2 w-2 rounded-full shrink-0 ${activityColor[v.activity] || "bg-on-surface-variant/40"}`}
                  animate={v.activity === "drifting" ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }} />
                <span className="text-on-surface font-medium w-24 truncate">{v.name}</span>
                <span className="text-on-surface-variant/60 w-16" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.lat}</span>
                <span className="text-on-surface-variant/60 w-16" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.lon}</span>
                <span className="text-on-surface-variant/60 w-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.speed}</span>
                <span className="font-label-caps text-[8px] text-on-surface-variant/50 w-14">{v.activity}</span>
                <span className={`font-label-caps text-[8px] ml-auto ${complianceColor[v.compliance] || "text-on-surface-variant"}`}>{v.compliance}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── Live Incident Feed ───────────── */}
      <div className="w-[340px] glass-panel rounded-lg p-3 flex flex-col shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-label-caps text-on-surface-variant text-[10px] flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" /> LIVE INCIDENTS
          </h3>
          {!alertsLoading && !alertsError && (
            <span className="font-label-caps text-[9px] text-status-critical flex items-center gap-1">
              <motion.span className="h-1.5 w-1.5 rounded-full bg-status-critical"
                animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              {activeIncidents.length}
            </span>
          )}
        </div>
        
        {alertsLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
             <div className="h-6 w-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
             <span className="text-primary/50 text-[10px] font-mono animate-pulse">[FETCHING ALERTS...]</span>
          </div>
        ) : alertsError ? (
          <div className="flex-1 flex flex-col items-center justify-center text-status-critical">
             <Zap className="h-5 w-5 mb-2 opacity-50" />
             <span className="text-[10px] font-mono">CONNECTION LOST</span>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin">
            {activeIncidents.map((inc: any, i: number) => {
              const Icon = incidentIcons[inc.type] || incidentIcons.unknown;
              const colors = severityColor[inc.severity as keyof typeof severityColor] || severityColor.low;
              
              return (
                <motion.div key={inc.id}
                  className={`flex items-start gap-2.5 rounded border p-2 ${colors}`}
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium leading-tight">{inc.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[8px] opacity-60 truncate max-w-[180px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{inc.location}</span>
                      <span className="text-[8px] opacity-40 whitespace-nowrap">{inc.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
