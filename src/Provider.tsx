import { type SupabaseClient } from "@supabase/supabase-js";
import { createContext, type ReactNode } from "react";

export interface SHProviderProps {
  children: ReactNode;
  supabaseClient: SupabaseClient;
}

export const Context = createContext<SupabaseClient | null>(null);

export default function Provider({
  children,
  supabaseClient,
}: SHProviderProps) {
  return <Context.Provider value={supabaseClient}>{children}</Context.Provider>;
}
