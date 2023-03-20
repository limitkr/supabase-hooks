# supabase-hooks

React hooks library for [Supabase](https://github.com/supabase/supabase) ⭐

# Contents
1. [Install](#install)
2. [Usage](#usage)
   - [NextJS Example](#nextjs-example)
3. [Run the Test](#run-the-test)
4. [API](#api)
    - [useClient](#useclientt)
    - [useDatabase](#usedatabasetfrom)

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

# Run the Test

This project uses Jest's `setupFiles` feature to change the process.env variable before running the test. So you need to
read the description below if you want to run the test.

## Setup

At the root of the project, create a *.jest* folder. You can also create it with the command below:

```shell
mkdir .jest
```
And then create the *setEnvVar.js* file in the folder. assign the env variables in the *setEnvVar.js*.

```js
// .jest/setEnvVar.js

process.env.SUPABASE_URL = /* Your Supabase URL */
process.env.SUPABASE_ANON_KEY = /* Your Supabase Key */
```

And create new empty supabase instance for testing, and create a new table like the image below.

<img width="669" alt="create table example" src="https://user-images.githubusercontent.com/51485489/225901028-8f1b00e8-cc8d-4c16-a316-a3dfdfecd4a8.png">

Now you can run the test!

# API

## `useClient<T>()`

```ts
const useClient = <D extends BaseDatabase>() => ReturnType<typeof createClient<D>>;
```
Returns the Supabase client.

## `useDatabase<T>(from)`
```ts
const useDatabase = <D extends BaseDatabase = any>(from: TableKey<D>, options: UseDatabaseOptions) => {
  return { data, isLoading, insertData, updateData, upsertData, deleteData };
}
```
Returns 4 Supabase database methods: `insert`, `update`, `delete`, `upsert`. Returns 2 Variables: 

- `isLoading` - Variable that indicate whether data is being loaded.
- `data` - fetched data that Select a table using the 'key' value defined in the `from` parameter.

You can use filtering in some database methods. For example, to delete data when a specific ID matches:
```tsx
import { useDatabase } from "@limitkr/supabase-hooks";

export default function Example() {
   const { deleteData } = useDatabase("posts");
   
   return (
     <button onClick={async () => await deleteData.eq("id", 1)}>Delete</button>
   )
}
```

> :warning: In the data fetch(`select`) method, filtering options will be added soon.

### `from: TableKey<D> | string`
The table name to operate on.
> :information_source: If you use a database type extracted from 'Supabase' into the generic type, you can get a better type hint.

### `options: UseDatabaseOptions`
```ts
interface UseDatabaseOptions {
  selectSingle?: boolean;
}
```
#### `selectSingle: boolean`
If `true`, one single object type is returned, not an array type. This is the same method as below.
```ts
await supabaseClient.from(/* from */).select().single();
```
