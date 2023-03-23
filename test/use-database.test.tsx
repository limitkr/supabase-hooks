/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import { createClient } from "@supabase/supabase-js";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";

import { SHProvider, useDatabase } from "../dist";
import { unstable_useDatabase } from "../dist/unstable";
import type { Database } from "./util";

describe("Testing use-database hook", () => {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  test("Testing insert data", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SHProvider supabaseClient={client}>{children}</SHProvider>
    );
    const { result } = renderHook(
      () => useDatabase<Database, "posts">("posts"),
      {
        wrapper,
      }
    );
    const { data } = await result.current
      .insertData("posts", { id: 1 })
      .select()
      .single();
    expect(data).toHaveProperty("id", 1);
  });

  test("Get data from use-database hook", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SHProvider supabaseClient={client}>{children}</SHProvider>
    );

    const { result } = renderHook(
      () => useDatabase<Database, "posts">("posts", { selectSingle: true }),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveProperty("id", 1);
  });

  test("Get data using filters", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SHProvider supabaseClient={client}>{children}</SHProvider>
    );

    const { result } = renderHook(
      () =>
        unstable_useDatabase<Database, "posts", "eq">("posts", {
          single: true,
          filter: { op: "eq", args: () => ["id", "2"] },
        }),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveProperty("id", 2);
  });

  test("Update data from use-database hook", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SHProvider supabaseClient={client}>{children}</SHProvider>
    );
    const { result } = renderHook(
      () => useDatabase<Database, "posts">("posts", { selectSingle: true }),
      {
        wrapper,
      }
    );
    const { data } = await result.current
      .updateData("posts", { id: 2 })
      .eq("id", 1)
      .select()
      .single();
    expect(data).toHaveProperty("id", 2);
  });

  test("Remove data from use-database hook", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SHProvider supabaseClient={client}>{children}</SHProvider>
    );
    const { result } = renderHook(
      () => useDatabase<Database, "posts">("posts", { selectSingle: true }),
      {
        wrapper,
      }
    );
    const { error } = await result.current.deleteData("posts").eq("id", 2);

    expect(error).toBe(null);
  });
});
