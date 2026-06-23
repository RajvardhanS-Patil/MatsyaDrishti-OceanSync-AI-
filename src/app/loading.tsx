"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-surface to-surface"></div>
        {/* Animated radar grid */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(166,207,190,1)_1px,transparent_1px),linear-gradient(90deg,rgba(166,207,190,1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Core Pulsing Logo */}
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div 
            className="absolute inset-4 rounded-full border border-primary/40"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
          />
          
          <div className="relative w-16 h-16 bg-surface-container rounded-full flex items-center justify-center border border-primary/30 shadow-[0_0_30px_rgba(166,207,190,0.2)]">
            <BrainCircuit className="h-8 w-8 text-primary animate-pulse-slow" />
          </div>
        </div>

        {/* Branding */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-bold text-on-surface tracking-wide mb-2" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
            Matsya<span className="text-primary">Drishti</span>
          </h2>
          <div className="h-1 w-24 bg-surface-container-highest rounded-full mx-auto overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
          <span className="block mt-4 text-[10px] text-primary/70 font-label-caps tracking-[0.2em] animate-pulse">
            INITIALIZING INTELLIGENCE
          </span>
        </motion.div>
      </div>
    </div>
  );
}
