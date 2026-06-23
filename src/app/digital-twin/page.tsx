import { ComingSoon } from "@/components/ui/coming-soon";
import { Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coastal Ecosystem Digital Twin | MatsyaDrishti",
  description:
    "Interactive 4D Digital Twin of the coastal ecosystem with real-time GIS visualization, biodiversity mapping, and ocean health monitoring.",
};

export default function DigitalTwinPage() {
  return (
    <ComingSoon
      title="Coastal Ecosystem Digital Twin"
      description="The visual centerpiece — an interactive 4D Digital Twin powered by Mapbox GL, fusing INCOIS telemetry with eDNA analytics for real-time coastal ecosystem visualization."
      icon={<Globe className="h-10 w-10 text-primary" />}
    />
  );
}
