import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { type Recommendation } from "./use-matsya-engine";

export interface AIPredictionRow {
  id: string;
  risk_score: number;
  risk_level: string;
  threat_level: string;
  fishing_advisory: string;
  confidence_score: number;
  recommendations: Recommendation[];
  explanation: string;
  created_at: string;
}

export function useAIPredictions() {
  const [data, setData] = useState<AIPredictionRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLatestPrediction() {
      try {
        const { data: result, error } = await supabase
          .from("ai_predictions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          throw error;
        }

        setData(result as AIPredictionRow);
      } catch (err: any) {
        console.error("Error fetching AI predictions:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestPrediction();

    const channel = supabase
      .channel("custom-ai-predictions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ai_predictions" },
        (payload) => {
          console.log("AI Prediction Update:", payload);
          fetchLatestPrediction();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading, error };
}
