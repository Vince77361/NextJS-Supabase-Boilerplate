"use client";

import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import Button from "../Button";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  const supabaseClient = useSupabaseClient();
  const { isOpen: isRegisterModalOpen, onClose: onRegisterModalClose } =
    useRegisterModal();
  const { onOpen: onLoginModalOpen } = useLoginModal();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "", // 비밀번호 확인
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      onRegisterModalClose();
    }
  };

  const ModalChange = () => {
    onRegisterModalClose();
    onLoginModalOpen();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    if (values.password !== values.confirm) {
      toast.error("Please check your password.");
      return;
    }

    const { data: usernameExists } = await supabaseClient
      .from("users")
      .select("*")
      .eq("username", values.username)
      .single();
    if (usernameExists) {
      toast.error("Username already exists.");
      return;
    }

    const { data: emailExists } = await supabaseClient
      .from("users")
      .select("*")
      .eq("email", values.email)
      .single();
    if (emailExists) {
      toast.error("Email already exists.");
      return;
    }

    const { error: signUpError } = await supabaseClient.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (signUpError) {
      console.error("Error Signing Up: ", signUpError);
      return;
    }

    const { data: userData, error: InsertError } = await supabaseClient
      .from("users")
      .insert({
        email: values.email,
        username: values.username,
      });
    if (InsertError) {
      console.error("Error Inserting User", InsertError);
      return;
    }
    console.log(userData);
    toast.success("Successfully Registered!");
    reset();
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      toast(`Welcome, ${user.email}!`);
      onRegisterModalClose();
    }
  }, [user, onRegisterModalClose]);
  return (
    <Modal
      title="Please Register"
      isOpen={isRegisterModalOpen}
      onChange={onChange}
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-2">
            <Input
              {...register("username", { required: true })}
              placeholder="username"
            />
            <Input
              {...register("email", { required: true })}
              placeholder="email"
            />
            <Input
              type="password"
              {...register("password", { required: true })}
              placeholder="password"
            />
            <Input
              type="password"
              {...register("confirm", { required: true })}
              placeholder="password confirm"
            />
            <Button type="submit">Register</Button>
            <Button onClick={ModalChange} secondary>
              Log In
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
