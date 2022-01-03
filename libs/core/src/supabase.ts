import React, { useContext, useState } from "react";
import { SupabaseClient, User, createClient } from "@supabase/supabase-js";

import assert from "assert";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

assert(SUPABASE_URL, "Missing Supabase URL.");
assert(SUPABASE_KEY, "Missing Supabase API key.");

const SupabaseContext = React.createContext<SupabaseClient>(
  {} as SupabaseClient
);

export const SupabaseProvider: React.FC = ({ children }) => {
  const [supabase] = useState(createClient(SUPABASE_URL, SUPABASE_KEY));

  return React.createElement(
    SupabaseContext.Provider,
    { value: supabase },
    children
  );
};

export const useSupabase = () => useContext(SupabaseContext);

export const getUser = async (accessToken: string): Promise<User | null> => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { user } = await supabase.auth.api.getUser(accessToken);
  return user;
};
