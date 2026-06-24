import { useState, useEffect } from "react";
import { getLatestMarineHealth, type MarineHealthRow } from "@/lib/supabase/marine-health";
import { supabase } from "@/lib/supabase/client";

export function useMarineHealth() {
  const [data, setData] = useState<MarineHealthRow | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [source, setSource] = useState<string>("Derived (Realtime)");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await getLatestMarineHealth();
        
        const { data: prov } = await supabase
          .from("data_provenance")
          .select("*")
          .eq("metric", "marine_health")
          .order("last_updated", { ascending: false })
          .limit(1)
          .single();

        if (isMounted) {
          setData(result);
          if (prov) {
            setSource(prov.provider);
            setLastUpdated(new Date(prov.last_updated).toLocaleString());
          } else if (result) {
            setLastUpdated(new Date(result.created_at).toLocaleString());
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch marine health data"));
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
