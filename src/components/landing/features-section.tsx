"use client";

import { motion } from "framer-motion";
import { Radar, Route, Dna, BarChart3 } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { ScrollReveal } from "@/components/animations";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function FeaturesSection() {
  return (
    <SectionWrapper>
      {/* Section Header */}
      <div className="mb-16">
        <AnimatedHeading as="h2" className="font-headline-lg text-white">
          Command Capability
        </AnimatedHeading>
        <ScrollReveal delay={0.1}>
          <p className="text-on-surface-variant mt-2">
            The AI-driven architecture for modern naval and ecological
            monitoring.
          </p>
        </ScrollReveal>
      </div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Predictive Radar — 2-col */}
        <motion.div variants={staggerItem} className="md:col-span-2">
          <GlassCard className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Radar className="h-5 w-5 text-primary" />
                <span className="font-label-caps text-primary">
                  Predictive Radar
                </span>
              </div>
              <h3 className="font-headline-md text-white mb-2">
                Pre-emptive Threat Detection
              </h3>
              <p className="text-on-surface-variant max-w-md">
                Utilizes machine learning to forecast vessel trajectory
                anomalies and weather disruptions 48 hours before they manifest.
              </p>
            </div>
            {/* Radar visualization */}
            <div className="mt-8 flex h-48 items-center justify-center overflow-hidden rounded-lg border border-border-glow bg-surface-container relative">
              <div className="relative h-36 w-36">
                <div className="absolute inset-0 rounded-full border border-primary/15" />
                <div className="absolute inset-3 rounded-full border border-primary/15" />
                <div className="absolute inset-6 rounded-full border border-primary/15" />
                <div className="absolute inset-9 rounded-full border border-primary/15" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(166, 207, 190, 0.2) 40deg, transparent 80deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Blips */}
                <motion.div
                  className="absolute top-4 right-8 h-1.5 w-1.5 rounded-full bg-primary"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-6 left-5 h-1.5 w-1.5 rounded-full bg-status-warning"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
                <motion.div
                  className="absolute top-12 left-10 h-1 w-1 rounded-full bg-primary"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Sustainable Routes */}
        <motion.div variants={staggerItem}>
          <GlassCard className="flex h-full flex-col p-8">
            <Route className="mb-4 h-5 w-5 text-primary" />
            <h3 className="font-headline-md text-white mb-2">
              Sustainable Routes
            </h3>
            <p className="text-on-surface-variant mb-6">
              AI-optimized shipping lanes that minimize carbon footprint while
              avoiding sensitive marine habitats.
            </p>
            <div className="mt-auto overflow-hidden rounded-lg glass-panel p-4 border border-border-glow">
              <div className="flex h-28 items-end gap-1.5 justify-center">
                {[40, 60, 50, 80, 30, 70, 45, 90, 55, 65].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-2 rounded-sm bg-primary"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* eDNA Fusion */}
        <motion.div variants={staggerItem}>
          <GlassCard className="p-8">
            <Dna className="mb-4 h-5 w-5 text-primary" />
            <h3 className="font-headline-md text-white mb-2">eDNA Fusion</h3>
            <p className="text-on-surface-variant">
              Real-time biological sampling data processed at the edge to
              identify shifts in biodiversity.
            </p>
            {/* DNA visualization */}
            <div className="mt-6 flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="h-16 w-1 rounded-full bg-primary/30"
                  animate={{
                    scaleY: [1, 1.5, 0.7, 1.2, 1],
                    backgroundColor: [
                      "rgba(166, 207, 190, 0.3)",
                      "rgba(166, 207, 190, 0.6)",
                      "rgba(166, 207, 190, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Ecosystem Monitoring — 2-col */}
        <motion.div variants={staggerItem} className="md:col-span-2">
          <GlassCard className="flex flex-col items-center gap-8 p-8 md:flex-row">
            <div className="flex-1">
              <BarChart3 className="mb-4 h-5 w-5 text-primary" />
              <h3 className="font-headline-md text-white mb-2">
                Ecosystem Monitoring
              </h3>
              <p className="text-on-surface-variant">
                Continuous health metrics of the Digital Twin, providing
                actionable insights for conservation and regulatory compliance.
              </p>
            </div>
            {/* Fidelity Ring */}
            <div className="relative flex h-48 w-48 shrink-0 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="rgba(166, 207, 190, 0.15)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#a6cfbe"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                  whileInView={{
                    strokeDashoffset: 2 * Math.PI * 44 * (1 - 0.998),
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
              {/* Spinning accent */}
              <motion.div
                className="absolute inset-0 rounded-full border-t-2 border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="text-center">
                <span
                  className="text-2xl text-white font-bold"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  99.8%
                </span>
                <span className="font-label-caps block text-on-surface-variant mt-1">
                  Fidelity
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
