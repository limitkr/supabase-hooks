# supabase-hooks

React hooks library for [Supabase]("https://github.com/supabase/supabase") ⭐

# Install

```shell
npm install @limitkr/supabase-hooks
# or yarn package manager
yarn add @limitkr/supabase-hooks
```

> :warning: This is an experimental repo, still under development.

# Usage

## NextJS Example

Import the `<SHProvider />` at the project root:

```tsx
import { createClient } from "@supabase/supabase-js";
import { SHProvider } from "@limitkr/supabase-hooks";
import type { AppProps } from "next/app";

import type { Database } from "database.types"; // Supabase Database types

const client = createClient<Database>(
  /* Supabase URL */,
  /* Supabase Key */
);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SHProvider supabaseClient={client}>
      <Component {...pageProps} />
    </SHProvider>
  )
}
```

And use the hook you want anywhere on the page.

```tsx
import { useDatabase } from "@limitkr/supabase-hooks";

import type { Database } from "database.types"; // Supabase Database types

export default function MyPage() {
  const { data: posts, isLoading } = useDatabase<Database>("posts");
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {posts.map((post) => (
        <p>{post.title}</p>
      ))}
    </div>
  );
}

```

# API
## `useClient<T>()`
```ts
const useClient = <Database = {}>(): ReturnType<typeof createClient<T>>;
```

## `useDatabase<T>(from)`

```ts
const useDatabase = <D extends BaseDatabase = any>(from: TableKey<D>) => {
  return { data, isLoading, insertData, updateData, deleteData };
}
```
