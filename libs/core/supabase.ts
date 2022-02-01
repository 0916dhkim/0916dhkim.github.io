import assert from "assert";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

assert(SUPABASE_URL, "Missing Supabase URL.");
assert(SUPABASE_KEY, "Missing Supabase API key.");

console.log("Initializing supabase client...");
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
supabase.auth.onAuthStateChange((event, _session) => {
  console.log(`Supabase: ${event}`);
});
