import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import useSWR from "swr";

import type { BaseDatabase, CountStatement, Table, TableKey } from "../types";
import { fetcher } from "../util";
import useClient from "./use-client";

export type InsertDataFn<D extends BaseDatabase, K extends TableKey<D>> = (
  from: K,
  data: Table<D, K, "Insert">,
  { count }?: CountStatement
) => PostgrestFilterBuilder<D["public"], Table<D, K, "Insert">, null>;

export type UpdateDataFn<D extends BaseDatabase, K extends TableKey<D>> = (
  from: K,
  data: Table<D, K, "Update">,
  { count }?: CountStatement
) => PostgrestFilterBuilder<D["public"], Table<D, K, "Update">, null>;

export type DeleteDataFn<D extends BaseDatabase, K extends TableKey<D>> = (
  from: K,
  { count }?: CountStatement
) => PostgrestFilterBuilder<D["public"], Table<D, K, "Row">, null>;

/**
 * Supabase Database hook.
 *
 * the `data` is returned in object array format.
 * @param from - The table name to operate on.
 * @param options - Database fetch options.
 *
 * @returns Fetched data, loading status, data insertion, deletion, update functions
 */
export function useDatabase<D extends BaseDatabase>(
  from: TableKey<D>
): {
  data: Array<Table<D, TableKey<D>, "Row">>;
  isLoading: boolean;
  insertData: InsertDataFn<D, TableKey<D>>;
  updateData: UpdateDataFn<D, TableKey<D>>;
  deleteData: DeleteDataFn<D, TableKey<D>>;
};

/**
 * Supabase Database hook.
 *
 * If `selectSingle` is set to `true` for the options' parameter, the `data` is returned in single object format.
 * @param from - The table name to operate on.
 * @param options - Database fetch options.
 *
 * @returns Fetched data, loading status, data insertion, deletion, update functions
 */
export function useDatabase<D extends BaseDatabase>(
  from: TableKey<D>,
  options: { selectSingle: true }
): {
  data: Table<D, TableKey<D>, "Row">;
  isLoading: boolean;
  insertData: InsertDataFn<D, TableKey<D>>;
  updateData: UpdateDataFn<D, TableKey<D>>;
  deleteData: DeleteDataFn<D, TableKey<D>>;
};

/**
 * Supabase Database hook.
 *
 * If `selectSingle` is set to `true` for the options' parameter, the `data` is returned in single object format.
 * @param from - The table name to operate on.
 * @param options - Database fetch options.
 * @returns Fetched data, loading status, data insertion, deletion, update functions
 *
 * @example Perform a SELECT query on the table or view.
 * ```
 * const { data } = useDatabase<Database>("posts");
 * ```
 *
 * @example Perform a SELECT query on the table or view, Return single data
 * ```
 * const { data } = useDatabase<Database>("posts", { selectSingle: true });
 * ``
 *
 */
export function useDatabase<D extends BaseDatabase = any>(
  from: TableKey<D>,
  options: { selectSingle: boolean } = { selectSingle: false }
) {
  const supabase = useClient<D>();

  const { data, isLoading } = useSWR(from as string, (url) =>
    fetcher<D>(url, supabase, options.selectSingle)
  );

  const insertData = <K extends TableKey<D>>(
    from: K,
    data: Table<D, K, "Insert">,
    { count }: CountStatement = { count: undefined }
  ): ReturnType<InsertDataFn<D, K>> => {
    return supabase.from(from as string).insert({ ...data }, { count });
  };

  const updateData = <K extends TableKey<D>>(
    from: K,
    data: Table<D, K, "Update">,
    { count }: CountStatement = { count: undefined }
  ): ReturnType<UpdateDataFn<D, K>> => {
    return supabase.from(from as string).update({ ...data }, { count });
  };

  const deleteData = <K extends TableKey<D>>(
    from: K,
    { count }: CountStatement = { count: undefined }
  ): ReturnType<DeleteDataFn<D, K>> => {
    return supabase.from(from as string).delete({ count });
  };

  return { data, isLoading, insertData, updateData, deleteData };
}
