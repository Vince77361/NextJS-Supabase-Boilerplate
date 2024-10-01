"use client";

import { useUser } from "@/hooks/useUser";
import Button from "../Button";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { userDetails } = useUser();
  const router = useRouter();

  return (
    <div className="w-full h-fit bg-neutral-700 p-10 rounded-2xl">
      <h1 className="text-4xl font-bold">{userDetails?.username}</h1>
      <p className="text-xl">{userDetails?.email}</p>
      <p>{userDetails?.bio}</p>
      <Button
        onClick={() => router.push(`profile/edit/${userDetails.id}`)}
        secondary
      >
        Edit
      </Button>
    </div>
  );
};

export default Profile;
