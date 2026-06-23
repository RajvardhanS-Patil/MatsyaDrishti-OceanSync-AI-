"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Radar,
  Route,
  Waves,
  Bell,
  Ship,
  BrainCircuit,
  Plus,
  HelpCircle,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { FISHING_ZONES, type FishingZone } from "@/lib/fisherman-data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Radar,
  Route,
  Waves,
  Bell,
  Ship,
};

interface SidebarNavItem {
  label: string;
  icon: string;
  id: string;
}

const NAV_ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", icon: "LayoutDashboard", id: "dashboard" },
  { label: "Fish Radar", icon: "Radar", id: "radar" },
  { label: "Route Optimizer", icon: "Route", id: "route" },
  { label: "Ocean Conditions", icon: "Waves", id: "conditions" },
  { label: "Alerts", icon: "Bell", id: "alerts" },
  { label: "Vessel Profile", icon: "Ship", id: "vessel" },
];

function ZoneCard({ zone, index }: { zone: FishingZone; index: number }) {
  const colorMap = {
    primary: { text: "text-primary", bg: "from-primary/40", match: "text-status-info" },
    secondary: { text: "text-secondary", bg: "from-secondary/40", match: "text-status-warning" },
    tertiary: { text: "text-tertiary", bg: "from-tertiary/40", match: "text-tertiary" },
  };
  const colors = colorMap[zone.color];

  return (
    <motion.div
      variants={staggerItem}
      className="p-4 bg-surface-container-low rounded-xl border border-border-glow hover:border-primary/50 transition-all cursor-pointer group"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`font-label-caps ${colors.text}`}>{zone.name}</span>
        <span
          className={`${colors.match} text-xs font-medium`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {zone.matchPercent}% Match
        </span>
      </div>
      <div
        className={`${colors.text} mb-1 font-bold`}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(28px, 4vw, 48px)",
          lineHeight: 1.2,
        }}
      >
        {zone.catchPotential}
      </div>
      {/* Animated fill bar */}
      <div className="h-8 w-full bg-surface-container-highest/30 rounded flex items-end overflow-hidden mb-2">
        <motion.div
          className={`w-full bg-gradient-to-t ${colors.bg} to-transparent`}
          initial={{ height: "0%" }}
          whileInView={{ height: `${zone.matchPercent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
        />
      </div>
      <p className="text-on-surface-variant text-xs">{zone.description}</p>
    </motion.div>
  );
}

export function FishermanSidebar() {
  const [activeItem, setActiveItem] = useState("radar");

  return (
    <aside className="fixed left-0 top-16 bottom-0 z-40 flex flex-col bg-surface-glass backdrop-blur-xl border-r border-border-glow w-[280px] overflow-hidden">
      {/* Brand Header */}
      <div className="p-5 border-b border-border-glow/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <BrainCircuit className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2
              className="text-primary font-semibold leading-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              OceanSync AI
            </h2>
            <p className="font-label-caps text-on-surface-variant/70 text-[10px]">
              Active Monitoring
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = activeItem === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 font-label-caps transition-all ${
                  isActive
                    ? "bg-primary-container/20 text-primary border-r-2 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-highest"
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                <span className="text-xs tracking-wider">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Predictive Radar Section */}
        <div className="mt-8 px-5">
          <h3 className="font-label-caps text-on-surface-variant/50 text-[10px] mb-4 tracking-widest">
            PREDICTIVE RADAR
          </h3>
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {FISHING_ZONES.map((zone, i) => (
              <ZoneCard key={zone.id} zone={zone} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-border-glow/50 bg-surface-container-lowest/50 p-4">
        <motion.button
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-label-caps text-on-primary text-xs tracking-wider"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-4 w-4" />
          New Mission
        </motion.button>
        <div className="mt-3 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 py-2 font-label-caps text-[10px] text-on-surface-variant hover:text-primary transition-colors">
            <HelpCircle className="h-3.5 w-3.5" />
            Support
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 py-2 font-label-caps text-[10px] text-on-surface-variant hover:text-primary transition-colors">
            <Terminal className="h-3.5 w-3.5" />
            Logs
          </button>
        </div>
      </div>
    </aside>
  );
}
