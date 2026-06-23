"use client";

import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-outline-variant bg-surface-container-lowest">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:px-6">
        {/* Branding */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-label-caps text-on-surface-variant">
            {SITE_CONFIG.name} HQ
          </span>
          <p
            className="text-secondary text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2024 {SITE_CONFIG.name}. Government-Grade Marine Intelligence.
          </p>
        </div>

        {/* Status links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <span
            className="text-on-surface-variant text-xs hover:text-primary transition-colors cursor-pointer"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse" />
            System Status: {SITE_CONFIG.uptime} Uptime
          </span>
          <span
            className="text-on-surface-variant text-xs hover:text-primary transition-colors cursor-pointer"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Security Protocol {SITE_CONFIG.version}
          </span>
          <span
            className="text-on-surface-variant text-xs hover:text-primary transition-colors cursor-pointer"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Terms of Engagement
          </span>
        </div>
      </div>
    </footer>
  );
}
