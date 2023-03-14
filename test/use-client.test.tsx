/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { render } from "@testing-library/react";
import * as process from "process";
import type { FC } from "react";

import { SHProvider, useClient } from "../src";

const TestComponent: FC = () => {
  const client = useClient();

  return <pre>{JSON.stringify(client)}</pre>;
};

describe("Testing use-client hook", () => {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  test("Get supabase client object from useClient hook", () => {
    const { container } = render(
      <SHProvider supabaseClient={client}>
        <TestComponent />
      </SHProvider>
    );

    const clientObject = JSON.parse(
      container.getElementsByTagName("pre").item(0)?.innerHTML as string
    );

    expect(clientObject).toHaveProperty("supabaseUrl");
  });
});
