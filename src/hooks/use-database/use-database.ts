import useSWR from "swr";

import type {
  BaseDatabase,
  CountStatement,
  Table,
  TableKey,
} from "../../types";
import { fetcher } from "../../util";
import useClient from "../use-client";
import type {
  DeleteDataFn,
  InsertDataFn,
  UpdateDataFn,
  UpsertDataFn,
  UseDatabaseOptions,
} from "./use-database.types";

/**
 * Supabase Database hook.
 *
 * the `data` is returned in object array format.
 * @param from - The table name to operate on.
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
  upsertData: UpsertDataFn<D, TableKey<D>>;
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
  options?: { selectSingle: true }
): {
  data: Table<D, TableKey<D>, "Row">;
  isLoading: boolean;
  insertData: InsertDataFn<D, TableKey<D>>;
  updateData: UpdateDataFn<D, TableKey<D>>;
  deleteData: DeleteDataFn<D, TableKey<D>>;
  upsertData: UpsertDataFn<D, TableKey<D>>;
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
export function useDatabase<
  D extends BaseDatabase,
  K extends TableKey<D> = TableKey<D>
>(from: K, options?: UseDatabaseOptions) {
  const supabase = useClient<D>();

  const { data, isLoading } = useSWR(from as string, (url) =>
    fetcher<D>(url, supabase, { selectSingle: options?.selectSingle })
  );

  const insertData = (
    from: K,
    data: Table<D, K, "Insert">,
    { count }: CountStatement = { count: undefined }
  ): ReturnType<InsertDataFn<D, K>> => {
    return supabase.from(from as string).insert({ ...data }, { count });
  };

  const updateData = (
    from: K,
    data: Table<D, K, "Update">,
    { count }: CountStatement = { count: undefined }
  ): ReturnType<UpdateDataFn<D, K>> => {
    return supabase.from(from as string).update({ ...data }, { count });
  };

  const upsertData = (
    from: K,
    data: Table<D, K, "Update">,
    { count }: CountStatement = { count: undefined }
  ): ReturnType<UpsertDataFn<D, K>> => {
    return supabase.from(from as string).upsert({ ...data }, { count });
  };

  const deleteData = (
    from: K,
    { count }: CountStatement = { count: undefined }
  ): ReturnType<DeleteDataFn<D, K>> => {
    return supabase.from(from as string).delete({ count });
  };

  return { data, isLoading, insertData, updateData, upsertData, deleteData };
}
