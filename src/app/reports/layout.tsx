import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Intelligence Center | MatsyaDrishti",
  description:
    "Aggregated decision intelligence from all MatsyaDrishti modules — executive briefings, report generation, conservation impact analysis, strategic recommendations, and mission timeline.",
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
