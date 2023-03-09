import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import useSWR from "swr";

import type { BaseDatabase, Table, TableKey } from "../types";
import useClient from "./useClient";

const fetcher = async <D extends BaseDatabase>(
  url: TableKey<D>,
  client: SupabaseClient<D>
) => {
  const { data, error } = await client.from(url as string).select();
  if (error) {
    throw error;
  }
  return data as Array<Table<D, TableKey<D>, "Row">>;
};

const useDatabase = <D extends BaseDatabase = any>(from: TableKey<D>) => {
  const supabase = useClient<D>();

  const { data, isLoading } = useSWR(from as string, (url) =>
    fetcher<D>(url, supabase)
  );

  const insertData = async (
    from: TableKey<D>,
    data: Table<D, TableKey<D>, "Insert">,
    { count }: { count?: "exact" | "planned" | "estimated" } = {}
  ) => {
    const { error } = await supabase
      .from(from as string)
      .insert({ ...data }, { count });
    return { error };
  };

  const updateData = <K extends TableKey<D>>(
    from: K,
    data: Table<D, K, "Update">,
    { count }: { count?: "exact" | "planned" | "estimated" } = {}
  ): PostgrestFilterBuilder<D["public"], Table<D, K, "Row">, null> => {
    return supabase.from(from as string).update({ ...data }, { count });
  };

  const deleteData = <K extends TableKey<D>>(
    from: K,
    { count }: { count?: "exact" | "planned" | "estimated" } = {}
  ): PostgrestFilterBuilder<D["public"], Table<D, K, "Row">, null> => {
    return supabase.from(from as string).delete({ count });
  };

  return { data, isLoading, insertData, updateData, deleteData };
};

export default useDatabase;
