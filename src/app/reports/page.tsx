"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { FileBarChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <PageLayout>
      <ComingSoon
        title="Reports & Analytics"
        description="Comprehensive marine intelligence reporting. Generate biodiversity assessments, catch sustainability logs, compliance audit reports, and long-term trend analysis with export capabilities."
        icon={<FileBarChart className="h-10 w-10 text-primary" />}
      />
    </PageLayout>
  );
}
