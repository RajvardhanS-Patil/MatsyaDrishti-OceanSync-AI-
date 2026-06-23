"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { FloatingParticles } from "@/components/animations/floating-particles";
import {
  Heart, TreePine, CloudLightning, Fish, Shield, Brain, FileText, Download,
  AlertTriangle, Lightbulb, Target, Compass, Clock, CheckCircle2, ArrowUpRight,
  ArrowDownRight, Minus as MinusIcon, FileSpreadsheet, FileJson, Play, ChevronRight, type LucideIcon
} from "lucide-react";
import {
  EXEC_KPIS, BRIEFINGS, REPORT_TYPES, MARINE_HEALTH_TREND, FISH_POP_TREND,
  BIO_TREND, CONSERVATION_METRICS, COMPLIANCE_DATA, STRATEGIC_RECS,
  TIMELINE_EVENTS
} from "@/lib/reports-data";

const statusColor: Record<string, string> = { healthy: "text-primary", safe: "text-primary", warning: "text-status-warning", critical: "text-status-critical" };
const statusBg: Record<string, string> = { healthy: "border-primary/20", safe: "border-primary/20", warning: "border-status-warning/20", critical: "border-status-critical/20" };
const kpiIcons: LucideIcon[] = [Heart, TreePine, CloudLightning, Fish, Shield, Brain];
const briefIcons = { status: CheckCircle2, risk: AlertTriangle, opportunity: Lightbulb, action: Target };
const briefColors = { status: "border-primary/20 bg-primary/5", risk: "border-status-critical/20 bg-status-critical/5", opportunity: "border-status-warning/20 bg-status-warning/5", action: "border-status-info/20 bg-status-info/5" };
const briefTextColors = { status: "text-primary", risk: "text-status-critical", opportunity: "text-status-warning", action: "text-status-info" };
const eventColors = { alert: "border-status-critical bg-status-critical/10", climate: "border-status-warning bg-status-warning/10", policy: "border-status-info bg-status-info/10", recovery: "border-primary bg-primary/10", success: "border-primary bg-primary/10" };

