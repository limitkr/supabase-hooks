import type { SupabaseClient } from "@supabase/supabase-js";

import type { BaseDatabase, Table, TableKey } from "../types";
import type { SWRFetcherOptions } from "./fetcher.types";

// TODO: allow selecting specific columns next version...
export const fetcher = async <D extends BaseDatabase>(
  url: TableKey<D>,
  client: SupabaseClient<D>,
  options: SWRFetcherOptions
) => {
  if (options?.selectSingle) {
    const { data, error } = await client
      .from(url as string)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as Table<D, TableKey<D>, "Row">;
  } else {
    const { data, error } = await client.from(url as string).select();
    if (error) {
      throw error;
    }
    return data as Array<Table<D, TableKey<D>, "Row">>;
  }
};
