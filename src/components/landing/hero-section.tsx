"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { staggerContainer, staggerItem, floating } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Hero gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-[1]" />

      {/* Radial glow behind headline */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[100px] z-0" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div
          variants={staggerItem}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="text-primary uppercase text-xs font-medium tracking-wider"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            OceanSync AI • Active Node 07
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={staggerItem}
          className="mb-6 text-white drop-shadow-2xl"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "clamp(48px, 8vw, 84px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Command the{" "}
          <motion.span
            className="text-primary italic"
            animate={{
              textShadow: [
                "0 0 20px rgba(166, 207, 190, 0)",
                "0 0 40px rgba(166, 207, 190, 0.4)",
                "0 0 20px rgba(166, 207, 190, 0)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Deep
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={staggerItem}
          className="mx-auto mb-10 max-w-2xl text-on-surface-variant"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "18px",
            lineHeight: "28px",
          }}
        >
          Advanced Digital Twin technology for marine ecosystems. Real-time
          intelligence fused from INCOIS telemetry and eDNA sensors.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col gap-4 justify-center md:flex-row"
        >
          <CTAButton variant="primary" href="/digital-twin">
            Initiate Deployment
          </CTAButton>
          <CTAButton variant="ghost">Watch Technical Demo</CTAButton>
        </motion.div>
      </motion.div>

      {/* Dashboard Preview Panel */}
      <motion.div
        className="absolute -bottom-24 left-1/2 z-10 w-[90%] max-w-6xl -translate-x-1/2"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 0.4 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <div
          className="glass-panel rounded-xl p-2 shadow-2xl"
          style={{
            transform: "perspective(1000px) rotateX(8deg)",
          }}
        >
          <div className="flex h-56 items-center justify-center rounded-lg border border-border-glow bg-surface overflow-hidden relative">
            {/* Simulated radar sweep */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full border border-primary/10" />
                <div className="absolute inset-4 rounded-full border border-primary/10" />
                <div className="absolute inset-8 rounded-full border border-primary/10" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(166, 207, 190, 0.15) 30deg, transparent 60deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </div>
            <span
              className="relative z-10 text-primary/20 text-sm"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              GIS DATA VIEWPORT [INITIALIZING]
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
