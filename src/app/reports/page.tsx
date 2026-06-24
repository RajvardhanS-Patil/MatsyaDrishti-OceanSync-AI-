"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { FloatingParticles } from "@/components/animations/floating-particles";
import {
  Heart, TreePine, CloudLightning, Fish, Shield, Brain, FileText, Download,
  AlertTriangle, Lightbulb, Target, Compass, Clock, CheckCircle2, ArrowUpRight,
  ArrowDownRight, Minus as MinusIcon, FileSpreadsheet, FileJson, Play, ChevronRight, Zap
} from "lucide-react";
import { useMarineHealth } from "@/hooks/use-marine-health";
import { useBiodiversity } from "@/hooks/use-biodiversity";
import { useOceanConditions } from "@/hooks/use-ocean-conditions";
import { useVessels } from "@/hooks/use-vessels";
import { useAlerts } from "@/hooks/use-alerts";
import { useAIPredictions } from "@/hooks/use-ai-predictions";

const kpiIcons = [Heart, TreePine, CloudLightning, Fish, Shield, Brain];
const briefIcons = { status: CheckCircle2, risk: AlertTriangle, opportunity: Lightbulb, action: Target };
const briefColors = { status: "border-primary/20 bg-primary/5", risk: "border-status-critical/20 bg-status-critical/5", opportunity: "border-status-warning/20 bg-status-warning/5", action: "border-status-info/20 bg-status-info/5" };
const briefTextColors = { status: "text-primary", risk: "text-status-critical", opportunity: "text-status-warning", action: "text-status-info" };

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);

  // Lift state for the 6 data streams
  const { data: healthData, loading: hl } = useMarineHealth();
  const { data: bioData, loading: bl } = useBiodiversity();
  const { data: oceanData, loading: ol } = useOceanConditions();
  const { data: vesselsData, loading: vl } = useVessels();
  const { data: alertsData, loading: al } = useAlerts();
  const { data: aiData, loading: ail } = useAIPredictions();

  const loading = hl || bl || ol || vl || al || ail;

  const handleExport = async (id: string, format: string) => {
    try {
      setGenerating(`${id}-${format}`);
      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: id, format })
      });

      if (!res.ok) throw new Error("Export failed");

      // Handle file download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${id}-${new Date().toISOString().split("T")[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate report.");
    } finally {
      setGenerating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
        <Zap className="h-10 w-10 text-primary animate-pulse mb-4" />
        <h2 className="text-primary font-mono text-sm">AGGREGATING LIVE INTELLIGENCE...</h2>
      </div>
    );
  }

  // Derive Live Executive KPIs
  const execKPIs = [
    { label: "Marine Health", value: healthData?.health_score.toFixed(1) || "N/A", unit: "/100", status: "healthy", change: "Live" },
    { label: "Biodiversity", value: bioData?.bhi.toFixed(1) || "N/A", unit: "/100", status: bioData?.trends.threat === "declining" ? "warning" : "healthy", change: "Live" },
    { label: "SST Temperature", value: oceanData?.temperature.toFixed(1) || "N/A", unit: "°C", status: "safe", change: "Live" },
    { label: "Active Incidents", value: alertsData?.length.toString() || "0", status: alertsData && alertsData.length > 0 ? "warning" : "healthy", change: "Live" },
    { label: "Tracked Vessels", value: vesselsData?.length.toString() || "0", status: "safe", change: "Live" },
    { label: "AI Risk Engine", value: aiData?.risk_score.toFixed(1) || "N/A", unit: "/100", status: aiData && aiData.risk_score > 50 ? "warning" : "healthy", change: "Live" },
  ];

  const reportTypes = [
    { id: "ecosystem-health", title: "Ecosystem Health Report", desc: "Marine metrics and anomalies" },
    { id: "fisheries-advisory", title: "Fisheries Advisory Report", desc: "Vessel compliance and AI quotas" },
    { id: "biodiversity-assessment", title: "Biodiversity Assessment", desc: "eDNA indices and habitat threat" },
    { id: "government-situation", title: "Government Situation Report", desc: "Executive dashboard summary" }
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <FloatingParticles />

      <main className="relative z-10 pt-20 px-4 pb-8 max-w-[1600px] mx-auto space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Executive Intelligence Center
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">
              Aggregated decision intelligence from all MatsyaDrishti modules.
            </p>
          </div>
        </div>

        {/* ── Executive KPIs ──────────────────── */}
        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {execKPIs.map((kpi: any, i: number) => {
            const Icon = kpiIcons[i];
            const isWarning = kpi.status === "warning";
            const color = isWarning ? "text-status-warning" : "text-primary";
            const bg = isWarning ? "border-status-warning/20" : "border-primary/20";
            return (
              <motion.div key={kpi.label} className={`glass-panel rounded-lg p-4 border ${bg}`}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.03, y: -2 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <span className="font-label-caps text-[9px] text-on-surface-variant block mb-0.5">{kpi.label}</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-lg font-bold ${color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {kpi.value}
                  </span>
                  {kpi.unit && <span className="text-[9px] text-on-surface-variant">{kpi.unit}</span>}
                </div>
                <span className="text-[8px] text-on-surface-variant/50 mt-0.5 block">{kpi.change}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── AI Briefing ────────────────────── */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          
          <div className={`glass-panel rounded-lg p-4 border ${briefColors.status}`}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className={`h-4 w-4 ${briefTextColors.status}`} />
              <span className={`font-label-caps text-[10px] ${briefTextColors.status}`}>LIVE SYSTEM STATUS</span>
            </div>
            <ul className="space-y-1.5">
              <li className="text-[10px] text-on-surface-variant leading-snug">Marine health score is {healthData?.health_score}</li>
              <li className="text-[10px] text-on-surface-variant leading-snug">Ocean Temperature is {oceanData?.temperature}°C</li>
              <li className="text-[10px] text-on-surface-variant leading-snug">Active Vessels Tracked: {vesselsData?.length}</li>
            </ul>
          </div>

          <div className={`glass-panel rounded-lg p-4 border ${briefColors.risk}`}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className={`h-4 w-4 ${briefTextColors.risk}`} />
              <span className={`font-label-caps text-[10px] ${briefTextColors.risk}`}>THREAT ASSESSMENT</span>
            </div>
            <ul className="space-y-1.5">
              <li className="text-[10px] text-on-surface-variant leading-snug">Current Threat Level: {aiData?.threat_level.toUpperCase()}</li>
              <li className="text-[10px] text-on-surface-variant leading-snug">Risk Score: {aiData?.risk_score.toFixed(1)} / 100</li>
              <li className="text-[10px] text-on-surface-variant leading-snug">Active Incidents: {alertsData?.length} critical alerts</li>
            </ul>
          </div>

          <div className={`glass-panel rounded-lg p-4 border ${briefColors.action}`}>
            <div className="flex items-center gap-2 mb-3">
              <Target className={`h-4 w-4 ${briefTextColors.action}`} />
              <span className={`font-label-caps text-[10px] ${briefTextColors.action}`}>AI RECOMMENDATIONS</span>
            </div>
            <ul className="space-y-1.5">
              {aiData?.recommendations?.map((rec: any, idx: number) => (
                 <li key={idx} className="text-[10px] text-on-surface-variant leading-snug">• {rec.action}</li>
              ))}
            </ul>
          </div>

        </motion.div>

        {/* ── Report Generation ───────────────── */}
        <motion.div className="glass-panel rounded-lg p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-label-caps text-primary text-[11px] flex items-center gap-2">
              <FileText className="h-4 w-4" /> SECURE REPORT GENERATION
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {reportTypes.map((r, i) => (
              <motion.div key={r.id} className="rounded-lg border border-border-glow bg-surface-container-low p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.05 }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[12px] text-on-surface font-medium block">{r.title}</span>
                    <span className="text-[9px] text-on-surface-variant block mt-0.5">{r.desc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border-glow/30">
                  <button 
                    onClick={() => handleExport(r.id, "pdf")}
                    disabled={generating !== null}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors text-[10px] disabled:opacity-50">
                    {generating === `${r.id}-pdf` ? <Clock className="h-3 w-3 animate-spin" /> : <FileText className="h-3 w-3" />}
                    EXPORT PDF
                  </button>
                  <button 
                    onClick={() => handleExport(r.id, "csv")}
                    disabled={generating !== null}
                    className="flex items-center justify-center p-1.5 rounded border border-border-glow text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50">
                    {generating === `${r.id}-csv` ? <Clock className="h-3 w-3 animate-spin" /> : <FileSpreadsheet className="h-3 w-3" />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
}
