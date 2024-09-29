"use client";

import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

const Header = () => {
  const { user } = useUser();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const onLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error("Error Logging Out:", error);
    }
    toast.success("Successfully Logged Out!");
    console.log(user);
    onOpen();
  };
  const onLogin = () => {
    onOpen();
  };
  return (
    <div className="w-full h-24 flex justify-between items-center px-10 bg-black border-b-2 border-white">
      <Link href="/" className="font-bold text-white text-3xl">
        헤더
      </Link>
      {user ? (
        <Button onClick={onLogout} secondary>
          로그아웃
        </Button>
      ) : (
        <Button onClick={onLogin}>로그인</Button>
      )}
    </div>
  );
};

export default Header;
