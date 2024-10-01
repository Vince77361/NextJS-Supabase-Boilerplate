"use client";

import { useUser } from "@/hooks/useUser";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const Profile = () => {
  const { user, userDetails, fetchUserDetails, isLoading } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      username: userDetails?.username,
      bio: userDetails?.bio,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { data: AllUsers, error: allUserError } = await supabaseClient
      .from("users")
      .select("username");
    if (allUserError) {
      console.error(
        "Failed to fetch Users to validate new username: ",
        allUserError
      );
      return;
    }
    if (values.username === "") {
      toast.error("Make sure your name not blank");
    } else if (
      AllUsers.some((user) => user.username === values.username) &&
      values.username !== userDetails?.username
    ) {
      // 이미 동일한 유저네임이 존재하는지 확인

      toast.error("Username is already in use.");
    }

    const { data: newUsername, error: newUsernameError } = await supabaseClient
      .from("users")
      .upsert({
        username: values.username,
        email: userDetails?.email,
        bio: values.bio,
      });
    if (newUsernameError) {
      console.error("Something went wrong: ", newUsernameError);
      return;
    }
    console.log(newUsername);
    await fetchUserDetails();
    toast.success("Successfully saved changes!");
    router.push("/");
  };

  useEffect(() => {
    if (userDetails) {
      reset({
        username: userDetails?.username,
        bio: userDetails?.bio,
      });
    }

    if (!user && !isLoading) {
      console.log(user);
      toast.error("Please Log in");
      router.push("/");
      return;
    }
  }, [user, userDetails, reset, isLoading, router]);

  return (
    <div className="w-1/2 h-fit bg-neutral-800 p-10 rounded-2xl grid grid-cols-2 grid-rows-1">
      <h3 className="text-3xl font-bold mt-2">Profile</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="text-neutral-300/90">
              username
            </label>
            <Input
              id="username"
              {...register("username", { required: true })}
              className="h-10 font-normal mt-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="text-neutral-300/90">
              email
            </label>
            <Input
              id="email"
              value={userDetails?.email}
              disabled
              className="h-10 font-normal mt-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="bio" className="text-neutral-300/90">
              bio
            </label>
            <Input
              id="bio"
              {...register("bio", { required: true })}
              className="h-10 font-normal mt-1"
            />
          </div>
          <div className="flex justify-end mt-8 gap-x-4">
            <Button
              onClick={() => router.push("/")}
              className="border-none py-1 px-4"
              secondary
            >
              Cancel
            </Button>
            <Button type="submit" className="border py-1 px-4">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
