import { type SupabaseClient } from "@supabase/supabase-js";
import { createContext, type ReactNode } from "react";

export interface ProviderProps {
  children: ReactNode;
  supabaseClient: SupabaseClient;
}

export const Context = createContext<SupabaseClient | null>(null);

export default function Provider({ children, supabaseClient }: ProviderProps) {
  return <Context.Provider value={supabaseClient}>{children}</Context.Provider>;
}
