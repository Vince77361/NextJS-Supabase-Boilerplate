"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

// 임시로 만듬

export default function Page() {
  const supabaseClient = useSupabaseClient();
  const [r, s] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabaseClient.from("users").select("username");
      s(data as any[]);
    };
    fetchData();
  }, []);

  return (
    <>
      {r?.map((key) => (
        <div key={key.username}>{key.username}</div>
      ))}
    </>
  );
}
