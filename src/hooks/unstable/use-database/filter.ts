import type { GenericSchema } from "@supabase/supabase-js/src/lib/types";

type SupabaseFilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "ilike"
  | "is"
  | "in"
  | "cs"
  | "cd"
  | "sl"
  | "sr"
  | "nxl"
  | "nxr"
  | "adj"
  | "ov"
  | "fts"
  | "plfts"
  | "phfts"
  | "wfts";

export interface FilterBuilder<Row extends Record<string, unknown>> {
  eq(): [column: keyof Row & string, value: Row[keyof Row]];
  neq(): [column: keyof Row & string, value: Row[keyof Row]];
  gt(): [column: keyof Row & string, value: Row[keyof Row]];

  gte(): [column: keyof Row & string, value: Row[keyof Row]];
  lt(): [column: keyof Row & string, value: Row[keyof Row]];
  lte(): [column: keyof Row & string, value: Row[keyof Row]];
  like(): [column: keyof Row & string, pattern: string];
  ilike(): [column: keyof Row & string, pattern: string];
  is(): [column: keyof Row & string, value: Row[keyof Row] & (boolean | null)];
  in(): [column: keyof Row & string, value: Array<Row[keyof Row]>];
  contains(): [
    column: keyof Row & string,
    value: string | Row[keyof Row] | Record<string, unknown>
  ];
  containedBy(): [
    column: keyof Row & string,
    value: string | Array<Row[keyof Row]> | Record<string, unknown>
  ];
  rangeGt(): [column: keyof Row & string, range: string];
  rangeGte(): [column: keyof Row & string, range: string];
  rangeLt(): [column: keyof Row & string, range: string];
  rangeLte(): [column: keyof Row & string, range: string];
  rangeAdjacent(): [column: keyof Row & string, range: string];
  overlaps(): [
    column: keyof Row & string,
    value: string | Array<Row[keyof Row]>
  ];
  textSearch(): [
    column: keyof Row & string,
    query: string,
    options?: { config?: string; type?: "plain" | "phrase" | "websearch" }
  ];
  match(): [query: Record<keyof Row & string, Row[keyof Row]>];
  not(): [
    column: keyof Row & string,
    operator: SupabaseFilterOperator,
    value: Row[keyof Row]
  ];
  or(): [filters: string, foreignTable: { foreignTable?: string }];

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

export type FilterMethod<D> = keyof FilterBuilder<GetTable<D, GetTableName<D>>>;
