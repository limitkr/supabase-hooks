import type { GenericSchema } from "@supabase/supabase-js/src/lib/types";

import { Database } from "../../../../test/util";
import type { SWRFetcherOptions } from "./fetcher";

export type UseDatabaseOptions<D> = SWRFetcherOptions<D>;

type SchemaName<D> = "public" extends keyof D ? "public" : string & keyof D;
export type Schema<D> = D[SchemaName<D>] extends GenericSchema
  ? D[SchemaName<D>]
  : any;

export type TableName<D> = string & keyof Schema<D>["Tables"];
export type Table<D> = Schema<D>["Tables"][TableName<D>];
export type Query<D> = keyof Table<D>;

export type SingleTable<
  D,
  K extends TableName<D>
> = Schema<D>["Tables"][K]["Row"];

type S = TableName<Database>;
