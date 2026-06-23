"use client";

import { type ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { FloatingParticles } from "@/components/animations";
import { OceanBackground } from "@/components/ui/ocean-background";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <OceanBackground />
      <FloatingParticles count={40} />
      <Navbar />
      <main className="relative z-10 pt-16 min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
    </>
  );
}
