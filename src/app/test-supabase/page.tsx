import { supabase } from "@/lib/supabase/client";

export default async function TestSupabase() {
  const { data, error } = await supabase
    .from("marine_health")
    .select("*");

  return (
    <div className="p-8 text-white">
      <h1>Supabase Test</h1>

      {error && (
        <pre>{JSON.stringify(error, null, 2)}</pre>
      )}

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}