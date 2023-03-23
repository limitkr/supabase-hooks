import type { GenericSchema } from "@supabase/supabase-js/src/lib/types";

import type { SWRFetcherOptions } from "./fetcher";
import type { FilterMethod } from "./filter";

export type UseDatabaseOptions<D, F extends FilterMethod> = Exclude<
  SWRFetcherOptions<D, F>,
  "single"
>;

export type SchemaName<D> = "public" extends keyof D
  ? "public"
  : string & keyof D;
export type Schema<D> = D[SchemaName<D>] extends GenericSchema
  ? D[SchemaName<D>]
  : any;

export type TableName<D> = keyof Schema<D>["Tables"];
export type Table<D> = Schema<D>["Tables"][TableName<D>];
export type Query<D> = keyof Table<D>["Row"];

export type SingleTable<
  D,
  K extends TableName<D>
> = Schema<D>["Tables"][K]["Row"];
