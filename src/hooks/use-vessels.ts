import { useState, useEffect } from "react";
import { getActiveVessels, type VesselRow } from "@/lib/supabase/vessels";

export function useVessels() {
  const [data, setData] = useState<VesselRow[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [source, setSource] = useState<string>("Global Fishing Watch");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const result = await getActiveVessels();

        // Fetch provenance
        const { supabase } = await import("@/lib/supabase/client");
        const { data: prov } = await supabase
          .from("data_provenance")
          .select("*")
          .eq("metric", "vessels")
          .order("last_updated", { ascending: false })
          .limit(1)
          .single();

        if (isMounted) {
          setData(result);

          if (prov) {
            setSource(prov.provider);
            setLastUpdated(new Date(prov.last_updated).toLocaleString());
          } else if (result && result.length > 0) {
            setLastUpdated(new Date(result[0].last_update).toLocaleString());
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch vessels data"));
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
