"use client";

import { motion } from "framer-motion";
import { SENSOR_FEEDS } from "@/lib/digital-twin-data";

const statusColors = { streaming: "bg-status-info", intermittent: "bg-status-warning", offline: "bg-status-critical" };

export function SensorStatusBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 glass-panel border-t border-border-glow h-10 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <motion.div className="h-2 w-2 rounded-full bg-status-info"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[11px] text-on-surface-variant" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            STREAMING: {SENSOR_FEEDS[0].name.toUpperCase().replace(/ /g, "_")}
          </span>
        </div>
        <span className="text-[11px] text-on-surface-variant border-l border-border-glow pl-6" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          LAT: {SENSOR_FEEDS[0].lat} | LONG: {SENSOR_FEEDS[0].lon}
        </span>
        <span className="text-[11px] text-on-surface-variant/50 border-l border-border-glow pl-6 hidden lg:block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {SENSOR_FEEDS.filter(s => s.status === "streaming").length}/{SENSOR_FEEDS.length} SENSORS ONLINE
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[11px] text-on-surface-variant" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          SYSTEM STATUS: 99.9% UPTIME
        </span>
        <span className="font-label-caps text-[10px] text-primary">V 4.2.1-STABLE</span>
      </div>
    </div>
  );
}
