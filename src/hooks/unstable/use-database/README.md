# Implementation

This is an implementation document for the currently unstable hook, 
`useDatabaseWithFilters`(exported as `unstable_useDatabase`). 
In the future, it will be implemented to behave as written in the document.

## Definitions

```ts
function useDatabaseWithFilters<D extends BaseDatabase>(from: TableKey<D>)
```

## Selecting specific columns

```ts
import { unstable_useDatabase as useDatabaseWithFilters } from "@limitkr/supabase-hooks/unstable";

const { data } = useDatabaseWithFilters('posts', { select: 'id' });
```

## Using Filters
