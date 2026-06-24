"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  AlertTriangle,
  Gavel,
  ShieldAlert,
  Compass,
  type LucideIcon,
  Zap,
} from "lucide-react";
import { ALERTS, type AlertData } from "@/lib/fisherman-data";
import { useAlerts } from "@/hooks/use-alerts";

const alertIcons: Record<string, LucideIcon> = {
  AlertTriangle,
  Gavel,
  ShieldAlert,
  Compass,
};

// Map Supabase alert types to icon names
const typeToIcon: Record<string, string> = {
  weather: "AlertTriangle",
  coral: "AlertTriangle",
  illegal: "ShieldAlert",
  biodiversity: "Compass",
  stress: "AlertTriangle",
};

// Map Supabase severity to fisherman AlertData type format
const severityToType: Record<string, "critical" | "warning" | "info" | "notice"> = {
  critical: "critical",
  high: "warning",
  moderate: "info",
  low: "notice",
};

const severityConfig = {
  critical: {
    bg: "bg-status-critical/20",
    text: "text-status-critical",
    border: "border-status-critical/30",
  },
  warning: {
    bg: "bg-status-warning/20",
    text: "text-status-warning",
    border: "border-status-warning/30",
  },
  info: {
    bg: "bg-status-info/20",
    text: "text-status-info",
    border: "border-status-info/30",
  },
  notice: {
    bg: "bg-primary/20",
    text: "text-primary",
    border: "border-primary/30",
  },
};

export function AlertStrip() {
  const [visible, setVisible] = useState(true);
  const { data: liveAlerts, loading, error } = useAlerts();

  // Convert live Supabase alerts to AlertData format, or fallback to mock
  const alerts: AlertData[] = liveAlerts && liveAlerts.length > 0
    ? liveAlerts.slice(0, 2).map((a) => ({
        id: a.id,
        type: severityToType[a.severity] || "notice",
        title: a.title,
        message: `${a.location} — ${a.time}`,
        time: a.time,
        icon: typeToIcon[a.type] || "AlertTriangle",
      }))
    : ALERTS.slice(0, 2);

  if (!visible || alerts.length === 0) return null;

  return (
    <motion.div
      className="absolute bottom-5 left-1/2 z-30 w-[85%] max-w-4xl -translate-x-1/2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-4 rounded-xl border border-border-glow bg-surface-glass p-4 shadow-2xl backdrop-blur-xl">
        {loading ? (
          <div className="flex-1 flex items-center justify-center gap-3 py-2">
            <div className="h-4 w-4 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <span className="text-primary/50 text-[10px] font-mono animate-pulse">[LOADING ALERTS...]</span>
          </div>
        ) : (
          <>
            {alerts.map((alert, i) => {
              const Icon = alertIcons[alert.icon] || AlertTriangle;
              const severity = severityConfig[alert.type];
              return (
                <motion.div
                  key={alert.id}
                  className={`flex items-center gap-3 ${
                    i < alerts.length - 1 ? "border-r border-border-glow pr-4" : ""
                  } flex-1`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${severity.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${severity.text}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-label-caps text-[9px] ${severity.text}`}>
                      {alert.title}
                    </p>
                    <p className="text-on-surface text-sm truncate">{alert.message}</p>
                  </div>
                </motion.div>
              );
            })}
          </>
        )}

        <motion.button
          onClick={() => setVisible(false)}
          className="shrink-0 rounded border border-outline-variant bg-surface-container-highest px-4 py-2 font-label-caps text-[10px] text-on-surface-variant transition-all hover:bg-surface-bright"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Dismiss All
        </motion.button>
      </div>
    </motion.div>
  );
}
