// import { PostgrestFilterBuilder } from "@supabase/postgrest-js"

interface TableStatement {
  /**
   * The data expected to be returned from a "select" statement.
   */
  Row: AnyStringKey;
  /**
   * The data expected passed to an "insert" statement.
   */
  Insert: AnyStringKey;
  /**
   * The data expected passed to an "update" statement.
   */
  Update: any;
}

type AnyStringKey = {
  [index: string]: any;
};

export interface BaseDatabase {
  public: {
    Tables: {
      [index: string]: TableStatement;
    };
    Views: AnyStringKey;
    Functions: AnyStringKey;
    Enums: AnyStringKey;
  };
}

export type SupabaseTables<D extends BaseDatabase> = D["public"]["Tables"];
type SupabaseViews<D extends BaseDatabase> = D["public"]["Views"];
type SupabaseFunctions<D extends BaseDatabase> = D["public"]["Functions"];
type SupabaseEnums<D extends BaseDatabase> = D["public"]["Enums"];

export type TableKey<D extends BaseDatabase> = keyof SupabaseTables<D>;

type ExtractTable<T, K extends keyof T> = T[K];

/*
export type Row<
  D extends BaseDatabase,
  K extends keyof SupabaseTables<D>
> = ExtractTable<SupabaseTables<D>, K>["Row"];
*/

export type Table<
  D extends BaseDatabase,
  K extends TableKey<D>,
  Statement extends keyof TableStatement
> = ExtractTable<SupabaseTables<D>, K>[Statement];

/*
type GetAllMethods<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type TypeOfClassMethod<T, M extends keyof T> = T[M] extends Function
  ? T[M]
  : never;

export type AllFilters = GetAllMethods<
  PostgrestFilterBuilder<any, any, unknown>
>;

type FilterMethodType<
  D extends BaseDatabase,
  P extends AllFilters
> = TypeOfClassMethod<
  PostgrestFilterBuilder<D["public"], SupabaseTables<D>, unknown>,
  P
>;

type FilterMethodReturnType<
  D extends BaseDatabase,
  P extends AllFilters
> = Parameters<FilterMethodType<D, P>>;
*/
