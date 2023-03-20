import useSWR from "swr";

import { Database as DB } from "../../../../test/util";
import useClient from "../../use-client";
import type { SingleTable, TableName } from "./use-database.types";

export function useDatabaseWithFilters<D, K extends TableName<D>>(from: K) {
  const client = useClient<DB>();

  const { data } = useSWR(from as string, async (url: K) => {
    const { data, error } = await client.from(url).select();

    return data as SingleTable<D, K>[];
  });

  return { data };
}
