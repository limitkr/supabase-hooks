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
// type SupabaseViews<D extends BaseDatabase> = D["public"]["Views"];
// type SupabaseFunctions<D extends BaseDatabase> = D["public"]["Functions"];
// type SupabaseEnums<D extends BaseDatabase> = D["public"]["Enums"];

export type TableKey<D extends BaseDatabase> = keyof SupabaseTables<D>;

type ExtractTable<T, K extends keyof T> = T[K];

export type Table<
  D extends BaseDatabase,
  K extends TableKey<D>,
  Statement extends keyof TableStatement
> = ExtractTable<SupabaseTables<D>, K>[Statement];

export type CountStatement = {
  count?: "exact" | "planned" | "estimated";
};
