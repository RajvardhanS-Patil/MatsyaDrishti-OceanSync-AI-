"use client";

import { motion } from "framer-motion";
import { Anchor, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function ComingSoon({
  title,
  description = "This module is currently under development. Our team is working to bring you cutting-edge ocean intelligence capabilities.",
  icon,
}: ComingSoonProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      {/* Sonar ping effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-32 w-32 rounded-full border border-primary/20 animate-sonar" />
        <div
          className="absolute inset-0 h-32 w-32 rounded-full border border-primary/10 animate-sonar"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute inset-0 h-32 w-32 rounded-full border border-primary/5 animate-sonar"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Icon */}
        <motion.div
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full glass-panel"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon || <Anchor className="h-10 w-10 text-primary" />}
        </motion.div>

        {/* Status badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-status-warning animate-pulse" />
          <span className="font-label-caps text-status-warning">
            Under Development
          </span>
        </div>

        {/* Title */}
        <h1 className="font-headline-lg text-white mb-4 text-glow">{title}</h1>

        {/* Description */}
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          {description}
        </p>

        {/* Animated progress bar */}
        <div className="mx-auto mb-8 w-64 overflow-hidden rounded-full bg-surface-container-highest">
          <motion.div
            className="h-1.5 rounded-full bg-gradient-to-r from-primary/60 to-primary"
            initial={{ width: "0%" }}
            animate={{ width: "35%" }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
        </div>

        {/* Back button */}
        <Link href="/">
          <motion.span
            className="inline-flex items-center gap-2 rounded-lg border border-border-glow px-6 py-3 text-on-surface transition-all hover:bg-primary/10 hover:text-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Command Center
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
