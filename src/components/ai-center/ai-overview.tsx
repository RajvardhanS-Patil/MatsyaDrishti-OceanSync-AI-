"use client";

import { motion } from "framer-motion";
import { Brain, HeartPulse, Target, Radio, Zap, ShieldCheck, AlertTriangle } from "lucide-react";
import { useMatsyaEngine } from "@/hooks/use-matsya-engine";

export function AIOverview() {
  const { 
    loading, 
    riskScore, 
    riskLevel, 
    threatLevel, 
    fishingAdvisory, 
    confidenceScore, 
    activeStreamsCount 
  } = useMatsyaEngine();

  const getRiskColor = (level: string) => {
    if (level === "Low") return "#a6cfbe";
    if (level === "Moderate") return "#FFCE00";
    if (level === "High") return "#FF6B6B";
    return "#FF3B30";
  };

  const getAdvisoryColor = (adv: string) => {
    if (adv === "Recommended") return "#a6cfbe";
    if (adv === "Caution") return "#FFCE00";
    return "#FF3B30";
  };

  const kpis = [
    { label: "Engine Status", value: loading ? "INITIALIZING" : "ONLINE", color: loading ? "#FFCE00" : "#a6cfbe", icon: Brain, pulsing: !loading },
    { label: "Ecological Risk", value: loading ? "--" : riskScore.toFixed(1), unit: "/ 100", color: getRiskColor(riskLevel), icon: AlertTriangle, extra: riskLevel },
    { label: "Biodiversity Threat", value: loading ? "--" : threatLevel.toUpperCase(), color: threatLevel === "Critical" || threatLevel === "Declining" ? "#FFCE00" : "#a6cfbe", icon: HeartPulse },
    { label: "Data Streams", value: loading ? "--" : activeStreamsCount.toString(), unit: "ACTIVE", color: "#afcdc2", icon: Radio },
    { label: "Fishing Advisory", value: loading ? "--" : fishingAdvisory.toUpperCase(), color: getAdvisoryColor(fishingAdvisory), icon: Target },
    { label: "Confidence Score", value: loading ? "--" : confidenceScore.toFixed(0), unit: "%", color: confidenceScore > 80 ? "#a6cfbe" : "#FFCE00", icon: ShieldCheck },
  ];

  return (
    <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <motion.div key={kpi.label} className="glass-panel rounded-lg p-4 group"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.03, y: -2 }}>
            <div className="flex items-center justify-between mb-2">
              <Icon className="h-4 w-4" style={{ color: kpi.color }} />
              {kpi.pulsing && (
                <motion.span className="h-2 w-2 rounded-full" style={{ backgroundColor: kpi.color }}
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              )}
            </div>
            <span className="font-label-caps text-[9px] text-on-surface-variant block mb-1">{kpi.label}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: kpi.color }}>
                {kpi.value}
              </span>
              {kpi.unit && <span className="text-[10px] text-on-surface-variant">{kpi.unit}</span>}
            </div>
            {kpi.extra && (
              <span className="text-[9px] font-label-caps mt-1 block" style={{ color: kpi.color }}>{kpi.extra}</span>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
