"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, SlidersHorizontal, HeartPulse, Dna, Waves, Ship, AlertTriangle, Shield, type LucideIcon } from "lucide-react";
import { type TwinLayer } from "@/app/digital-twin/page";

const iconMap: Record<string, LucideIcon> = { HeartPulse, Dna, Waves, Ship, AlertTriangle, Shield };

export function LayerPanel({ layers, onToggle }: { layers: TwinLayer[]; onToggle: (id: string) => void }) {
  return (
    <motion.div
      className="glass-panel rounded-xl p-4"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-label-caps text-primary text-[11px]">ECOSYSTEM LAYERS</h3>
        <SlidersHorizontal className="h-4 w-4 text-on-surface-variant/50" />
      </div>
      <div className="space-y-1.5">
        {layers.map((layer, i) => {
          const Icon = iconMap[layer.icon] || HeartPulse;
          return (
            <motion.button
              key={layer.id}
              onClick={() => onToggle(layer.id)}
              className={`flex w-full items-center justify-between rounded p-2 border transition-all ${
                layer.enabled
                  ? "bg-surface-container-low border-primary/30"
                  : "bg-surface-container-low/50 border-border-glow/30 opacity-60"
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 2 }}
            >
              <div className="flex items-center gap-2.5">
                <motion.div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: layer.color }}
                  animate={layer.enabled ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[12px] text-on-surface">{layer.label}</span>
              </div>
              {layer.enabled ? (
                <Eye className="h-4 w-4 text-primary" />
              ) : (
                <EyeOff className="h-4 w-4 text-on-surface-variant/40" />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
