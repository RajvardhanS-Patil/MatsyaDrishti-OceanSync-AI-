"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { Globe } from "lucide-react";

export default function DigitalTwinPage() {
  return (
    <PageLayout>
      <ComingSoon
        title="Coastal Ecosystem Digital Twin"
        description="The visual centerpiece — an interactive 4D Digital Twin powered by Mapbox GL, fusing INCOIS telemetry with eDNA analytics for real-time coastal ecosystem visualization."
        icon={<Globe className="h-10 w-10 text-primary" />}
      />
    </PageLayout>
  );
}
