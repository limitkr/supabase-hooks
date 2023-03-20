import type { SupabaseClient } from "@supabase/supabase-js";

import type { Query, TableName } from "./use-database.types";

export interface SWRFetcherOptions<D> {
  select?: Query<D> extends string ? Query<D> : string;
  single?: boolean;
}

export const fetcher = async <D>(
  url: TableName<D>,
  client: SupabaseClient<D>
  //  options?: SWRFetcherOptions<D>
) => {
  const { data, error } = await client.from(url).select();
  if (error) {
    throw error;
  }
  return data;
};
