"use client";

import { motion } from "framer-motion";
import { COMMAND_KPIS } from "@/lib/authority-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function AnimatedScore({ target, color }: { target: number; color: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    animated.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 2000, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);

  return (
    <span ref={ref} style={{ color }}>
      {target >= 100 ? Math.round(val).toString() : val.toFixed(1)}
    </span>
  );
}

export function CommandHeader() {
  return (
    <motion.div
      className="flex items-stretch gap-3 overflow-x-auto pb-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {COMMAND_KPIS.map((kpi, i) => {
        const TrendIcon = kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;
        const trendColor = kpi.trend === "up" ? "text-primary" : kpi.trend === "down" ? "text-status-critical" : "text-on-surface-variant/50";

        return (
          <motion.div
            key={kpi.label}
            className="flex-1 min-w-[160px] glass-panel rounded-lg p-4 group"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-caps text-on-surface-variant text-[10px]">{kpi.label}</span>
              <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} />
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <AnimatedScore target={parseFloat(kpi.value) || 0} color={kpi.color} />
              </span>
              {kpi.max && (
                <span className="text-xs text-on-surface-variant" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  / {kpi.max}
                </span>
              )}
              {!kpi.max && kpi.value === "MODERATE" && (
                <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: kpi.color }}>
                  {kpi.value}
                </span>
              )}
            </div>

            {kpi.percent > 0 && (
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: kpi.color, boxShadow: `0 0 8px ${kpi.color}60` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${kpi.percent}%` }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                />
              </div>
            )}

            <div className={`mt-1.5 text-[10px] ${trendColor}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {kpi.trendValue !== "0" ? kpi.trendValue : "—"}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