/* ── Animated Sparkline ──────────────────────────────── */
function Sparkline({ data, color, label }: { data: { month: string; value: number }[]; color: string; label: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  return (
    <div>
      <span className="font-label-caps text-[9px] text-on-surface-variant block mb-2">{label}</span>
      <div className="h-24 flex items-end gap-0.5">
        {data.map((d, i) => {
          const h = 15 + ((d.value - min) / range) * 80;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center group">
              <span className="text-[7px] text-on-surface-variant/0 group-hover:text-on-surface-variant/80 transition-all mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {d.value}
              </span>
              <motion.div className="w-full rounded-t" style={{ backgroundColor: color }}
                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: i * 0.04 }} />
              <span className="text-[6px] text-on-surface-variant/30 mt-0.5">{d.month.slice(0, 1)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Demo Mode Overlay ───────────────────────────────── */
function DemoOverlay({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const sections = [
    { id: "exec-kpis", label: "Executive KPIs — Real-time ecosystem health metrics aggregated from all data streams" },
    { id: "exec-briefing", label: "AI-Generated Briefing — Situation awareness for decision-makers" },
    { id: "reports", label: "Report Generation Center — One-click export to PDF, CSV, and JSON" },
    { id: "trends", label: "Historical Analytics — 12-month trend analysis powered by Matsya Engine" },
    { id: "conservation", label: "Conservation Impact — Before/after effectiveness measurement" },
    { id: "strategic", label: "Strategic Recommendations — AI-driven actions for every stakeholder" },
    { id: "timeline", label: "Mission Timeline — Key events driving ecosystem management decisions" },
  ];

  useEffect(() => {
    if (!active) { setStep(0); return; }
    const el = document.getElementById(sections[step]?.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [active, step]);

  if (!active) return null;

  return (
    <motion.div className="fixed inset-0 z-[100] pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="pointer-events-auto fixed top-20 left-1/2 -translate-x-1/2 z-[101] glass-panel rounded-xl p-4 max-w-lg border border-primary/30 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Play className="h-4 w-4 text-primary" />
          <span className="font-label-caps text-primary text-[11px]">DEMO MODE — Step {step + 1}/{sections.length}</span>
        </div>
        <p className="text-[12px] text-on-surface leading-snug mb-3">{sections[step]?.label}</p>
        <div className="flex gap-2">
          {step > 0 && <button onClick={() => setStep(s => s - 1)} className="px-3 py-1 rounded glass-panel text-[10px] text-on-surface-variant hover:text-primary transition-colors">Back</button>}
          {step < sections.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} className="px-3 py-1 rounded bg-primary text-on-primary text-[10px] flex items-center gap-1">Next <ChevronRight className="h-3 w-3" /></button>
          ) : (
            <button onClick={onClose} className="px-3 py-1 rounded bg-primary text-on-primary text-[10px]">Finish</button>
          )}
          <button onClick={onClose} className="ml-auto px-3 py-1 rounded text-[10px] text-on-surface-variant hover:text-status-critical transition-colors">Exit</button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ───────────────────────────────────────── */
export default function ReportsPage() {
  const [demoActive, setDemoActive] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);

  const handleExport = (id: string, format: string) => {
    setGenerating(id);
    setTimeout(() => setGenerating(null), 2000);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <FloatingParticles />
      <DemoOverlay active={demoActive} onClose={() => setDemoActive(false)} />

      <main className="relative z-10 pt-20 px-4 pb-8 max-w-[1600px] mx-auto space-y-5">
        {/* Title + Demo Button */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Executive Intelligence Center
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">
              Aggregated decision intelligence from all MatsyaDrishti modules.
            </p>
          </div>
          <motion.button
            onClick={() => setDemoActive(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-label-caps text-[10px] shadow-lg shadow-primary/20"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Play className="h-3.5 w-3.5" /> DEMO MODE
          </motion.button>
        </div>

        {/* ── Executive KPIs ──────────────────── */}
        <motion.div id="exec-kpis" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {EXEC_KPIS.map((kpi, i) => {
            const Icon = kpiIcons[i];
            const isUp = kpi.change.includes("+");
            const TrendIcon = isUp ? ArrowUpRight : kpi.change.includes("−") ? ArrowDownRight : MinusIcon;
            return (
              <motion.div key={kpi.label} className={`glass-panel rounded-lg p-4 border ${statusBg[kpi.status]}`}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.03, y: -2 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className={`h-4 w-4 ${statusColor[kpi.status]}`} />
                  <TrendIcon className={`h-3 w-3 ${isUp ? "text-primary" : kpi.change.includes("−") ? "text-status-warning" : "text-on-surface-variant/40"}`} />
                </div>
                <span className="font-label-caps text-[9px] text-on-surface-variant block mb-0.5">{kpi.label}</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-lg font-bold ${statusColor[kpi.status]}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {kpi.value}
                  </span>
                  {kpi.unit && <span className="text-[9px] text-on-surface-variant">{kpi.unit}</span>}
                </div>
                <span className="text-[8px] text-on-surface-variant/50 mt-0.5 block">{kpi.change}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Executive Briefing ──────────────── */}
        <motion.div id="exec-briefing" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {BRIEFINGS.map((b, i) => {
            const Icon = briefIcons[b.category];
            return (
              <motion.div key={b.category} className={`glass-panel rounded-lg p-4 border ${briefColors[b.category]}`}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`h-4 w-4 ${briefTextColors[b.category]}`} />
                  <span className={`font-label-caps text-[10px] ${briefTextColors[b.category]}`}>{b.title}</span>
                </div>
                <ul className="space-y-1.5">
                  {b.items.map((item, j) => (
                    <li key={j} className="text-[10px] text-on-surface-variant leading-snug flex gap-1.5">
                      <span className="text-on-surface-variant/30 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Report Generation ───────────────── */}
        <motion.div id="reports" className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-label-caps text-primary text-[11px] flex items-center gap-2">
              <FileText className="h-4 w-4" /> REPORT GENERATION CENTER
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {REPORT_TYPES.map((r, i) => (
              <motion.div key={r.id} className="rounded-lg border border-border-glow bg-surface-container-low p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.05 }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[12px] text-on-surface font-medium block">{r.title}</span>
                    <span className="text-[9px] text-on-surface-variant">{r.description}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[8px] text-on-surface-variant/50 mb-3">
                  <Clock className="h-3 w-3" />
                  <span>Generated {r.lastGenerated}</span>
                  <span>•</span>
                  <span>{r.pages} pages</span>
                </div>
                {/* Export buttons */}
                <div className="flex gap-1.5">
                  {[
                    { fmt: "PDF", icon: Download, color: "bg-primary/10 text-primary hover:bg-primary/20" },
                    { fmt: "CSV", icon: FileSpreadsheet, color: "bg-status-info/10 text-status-info hover:bg-status-info/20" },
                    { fmt: "JSON", icon: FileJson, color: "bg-status-warning/10 text-status-warning hover:bg-status-warning/20" },
                  ].map(({ fmt, icon: FmtIcon, color }) => (
                    <motion.button key={fmt} onClick={() => handleExport(r.id, fmt)}
                      className={`flex items-center gap-1 rounded px-2.5 py-1 text-[9px] font-label-caps transition-all ${color}`}
                      whileTap={{ scale: 0.95 }}>
                      <FmtIcon className="h-3 w-3" />
                      {generating === r.id ? (
                        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                          GENERATING...
                        </motion.span>
                      ) : fmt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Historical Trends ───────────────── */}
        <motion.div id="trends" className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4">HISTORICAL ANALYTICS — 12 MONTH TREND</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Sparkline data={MARINE_HEALTH_TREND} color="rgba(166,207,190,0.7)" label="MARINE HEALTH SCORE" />
            <Sparkline data={FISH_POP_TREND} color="rgba(0,163,255,0.7)" label="FISH POPULATION INDEX" />
            <Sparkline data={BIO_TREND} color="rgba(168,206,205,0.7)" label="BIODIVERSITY INDEX" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* ── Conservation Impact ─────────────── */}
          <motion.div id="conservation" className="glass-panel rounded-lg p-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4" /> CONSERVATION IMPACT
            </h3>
            <div className="space-y-4">
              {CONSERVATION_METRICS.map((m, i) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-on-surface">{m.label}</span>
                    <span className="text-[11px] text-primary font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.improvement}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-[8px] text-on-surface-variant/50 mb-0.5">
                        <span>Before</span>
                        <span>{m.before}{m.unit}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                        <motion.div className="h-full rounded-full bg-on-surface-variant/20"
                          initial={{ width: "0%" }} animate={{ width: `${m.before}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }} />
                      </div>
                    </div>
                    <ChevronRight className="h-3 w-3 text-primary/30 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[8px] text-on-surface-variant/50 mb-0.5">
                        <span>After</span>
                        <span className="text-primary">{m.after}{m.unit}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                        <motion.div className="h-full rounded-full bg-primary"
                          initial={{ width: "0%" }} animate={{ width: `${m.after}%` }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.2 }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Compliance Audit ────────────────── */}
          <motion.div className="glass-panel rounded-lg p-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> COMPLIANCE AUDIT
            </h3>
            <div className="space-y-3">
              {COMPLIANCE_DATA.map((c, i) => (
                <div key={c.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-on-surface">{c.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-on-surface-variant">{c.value}</span>
                      <span className={`text-[11px] font-medium ${statusColor[c.severity]}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {c.score}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                    <motion.div className="h-full rounded-full"
                      style={{ backgroundColor: c.severity === "safe" ? "#a6cfbe" : c.severity === "warning" ? "#FFCE00" : "#9D0300" }}
                      initial={{ width: "0%" }} animate={{ width: `${c.score}%` }}
                      transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Strategic Recommendations ────────── */}
        <motion.div id="strategic" className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <Compass className="h-4 w-4" /> STRATEGIC RECOMMENDATIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STRATEGIC_RECS.map((rec, i) => {
              const priBorder = rec.priority === "high" ? "border-status-critical/20" : "border-status-warning/20";
              const priText = rec.priority === "high" ? "text-status-critical" : "text-status-warning";
              return (
                <motion.div key={rec.title} className={`rounded-lg border ${priBorder} bg-surface-container-low p-4`}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }} whileHover={{ scale: 1.01 }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[8px] font-label-caps px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">{rec.audience}</span>
                    <span className={`text-[8px] font-label-caps px-1.5 py-0.5 rounded ${priText} bg-surface-container-highest/50`}>{rec.priority}</span>
                  </div>
                  <span className="text-[12px] text-on-surface font-medium block mb-1">{rec.title}</span>
                  <p className="text-[10px] text-on-surface-variant leading-snug mb-2">{rec.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-[8px] pt-2 border-t border-border-glow">
                    <div>
                      <span className="text-on-surface-variant/50 block">IMPACT</span>
                      <span className="text-on-surface-variant">{rec.impact}</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant/50 block">CONFIDENCE</span>
                      <span className="text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{rec.confidence}%</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant/50 block">HORIZON</span>
                      <span className="text-on-surface-variant">{rec.timeHorizon}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Mission Timeline ────────────────── */}
        <motion.div id="timeline" className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4" /> MISSION CONTROL TIMELINE
          </h3>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border-glow" />
            <div className="space-y-4">
              {TIMELINE_EVENTS.map((ev, i) => (
                <motion.div key={ev.title} className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}>
                  <span className="text-[10px] text-on-surface-variant/50 w-16 text-right shrink-0 pt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{ev.date}</span>
                  <div className={`h-3 w-3 rounded-full border-2 shrink-0 mt-1 ${eventColors[ev.type]}`} />
                  <div className={`flex-1 rounded-lg border p-3 ${eventColors[ev.type]}`}>
                    <span className="text-[11px] text-on-surface font-medium block">{ev.title}</span>
                    <p className="text-[9px] text-on-surface-variant leading-snug mt-0.5">{ev.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Project Overview ────────────────── */}
        <motion.div id="project-overview" className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="font-label-caps text-primary text-[11px] mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4" /> ABOUT MATSYADRISHTI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "What MatsyaDrishti Does", desc: "An AI-powered Coastal Ecosystem Digital Twin that fuses INCOIS satellite data, eDNA biodiversity sampling, historical fisheries records, and real-time vessel tracking into a unified intelligence platform for sustainable ocean management." },
              { title: "How the AI Works", desc: "Matsya Engine uses a Deep Ensemble (v3.2) combining geospatial transformers, species distribution models, and risk assessment networks. It processes 12 data streams in real-time with 42ms inference latency and 91.7% prediction accuracy." },
              { title: "How the Digital Twin Works", desc: "A full-viewport immersive 4D ecosystem visualization with 8 toggleable layers — fish clusters, biodiversity zones, coral health, SST, ocean currents, chlorophyll, vessel tracking, and conservation zones — powered by temporal analysis from historical to predictive modes." },
              { title: "Expected Impact", desc: "32% improvement in protected species coverage, 22% increase in sustainable fishing efficiency, 3x faster biodiversity threat detection via eDNA, and prevention of 68% coral bleaching probability through early intervention protocols." },
              { title: "Future Expansion", desc: "Mapbox GL integration for real cartographic rendering, Supabase real-time data feeds, mobile-responsive field deployment, multi-language support for fishing communities, and edge computing for offshore sensor stations." },
              { title: "Technology Stack", desc: "Next.js 15 + TypeScript + Tailwind CSS + Framer Motion for premium animations + Recharts for analytics. Designed for Supabase integration with INCOIS API connectivity and eDNA metagenomic data pipelines." },
            ].map((card, i) => (
              <motion.div key={card.title} className="rounded-lg border border-border-glow bg-surface-container-low p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 + i * 0.05 }}>
                <span className="text-[12px] text-primary font-medium block mb-1.5">{card.title}</span>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
