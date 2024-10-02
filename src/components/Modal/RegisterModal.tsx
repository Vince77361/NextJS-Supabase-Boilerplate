"use client";

import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import RegisterModalStore from "@/lib/store/RegisterModalStore";
import LoginModalStore from "@/lib/store/LoginModalStore";

const RegisterModal = () => {
  const supabaseClient = useSupabaseClient();
  const { isOpen: isRegisterModalOpen, onClose: onRegisterModalClose } =
    RegisterModalStore();
  const { onOpen: onLoginModalOpen } = LoginModalStore();
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

    if (
      !values.username ||
      !values.email ||
      !values.password ||
      !values.confirm
    ) {
      toast.error("Missing Fields");
    }

    const { data: AllUsers } = await supabaseClient // 동일한 유저네임이 이미 존재하는지 확인
      .from("users")
      .select("*");

    if (AllUsers?.some((user) => user.username === values.username)) {
      toast.error("Username already exists.");
      return;
    }

    if (AllUsers?.some((user) => user.email === values.email)) {
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

    const { data: userData, error: InsertError } = await supabaseClient // 유저 정보를 db에 저장
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
            <Input {...register("username")} placeholder="username" />
            <Input {...register("email")} placeholder="email" />
            <Input
              type="password"
              {...register("password")}
              placeholder="password"
            />
            <Input
              type="password"
              {...register("confirm")}
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
