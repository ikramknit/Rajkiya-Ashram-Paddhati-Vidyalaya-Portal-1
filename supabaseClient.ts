import { createClient } from '@supabase/supabase-js';

// CONFIGURATION:
// 1. The URL provided by the user
const SUPABASE_URL: string = 'https://slxvagtskupvkosaamaw.supabase.co';

// 2. The Anon Public Key provided by the user
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNseHZhZ3Rza3Vwdmtvc2FhbWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1ODA4NTYsImV4cCI6MjA3MDE1Njg1Nn0.A720F6_WQJ4QREiux2L99jWLC_ZpYGfQLYREU7w0a4k';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to check if Supabase is configured properly
export const isSupabaseConfigured = () => {
  return SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' && 
         SUPABASE_ANON_KEY !== 'INSERT_YOUR_ANON_KEY_HERE' &&
         SUPABASE_ANON_KEY.length > 10;
};