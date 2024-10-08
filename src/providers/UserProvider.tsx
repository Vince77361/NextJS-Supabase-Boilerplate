"use client";

import { UserContextProvider } from "@/hooks/useUser";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UserProvider: FC<Props> = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
