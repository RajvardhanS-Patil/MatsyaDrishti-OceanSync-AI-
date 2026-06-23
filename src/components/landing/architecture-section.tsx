"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { ScrollReveal } from "@/components/animations";
import { Cable } from "lucide-react";

export function ArchitectureSection() {
  return (
    <SectionWrapper dark>
      {/* Header */}
      <div className="mx-auto max-w-5xl text-center mb-20">
        <AnimatedHeading as="h2" className="font-headline-lg text-white mb-4">
          Fusion Layer Architecture
        </AnimatedHeading>
        <ScrollReveal delay={0.1}>
          <p className="text-on-surface-variant">
            The synergy between Indian National Centre for Ocean Information
            Services (INCOIS) and on-site molecular diagnostics.
          </p>
        </ScrollReveal>
      </div>

      {/* Architecture Flow */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row md:gap-12">
        {/* Left - Data Sources */}
        <ScrollReveal direction="left" className="flex-1 space-y-6 w-full">
          <GlassCard className="p-6" borderAccent="left">
            <h4
              className="text-primary mb-1 font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              INCOIS STREAM
            </h4>
            <p className="text-sm text-on-surface-variant">
              Global satellite telemetry, tidal gauges, and deep-sea pressure
              sensors.
            </p>
            {/* Live indicator */}
            <div className="mt-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-caps text-primary/60 text-[10px]">
                STREAMING
              </span>
            </div>
          </GlassCard>
          <GlassCard className="p-6" borderAccent="left">
            <h4
              className="text-primary mb-1 font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              eDNA ANALYTICS
            </h4>
            <p className="text-sm text-on-surface-variant">
              Metagenomic sequencing from automated underwater vehicles (AUVs).
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-status-info animate-pulse" />
              <span className="font-label-caps text-status-info/60 text-[10px]">
                PROCESSING
              </span>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Center - Connector */}
        <ScrollReveal direction="scale" className="flex items-center justify-center">
          <motion.div
            className="flex h-28 w-28 items-center justify-center rounded-full glass-panel border border-primary/20"
            animate={{
              boxShadow: [
                "0 0 0px rgba(166, 207, 190, 0)",
                "0 0 30px rgba(166, 207, 190, 0.2)",
                "0 0 0px rgba(166, 207, 190, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cable className="h-10 w-10 text-primary" />
          </motion.div>
          {/* Animated connection lines */}
          <div className="hidden md:block absolute left-[calc(33%-30px)] right-[calc(33%-30px)] top-1/2 -translate-y-1/2 h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </ScrollReveal>

        {/* Right - Output */}
        <ScrollReveal direction="right" className="flex-1 w-full">
          <GlassCard className="p-8 bg-primary/5 border-primary/30 text-center">
            <h4
              className="text-white mb-2 text-xl font-bold"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Matsya Engine
            </h4>
            <p className="text-on-surface-variant text-sm mb-4">
              Proprietary Neural Mesh that synthesizes disparate data into a
              unified 4D Digital Twin.
            </p>
            {/* Animated progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                initial={{ width: "0%" }}
                whileInView={{ width: "75%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs">
              <span className="font-label-caps text-on-surface-variant">
                Synthesis
              </span>
              <span
                className="text-primary"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                75%
              </span>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
