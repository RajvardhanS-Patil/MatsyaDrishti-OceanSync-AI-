"use client";

import { motion } from "framer-motion";

export function SensorStatusBar({ streams }: { streams: any }) {
  const streamList = [
    { key: "marineHealth", label: "Marine Health" },
    { key: "biodiversity", label: "Biodiversity" },
    { key: "oceanConditions", label: "Ocean Conditions" },
    { key: "vessels", label: "Vessels" },
    { key: "alerts", label: "Alerts" },
    { key: "aiPredictions", label: "AI Engine" }
  ];

  const getStatusColor = (stream: any) => {
    if (stream.loading) return "bg-status-warning"; // Degraded/Loading
    if (stream.data) return "bg-status-info"; // Live
    return "bg-status-critical"; // Offline
  };

  const getStatusText = (stream: any) => {
    if (stream.loading) return "DEGRADED";
    if (stream.data) return "LIVE";
    return "OFFLINE";
  };

  const activeCount = streamList.filter(s => streams[s.key]?.data).length;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 glass-panel border-t border-border-glow h-10 flex items-center justify-between px-6">
      <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
        
        {streamList.map(s => {
          const stream = streams[s.key];
          const colorClass = getStatusColor(stream);
          const isLive = stream && !stream.loading && stream.data;
          return (
            <div key={s.key} className="flex items-center gap-2">
              <motion.div className={`h-2 w-2 rounded-full ${colorClass}`}
                animate={isLive ? { opacity: [1, 0.3, 1] } : { opacity: 1 }} 
                transition={isLive ? { duration: 1.5, repeat: Infinity } : {}} />
              <span className="text-[10px] text-on-surface-variant font-mono">
                {s.label.toUpperCase()}: <span className={
                  getStatusText(stream) === "LIVE" ? "text-primary" : 
                  getStatusText(stream) === "DEGRADED" ? "text-status-warning" : "text-status-critical"
                }>{getStatusText(stream)}</span>
              </span>
            </div>
          );
        })}

        <span className="text-[11px] text-on-surface-variant/50 border-l border-border-glow pl-6 hidden lg:block font-mono">
          {activeCount}/{streamList.length} STREAMS ONLINE
        </span>
      </div>
      <div className="flex items-center gap-4 ml-4">
        <span className="font-label-caps text-[10px] text-primary whitespace-nowrap">V 4.2.1-LIVE</span>
      </div>
    </div>
  );
}
