"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard } from "./glass-card";

interface KPICardProps {
  value: string;
  numericValue?: number;
  label: string;
  color?: "primary" | "warning" | "critical" | "info";
  suffix?: string;
  prefix?: string;
  className?: string;
}

const colorMap = {
  primary: "text-primary",
  warning: "text-status-warning",
  critical: "text-status-critical",
  info: "text-status-info",
};

export function KPICard({
  value,
  numericValue,
  label,
  color = "primary",
  suffix = "",
  prefix = "",
  className = "",
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (numericValue === undefined) return;

    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const duration = 2000;

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * numericValue;

            if (numericValue >= 100) {
              setDisplayValue(Math.round(current).toString());
            } else {
              setDisplayValue(current.toFixed(1));
            }

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [numericValue, value]);

  return (
    <div ref={cardRef}>
      <GlassCard className={`p-6 ${className}`} hoverScale>
        <span
          className={`font-mono text-[32px] font-bold ${colorMap[color]} block mb-1`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {prefix}
          {numericValue ? displayValue : value}
          {suffix}
        </span>
        <span className="font-label-caps text-on-surface-variant">{label}</span>
      </GlassCard>
    </div>
  );
}
