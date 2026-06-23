"use client";

import { Navbar } from "@/components/layout/navbar";
import { AIOverview, FusionEngine, AIBody } from "@/components/ai-center";
import { FloatingParticles } from "@/components/animations/floating-particles";

export default function AICenterPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <FloatingParticles />

      <main className="relative z-10 pt-20 px-4 pb-8 max-w-[1600px] mx-auto space-y-5">
        {/* Page Title */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Matsya Engine — AI Intelligence Center
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Central nervous system of MatsyaDrishti. Real-time data fusion, model inference, and ecosystem predictions.
          </p>
        </div>

        {/* AI Overview KPIs */}
        <AIOverview />

        {/* Data Fusion Pipeline */}
        <FusionEngine />

        {/* Main Body — 3 columns */}
        <AIBody />
      </main>
    </div>
  );
}
