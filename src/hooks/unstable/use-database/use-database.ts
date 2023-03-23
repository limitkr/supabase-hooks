import useSWR from "swr";

import useClient from "../../use-client";
import { fetcher } from "./fetcher";
import { FilterBuilder, GetTable, GetTableName } from "./filter";
import type { SingleTable, UseDatabaseOptions } from "./use-database.types";

/**
 * Supabase database hook. `data` is returned by default as an `Array` type.
 *
 * ## Example
 *
 * ```ts
 * const { data } = useDatabase<Database, "posts">("posts");
 * ```
 * The `data` will be `Array` type.
 *
 * @param from - The table name to operate on.
 * @param options - Database fetch options.
 */
export function useDatabaseWithFilters<
  D,
  TableName extends GetTableName<D>,
  MethodName extends keyof FilterBuilder<
    GetTable<D, TableName>
  > = keyof FilterBuilder<GetTable<D, TableName>>
>(
  from: TableName,
  options?: { single: false } & UseDatabaseOptions<D, MethodName>
): {
  data: SingleTable<D, TableName>[];
  isLoading: boolean;
};

/**
 * Supabase database hook. `data` is returned by default as an single `Object` type.
 *
 * This description can be seen when single is set to `true` in the
 * option parameter.
 *
 * ## Example
 *
 * ```ts
 * const { data } = useDatabase<Database, "posts">("posts", { single: true });
 * ```
 * The `data` will be single `Object` type.
 *
 * @param from The table name to operate on.
 * @param options - Database fetch options.
 */
export function useDatabaseWithFilters<
  D,
  TableName extends GetTableName<D>,
  MethodName extends keyof FilterBuilder<
    GetTable<D, TableName>
  > = keyof FilterBuilder<GetTable<D, TableName>>
>(
  from: TableName,
  options: { single: true } & UseDatabaseOptions<D, MethodName>
): {
  data: SingleTable<D, TableName>;
  isLoading: boolean;
};

export function useDatabaseWithFilters<
  D,
  TableName extends GetTableName<D>,
  MethodName extends keyof FilterBuilder<
    GetTable<D, TableName>
  > = keyof FilterBuilder<GetTable<D, TableName>>
>(
  from: TableName,
  options: UseDatabaseOptions<D, MethodName> = { single: false, select: "*" }
): {
  data:
    | SingleTable<D, TableName>
    | Array<SingleTable<D, TableName>>
    | undefined;
  isLoading: boolean;
} {
  const client = useClient<D>();

  const { data, isLoading } = useSWR(from as string, async (url: TableName) =>
    fetcher(client, url, options)
  );

  return { data, isLoading };
}
