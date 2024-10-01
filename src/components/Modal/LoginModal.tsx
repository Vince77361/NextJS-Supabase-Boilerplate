"use client";

import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import LoginModalStore from "@/lib/store/useLoginModal";
import RegisterModalStore from "@/lib/store/useRegisterModal";

const LoginModal = () => {
  const supabaseClient = useSupabaseClient();
  const { isOpen: isLoginModalOpen, onClose: onLoginModalClose } =
    LoginModalStore();
  const { onOpen: onRegisterModalOpen } = RegisterModalStore();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      onLoginModalClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    if (!values.email || !values.password) {
      toast.error("Missing Fields");
      return;
    }

    const { error: signUpError } = await supabaseClient.auth.signInWithPassword(
      {
        email: values.email,
        password: values.password,
      }
    );
    if (signUpError) {
      console.error("Error Signing Up: ", signUpError);
      return;
    }

    toast.success("Successfully Logged In!");
    reset();
  };

  const ModalChange = () => {
    onLoginModalClose();
    onRegisterModalOpen();
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      toast(`Welcome, ${user.email}!`);
      onLoginModalClose();
    }
  }, [user, onLoginModalClose]);
  return (
    <Modal title="Please Log In" isOpen={isLoginModalOpen} onChange={onChange}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-2">
            <Input {...register("email")} placeholder="email" />
            <Input
              type="password"
              {...register("password")}
              placeholder="password"
            />
            <Button type="submit">Log In</Button>
            <Button onClick={ModalChange} secondary>
              Register
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
