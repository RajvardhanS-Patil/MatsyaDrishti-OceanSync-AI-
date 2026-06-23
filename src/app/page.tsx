"use client";

import { PageLayout } from "@/components/layout/page-layout";
import {
  HeroSection,
  ProblemSection,
  FeaturesSection,
  ArchitectureSection,
  VisionSection,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <PageLayout>
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <ArchitectureSection />
      <VisionSection />
    </PageLayout>
  );
}
