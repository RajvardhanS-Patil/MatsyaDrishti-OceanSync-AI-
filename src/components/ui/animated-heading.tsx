"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  delay?: number;
  glow?: boolean;
}

export function AnimatedHeading({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  glow = false,
}: AnimatedHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Tag
        className={`${glow ? "text-glow" : ""} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
