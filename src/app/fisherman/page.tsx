import { ComingSoon } from "@/components/ui/coming-soon";
import { Ship } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fisherman Portal | MatsyaDrishti",
  description:
    "AI-powered fishing intelligence — sustainable fishing zones, catch predictions, and route optimization for fishing communities.",
};

export default function FishermanPage() {
  return (
    <ComingSoon
      title="Fisherman Portal"
      description="Your AI-powered fishing intelligence hub. Get real-time sustainable zone predictions, catch forecasts, route optimization, and weather alerts — all tailored for fishing communities."
      icon={<Ship className="h-10 w-10 text-primary" />}
    />
  );
}
