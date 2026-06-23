"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { BrainCircuit } from "lucide-react";

export default function AICenterPage() {
  return (
    <PageLayout>
      <ComingSoon
        title="AI Fusion Center"
        description="The neural core of MatsyaDrishti. Explore the Matsya Engine's predictive models, threat detection algorithms, and ecosystem health forecasting powered by real-time data fusion."
        icon={<BrainCircuit className="h-10 w-10 text-primary" />}
      />
    </PageLayout>
  );
}
