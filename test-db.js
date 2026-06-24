const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const tables = [
  'weather',
  'ocean_conditions',
  'biodiversity_metrics',
  'vessels',
  'fishing_zones',
  'marine_health',
  'alerts',
  'ai_predictions',
  'reports_generated',
  'data_provenance',
  'ingestion_logs'
];

async function checkTables() {
  for (const table of tables) {
    const { data, error, count } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(\\: MISSING or ERROR (\)\);
    } else {
      console.log(\\: EXISTS (\ rows)\);
    }
  }
}

checkTables();
