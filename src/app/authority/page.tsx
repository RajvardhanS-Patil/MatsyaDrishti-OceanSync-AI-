"use client";

import { Navbar } from "@/components/layout/navbar";
import {
  CommandHeader,
  LeftIntelPanel,
  CenterEcosystem,
  RightDecisionPanel,
  BottomTelemetry,
} from "@/components/authority";

export default function AuthorityPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Dashboard — below navbar */}
      <div className="flex flex-1 flex-col pt-16 px-4 pb-3 gap-3 overflow-hidden">
        {/* Command Header KPI Strip */}
        <CommandHeader />

        {/* Three-Column Layout */}
        <div className="flex flex-1 gap-3 min-h-0">
          {/* Left Intelligence Panel */}
          <div className="w-[280px] shrink-0 min-h-0">
            <LeftIntelPanel />
          </div>

          {/* Center Ecosystem Viewport */}
          <div className="flex-1 min-h-0 min-w-0">
            <CenterEcosystem />
          </div>

          {/* Right Decision Support */}
          <div className="w-[260px] shrink-0 min-h-0">
            <RightDecisionPanel />
          </div>
        </div>

        {/* Bottom Telemetry Feed */}
        <div className="h-[200px] shrink-0">
          <BottomTelemetry />
        </div>
      </div>
    </div>
  );
}
