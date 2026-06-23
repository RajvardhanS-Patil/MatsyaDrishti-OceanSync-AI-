import { ComingSoon } from "@/components/ui/coming-soon";
import { FileBarChart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports & Analytics | MatsyaDrishti",
  description:
    "Marine intelligence reports and analytics — biodiversity assessments, catch logs, compliance reports, and trend analysis.",
};

export default function ReportsPage() {
  return (
    <ComingSoon
      title="Reports & Analytics"
      description="Comprehensive marine intelligence reporting. Generate biodiversity assessments, catch sustainability logs, compliance audit reports, and long-term trend analysis with export capabilities."
      icon={<FileBarChart className="h-10 w-10 text-primary" />}
    />
  );
}
