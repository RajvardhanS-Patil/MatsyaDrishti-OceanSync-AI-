"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
  hoverScale?: boolean;
  borderAccent?: "left" | "top" | "right" | "bottom" | "none";
  dense?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hoverGlow = true,
  hoverScale = false,
  borderAccent = "none",
  dense = false,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!hoverGlow || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const borderClasses: Record<string, string> = {
    left: "border-l-2 border-l-primary",
    top: "border-t-2 border-t-primary",
    right: "border-r-2 border-r-primary",
    bottom: "border-b-2 border-b-primary",
    none: "",
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl ${
        dense ? "glass-panel-dense" : "glass-panel"
      } ${borderClasses[borderAccent]} ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={hoverScale ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Mouse-tracking glow */}
      {hoverGlow && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(166, 207, 190, 0.1) 0%, transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
