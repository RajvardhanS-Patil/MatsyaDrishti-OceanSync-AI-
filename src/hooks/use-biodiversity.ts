import { useState, useEffect } from "react";
import { getAllBiodiversity, type BiodiversityMetricsRow } from "@/lib/supabase/biodiversity";

export interface BiodiversityIntelligence {
  current: BiodiversityMetricsRow;
  history: BiodiversityMetricsRow[];
  bhi: number;
  speciesScore: number;
  status: "Excellent" | "Good" | "Moderate" | "Critical";
  trends: {
    bhi: "improving" | "stable" | "declining";
    habitat: "improving" | "stable" | "declining";
    threat: "improving" | "stable" | "declining";
  };
}

function calculateBHI(row: BiodiversityMetricsRow, maxSpecies: number) {
  const speciesScore = maxSpecies > 0 ? (row.species_richness / maxSpecies) * 100 : 0;
  // Threat score is inversely proportional to health. (0 = no threat, 100 = max threat)
  // Therefore, (100 - threat_score) is the health contribution.
  const threatHealth = 100 - row.threat_score;
  const bhi = (speciesScore + threatHealth + row.coral_health + row.water_quality) / 4;
  return { speciesScore, bhi };
}

function getStatus(bhi: number): "Excellent" | "Good" | "Moderate" | "Critical" {
  if (bhi >= 85) return "Excellent";
  if (bhi >= 70) return "Good";
  if (bhi >= 50) return "Moderate";
  return "Critical";
}

function getTrend(current: number, previous: number, invert: boolean = false): "improving" | "stable" | "declining" {
  const diff = current - previous;
  if (Math.abs(diff) < 1.0) return "stable";
  if (diff > 0) return invert ? "declining" : "improving";
  return invert ? "improving" : "declining";
}

export function useBiodiversity() {
  const [data, setData] = useState<BiodiversityIntelligence | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const [source, setSource] = useState<string>("OBIS API (Live)");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch real data
        const rows = await getAllBiodiversity();
        
        // Fetch provenance
        const { supabase } = await import("@/lib/supabase/client");
        const { data: prov } = await supabase
          .from("data_provenance")
          .select("*")
          .eq("metric", "species_richness")
          .order("last_updated", { ascending: false })
          .limit(1)
          .single();
        
        if (isMounted && rows && rows.length > 0) {
          const current = rows[0];
          const previous = rows.length > 1 ? rows[1] : rows[0];
          
          const maxSpecies = Math.max(...rows.map(r => r.species_richness));
          
          const currentCalc = calculateBHI(current, maxSpecies);
          const previousCalc = calculateBHI(previous, maxSpecies);
          
          setData({
            current,
            history: rows,
            bhi: currentCalc.bhi,
            speciesScore: currentCalc.speciesScore,
            status: getStatus(currentCalc.bhi),
            trends: {
              bhi: getTrend(currentCalc.bhi, previousCalc.bhi),
              habitat: getTrend(current.habitat_score, previous.habitat_score),
              threat: getTrend(current.threat_score, previous.threat_score, true), // Lower threat is better
            }
          });
          
          if (prov) {
            setSource(prov.provider);
            setLastUpdated(new Date(prov.last_updated).toLocaleString());
          } else {
            setLastUpdated(new Date(current.created_at).toLocaleString());
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch biodiversity data"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error, source, lastUpdated };
}
