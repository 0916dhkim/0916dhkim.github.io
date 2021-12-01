import assert from "assert";
import { createClient } from "@supabase/supabase-js";

assert(process.env.NEXT_PUBLIC_SUPABASE_URL);
assert(process.env.NEXT_PUBLIC_SUPABASE_KEY);

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);
