"use client";

import { motion } from "framer-motion";
import { Brain, HeartPulse, Target, Radio, Zap, ShieldCheck, type LucideIcon } from "lucide-react";
import { AI_KPIS } from "@/lib/ai-data";

const iconMap: Record<string, LucideIcon> = { Brain, HeartPulse, Target, Radio, Zap, ShieldCheck };

export function AIOverview() {
  return (
    <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {AI_KPIS.map((kpi, i) => {
        const Icon = iconMap[kpi.icon] || Brain;
        return (
          <motion.div key={kpi.label} className="glass-panel rounded-lg p-4 group"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.03, y: -2 }}>
            <div className="flex items-center justify-between mb-2">
              <Icon className="h-4 w-4" style={{ color: kpi.color }} />
              {kpi.label === "AI Status" && (
                <motion.span className="h-2 w-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              )}
            </div>
            <span className="font-label-caps text-[9px] text-on-surface-variant block mb-1">{kpi.label}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: kpi.color }}>
                {kpi.value}
              </span>
              {kpi.unit && <span className="text-[10px] text-on-surface-variant">{kpi.unit}</span>}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
