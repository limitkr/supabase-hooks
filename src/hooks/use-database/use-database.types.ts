import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";

import type {
  BaseDatabase,
  CountStatement,
  Table,
  TableKey,
} from "../../types";
import type { SWRFetcherOptions } from "../../util/fetcher.types";

export type UseDatabaseOptions = SWRFetcherOptions;

export type InsertDataFn<D extends BaseDatabase, K extends TableKey<D>> = (
  from: K,
  data: Table<D, K, "Insert">,
  options?: CountStatement
) => PostgrestFilterBuilder<D["public"], Table<D, K, "Insert">, null>;

export type UpdateDataFn<D extends BaseDatabase, K extends TableKey<D>> = (
  from: K,
  data: Table<D, K, "Update">,
  options?: CountStatement
) => PostgrestFilterBuilder<D["public"], Table<D, K, "Update">, null>;

export type UpsertDataFn<D extends BaseDatabase, K extends TableKey<D>> = (
  from: K,
  data: Table<D, K, "Update">,
  options?: CountStatement
) => PostgrestFilterBuilder<D["public"], Table<D, K, "Update">, null>;

export type DeleteDataFn<D extends BaseDatabase, K extends TableKey<D>> = (
  from: K,
  options?: CountStatement
) => PostgrestFilterBuilder<D["public"], Table<D, K, "Row">, null>;
