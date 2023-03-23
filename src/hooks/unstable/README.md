# Implementation

This is an implementation document for the currently unstable hook,
`useDatabaseWithFilters`(exported as `unstable_useDatabase`).
In the future, it will be implemented to behave as written in the document, and it will replace the current `useDatabase` hook.

To use this unstable hook, import it as below.

```ts
import { unstable_useDatabase as useDatabase } from "@limitkr/supabase-hooks/unstable";
```

## `useDatabase(from, options)`

### Definitions

```ts
function useDatabaseWithFilters<
  D,
  TableName extends GetTableName<D>,
  MethodName extends keyof FilterBuilder<GetTable<D, TableName>> = string
>(from: K);
```

You need to put two generics: `D` and `K`. `D` is the database type extracted from Supabase. You can get a database type using supabase CLI.

```bash
supabase start
supabase gen types typescript --local > lib/database.types.ts
```

Check the [Supabase Docs](https://supabase.com/docs/reference/javascript/typescript-support).

`K` is the table name to operate on. For example, if you want to fetch data from "posts" table, use like this:

```ts
const { data } = useDatabase<Database, "posts">("posts");
```

### Selecting specific columns

```ts
const { data } = useDatabase<Database, "posts">("posts", {
  select: "id",
});
```

### Single select

```ts
const { data } = useDatabase<Database, "posts">("posts", {
  single: true,
});
```

### Using Filters

To use the filter, enter the `filter` parameter in the second argument of `useDatabase`. Type hints are provided by entering the filter method to use for the third generic of `useDatabase`.

```ts
const { data } = useDatabase<Database, "posts", "eq">("posts", {
  filter: {
    op: "eq",
    args: () => ["id", "1"],
  },
});
```

#### `op: FilterMethod`

All filter method types in supabase. It is defined as below.

```ts
interface FilterBuilder {
  eq: //
  neq: //
  ...
}

export type FilterMethod = keyof FilterBuilder; // "eq" | "neq" | "..."
```

#### `args: GetFilterBuilder<GetTable<D, GetTableName<D>>, FilterMethod>`

Arguments required for the filter method. You must enter the array type in order. Provides different type hints depending on the filter method you entered. For example, `eq` provides type hints as shown below.
<img width="522" alt="스크린샷 2023-03-23 오후 6 28 21" src="https://user-images.githubusercontent.com/51485489/227160613-0fdcc48d-7c3a-4d21-b232-fe1a8f46bf8a.png">

The `filter` method requires three arguments, giving you the correct type hint as shown below!
<img width="517" alt="스크린샷 2023-03-23 오후 6 28 47" src="https://user-images.githubusercontent.com/51485489/227160863-de900bd3-f161-4d41-bceb-d9b7ced642d9.png">
