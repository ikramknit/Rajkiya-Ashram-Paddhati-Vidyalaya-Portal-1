import { createClient } from '@supabase/supabase-js';

// CONFIGURATION:
// 1. The URL provided by the user
const SUPABASE_URL: string = 'https://slxvagtskupvkosaamaw.supabase.co';

// 2. YOU MUST PASTE YOUR ANON KEY HERE
const SUPABASE_ANON_KEY: string = 'slxvagtskupvkosaamaw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to check if Supabase is configured properly
export const isSupabaseConfigured = () => {
  return SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' && 
         SUPABASE_ANON_KEY !== 'INSERT_YOUR_ANON_KEY_HERE' &&
         SUPABASE_ANON_KEY.length > 10;
};