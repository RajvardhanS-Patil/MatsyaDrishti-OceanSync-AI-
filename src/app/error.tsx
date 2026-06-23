"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("MatsyaDrishti Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-status-critical/10 via-surface to-surface"></div>
        </div>

        <motion.div 
          className="glass-panel-dense rounded-xl p-8 max-w-md w-full text-center border-status-critical/30 relative z-20"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          <div className="w-16 h-16 rounded-full bg-status-critical/10 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-status-critical" />
          </div>
          
          <h1 className="text-2xl font-bold text-on-surface mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            System Intelligence Error
          </h1>
          
          <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
            The Matsya Engine encountered an unexpected anomaly while processing the ecosystem data stream.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-status-critical/20 text-status-critical hover:bg-status-critical/30 transition-colors font-label-caps text-xs border border-status-critical/30"
            >
              <RefreshCw className="h-4 w-4" />
              Reboot Subsystem
            </button>
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-label-caps text-xs border border-outline-variant/30"
            >
              <Home className="h-4 w-4" />
              Return to Command Center
            </Link>
          </div>
          
          <div className="mt-8 pt-4 border-t border-outline-variant/30 text-left">
            <span className="text-[10px] text-on-surface-variant/50 font-mono block">ERROR_DIGEST: {error.digest || "UNKNOWN_ANOMALY"}</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
