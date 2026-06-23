"use client";

import { motion } from "framer-motion";
import { ArrowDown, Satellite, Database, Cpu, BarChart3 } from "lucide-react";
import { FUSION_PIPELINE } from "@/lib/ai-data";

const stageIcons = [Satellite, Database, Cpu, BarChart3];
const statusColor = { streaming: "bg-status-info", processing: "bg-status-warning", complete: "bg-primary" };

export function FusionEngine() {
  return (
    <motion.div className="glass-panel rounded-lg p-5"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
      <h3 className="font-label-caps text-primary text-[11px] mb-5 flex items-center gap-2">
        <Cpu className="h-4 w-4" /> DATA FUSION ENGINE
      </h3>

      <div className="flex flex-col lg:flex-row items-stretch gap-3">
        {FUSION_PIPELINE.map((stage, si) => {
          const Icon = stageIcons[si];
          return (
            <div key={stage.id} className="flex flex-col lg:flex-row items-center gap-3 flex-1">
              <motion.div
                className="flex-1 w-full rounded-lg border border-border-glow bg-surface-container-low p-4"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: si * 0.15 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-4 w-4 text-primary/60" />
                  <span className="font-label-caps text-[9px] text-primary">{stage.label}</span>
                  <motion.span className={`ml-auto h-1.5 w-1.5 rounded-full ${statusColor[stage.status]}`}
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: si * 0.3 }} />
                </div>
                <div className="space-y-1.5">
                  {stage.items.map((item, ii) => (
                    <motion.div key={item}
                      className="flex items-center gap-2 rounded bg-surface-container-lowest/50 px-2.5 py-1.5 border border-border-glow/30"
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: si * 0.15 + ii * 0.05 }}>
                      <motion.div className={`h-1.5 w-1.5 rounded-full ${statusColor[stage.status]}`}
                        animate={{ opacity: stage.status === "streaming" ? [1, 0.3, 1] : 1 }}
                        transition={{ duration: 1, repeat: Infinity, delay: ii * 0.2 }} />
                      <span className="text-[10px] text-on-surface-variant" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Arrow connector */}
              {si < FUSION_PIPELINE.length - 1 && (
                <motion.div className="flex items-center justify-center lg:rotate-0 rotate-90"
                  animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowDown className="h-5 w-5 text-primary/30 lg:rotate-[-90deg]" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
