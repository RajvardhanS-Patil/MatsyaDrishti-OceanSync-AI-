import { ComingSoon } from "@/components/ui/coming-soon";
import { BrainCircuit } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Center | MatsyaDrishti",
  description:
    "AI fusion center for marine intelligence — predictive analytics, threat detection, and ecosystem health forecasting.",
};

export default function AICenterPage() {
  return (
    <ComingSoon
      title="AI Fusion Center"
      description="The neural core of MatsyaDrishti. Explore the Matsya Engine's predictive models, threat detection algorithms, and ecosystem health forecasting powered by real-time data fusion."
      icon={<BrainCircuit className="h-10 w-10 text-primary" />}
    />
  );
}
