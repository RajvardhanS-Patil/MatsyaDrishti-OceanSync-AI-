import Link from "next/link";
import { Compass, Home, Map } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-surface to-surface"></div>
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>

        <div className="glass-panel-dense rounded-xl p-10 max-w-lg w-full text-center border-primary/20 relative z-20">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 border border-primary/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-full">
              <Compass className="h-10 w-10 text-primary animate-pulse-slow" />
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent to-primary/50 flex-1"></div>
            <span className="font-mono text-primary text-xl tracking-widest font-bold">404</span>
            <div className="h-px bg-gradient-to-l from-transparent to-primary/50 flex-1"></div>
          </div>
          
          <h1 className="text-2xl font-bold text-on-surface mb-3" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Uncharted Waters
          </h1>
          
          <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
            The requested sector is outside our current mapping parameters. The digital twin has no telemetry for this location.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-caps text-xs shadow-lg shadow-primary/20"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
            <Link 
              href="/digital-twin"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-label-caps text-xs border border-outline-variant/30"
            >
              <Map className="h-4 w-4 text-primary" />
              Open Digital Twin
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
