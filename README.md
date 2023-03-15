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

```ts
process.env.SUPABASE_URL = /* Your Supabase URL */
process.env.SUPABASE_ANON_KEY = /* Your Supabase Key */
```

Now you can run the test!

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
