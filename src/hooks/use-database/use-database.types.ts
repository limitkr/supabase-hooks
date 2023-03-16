import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";

import { BaseDatabase, CountStatement, Table, TableKey } from "../../types";

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

export type UpsertDataFn<D extends BaseDatabase, K extends TableKey<D>> = (
  from: K,
  data: Table<D, K, "Update">,
  { count }?: CountStatement
) => PostgrestFilterBuilder<D["public"], Table<D, K, "Update">, null>;

export type DeleteDataFn<D extends BaseDatabase, K extends TableKey<D>> = (
  from: K,
  { count }?: CountStatement
) => PostgrestFilterBuilder<D["public"], Table<D, K, "Row">, null>;
