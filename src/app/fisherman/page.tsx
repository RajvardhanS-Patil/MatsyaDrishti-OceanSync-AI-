"use client";

import {
  FishermanSidebar,
  OceanWorkspace,
  IntelligencePanel,
  AlertStrip,
  StatusBar,
} from "@/components/fisherman";
import { Navbar } from "@/components/layout/navbar";

export default function FishermanPage() {
  return (
    <div className="h-screen overflow-hidden bg-surface">
      {/* Reuse top navbar */}
      <Navbar />

      {/* Left Sidebar */}
      <FishermanSidebar />

      {/* Center Ocean Workspace */}
      <main className="fixed inset-0 pt-16 pl-[280px] pr-[300px] pb-10">
        <div className="relative h-full w-full">
          <OceanWorkspace />
          <AlertStrip />
        </div>
      </main>

      {/* Right Intelligence Panel */}
      <IntelligencePanel />

      {/* Bottom Status Bar */}
      <StatusBar />
    </div>
  );
}
