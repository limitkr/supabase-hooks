import type { GenericSchema } from "@supabase/supabase-js/src/lib/types";

export interface FilterBuilder<Row extends Record<string, unknown>> {
  eq(): [column: keyof Row & string, value: Row[keyof Row]];
  like(): [column: keyof Row & string, pattern: string];
  filter(): [column: keyof Row & string, operator: string, value: unknown];
}

export type GetSchema<
  Database = any,
  SchemaName extends string & keyof Database = "public" extends keyof Database
    ? "public"
    : string & keyof Database,
  Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any
> = Schema;

export type GetTable<D, TName> = TName extends string &
  keyof GetSchema<D>["Tables"]
  ? GetSchema<D>["Tables"][TName]["Row"]
  : never;

export type GetTableName<D> = keyof GetSchema<D>["Tables"];

export type GetFilterBuilder<
  Table extends Record<string, unknown>,
  FilterType extends keyof FilterBuilder<Table>
> = FilterBuilder<Table>[FilterType];

export type FilterMethod = keyof FilterBuilder<any>;
