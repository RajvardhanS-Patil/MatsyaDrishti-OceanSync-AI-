import { useState, useEffect } from "react";
import { getLatestFishingZones } from "@/lib/supabase/fishing-zones";
import { type FishingZone } from "@/lib/fisherman-data";

export function useFishingZones() {
  const [data, setData] = useState<FishingZone[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await getLatestFishingZones();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch fishing zones data"));
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

  return { data, loading, error };
}
