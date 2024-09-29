"use client";

import { Database } from "@/db.types";
import { FC, ReactNode, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
  children: ReactNode;
}

const SupabaseProvider: FC<Props> = ({ children }) => {
  const [SupabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );
  return (
    <SessionContextProvider supabaseClient={SupabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
