import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authority Command Center | MatsyaDrishti",
  description:
    "Government-grade marine ecosystem command center for fisheries departments, conservation authorities, and ocean monitoring agencies. Real-time biodiversity intelligence and zone management.",
};

export default function AuthorityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
