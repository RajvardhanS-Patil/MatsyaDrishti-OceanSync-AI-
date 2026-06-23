import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coastal Ecosystem Digital Twin | MatsyaDrishti",
  description:
    "Interactive 4D Digital Twin of the coastal ecosystem — real-time visualization of fish clusters, biodiversity zones, coral health, ocean currents, and climate impact powered by INCOIS telemetry and eDNA analytics.",
};

export default function DigitalTwinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
