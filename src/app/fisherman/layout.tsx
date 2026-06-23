import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fisherman Intelligence Portal | MatsyaDrishti",
  description:
    "AI-powered fishing intelligence — sustainable fishing zones, catch predictions, species analysis, route optimization, and ocean conditions for commercial fishermen.",
};

export default function FishermanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override the root layout's PageLayout wrapper for this dashboard route
  // The fisherman page manages its own layout (fixed panels)
  return <>{children}</>;
}
