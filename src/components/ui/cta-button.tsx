"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "default" | "large";
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function CTAButton({
  children,
  variant = "primary",
  size = "default",
  className = "",
  href,
  onClick,
}: CTAButtonProps) {
  const sizeClasses =
    size === "large" ? "px-10 py-5 text-xl" : "px-8 py-4 text-lg";

  const variantClasses =
    variant === "primary"
      ? "bg-primary text-on-primary font-bold hover:shadow-[0_0_25px_rgba(166,207,190,0.4)] border border-transparent"
      : "glass-panel text-on-surface font-bold border border-border-glow hover:bg-primary/10";

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition-all ${sizeClasses} ${variantClasses} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Component>
  );
}
