import { ComingSoon } from "@/components/ui/coming-soon";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authority Command Center | MatsyaDrishti",
  description:
    "Marine authority command center for biodiversity monitoring, zone management, and regulatory enforcement.",
};

export default function AuthorityPage() {
  return (
    <ComingSoon
      title="Authority Command Center"
      description="Full-spectrum marine governance dashboard. Monitor biodiversity threat levels, manage dynamic fishing zones, track vessel compliance, and receive AI-powered enforcement recommendations."
      icon={<Shield className="h-10 w-10 text-primary" />}
    />
  );
}
