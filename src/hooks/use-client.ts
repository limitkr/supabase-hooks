import { createClient } from "@supabase/supabase-js";
import { useContext } from "react";

import { Context } from "../Provider";

type CreateClientReturnType<T> = ReturnType<typeof createClient<T>>;

const useClient = <D>(): CreateClientReturnType<D> => {
  const supabaseClient = useContext(Context);
  if (!supabaseClient)
    throw new Error("useClient must be used withing a SHProvider!");
  return supabaseClient as CreateClientReturnType<D>;
};

export default useClient;
