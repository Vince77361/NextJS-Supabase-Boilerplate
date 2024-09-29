"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

// comment: 일단 땜빵용으로 Auth 컴포넌트를 사용했습니다. 이 컴포넌트는 기능이 부족하니 나중에 따로 모달 만들어서 채워 놓는게 좋습니다.

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const { isOpen, onClose } = useAuthModal();
  const { user } = useUser();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      toast(`Welcome, ${user.email}!`);
      onClose();
    }
  }, [user, onClose]);
  return (
    <Modal title="Please Log In" isOpen={isOpen} onChange={onChange}>
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "github"]}
      />
    </Modal>
  );
};

export default AuthModal;
