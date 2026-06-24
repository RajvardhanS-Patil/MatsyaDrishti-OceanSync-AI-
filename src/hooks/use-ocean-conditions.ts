import { useState, useEffect } from "react";
import { getLatestOceanConditions, type OceanConditionRow } from "@/lib/supabase/ocean-conditions";

export function useOceanConditions() {
  const [data, setData] = useState<OceanConditionRow | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [source, setSource] = useState<string>("Open-Meteo Marine (Live)");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch real data
        const result = await getLatestOceanConditions();
        
        // Fetch provenance
        const { supabase } = await import("@/lib/supabase/client");
        const { data: prov } = await supabase
          .from("data_provenance")
          .select("*")
          .eq("metric", "sea_surface_temperature")
          .order("last_updated", { ascending: false })
          .limit(1)
          .single();

        if (isMounted) {
          setData(result);
          if (prov) {
            setSource(prov.provider);
            setLastUpdated(new Date(prov.last_updated).toLocaleString());
          } else {
            setLastUpdated(result ? new Date(result.created_at).toLocaleString() : "");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch ocean conditions"));
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
