"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { Shield } from "lucide-react";

export default function AuthorityPage() {
  return (
    <PageLayout>
      <ComingSoon
        title="Authority Command Center"
        description="Full-spectrum marine governance dashboard. Monitor biodiversity threat levels, manage dynamic fishing zones, track vessel compliance, and receive AI-powered enforcement recommendations."
        icon={<Shield className="h-10 w-10 text-primary" />}
      />
    </PageLayout>
  );
}
