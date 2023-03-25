import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  FilterMethod,
  GetFilterBuilder,
  GetTable,
  GetTableName,
} from "./filter";
import type { Query, SingleTable, TableName } from "./use-database.types";

export interface SWRFetcherOptions<D, F extends FilterMethod<D>> {
  select?: Query<D> & string;
  single?: boolean;
  filter?: {
    op: F;
    args: GetFilterBuilder<GetTable<D, GetTableName<D>>, F>;
  };
}

export const fetcher = async <
  D,
  K extends TableName<D>,
  F extends FilterMethod<D>
>(
  client: SupabaseClient<D>,
  url: K,
  options: SWRFetcherOptions<D, F>
): Promise<SingleTable<D, K> | SingleTable<D, K>[]> => {
  const { single, select, filter } = options;
  if (single) {
    if (filter?.op) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { data, error } = await client
        .from(url as string)
        .select(select)
        [filter.op](...filter.args())
        .single();

      if (error) {
        throw error;
      }
      return data as SingleTable<D, K>;
    } else {
      const { data, error } = await client
        .from(url as string)
        .select(select)
        .single();

      if (error) {
        throw error;
      }
      return data as SingleTable<D, K>;
    }
  }

  const { data, error } = await client.from(url as string).select(select);
  if (error) {
    throw error;
  }

  return data as SingleTable<D, K>[];
};
