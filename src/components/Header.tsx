"use client";

import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoginModalStore from "@/lib/store/useLoginModal";

const Header = () => {
  const { user } = useUser();
  const { onOpen } = LoginModalStore();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error("Error Logging Out:", error);
    }
    toast.success("Successfully Logged Out!");
    router.push("/");
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
