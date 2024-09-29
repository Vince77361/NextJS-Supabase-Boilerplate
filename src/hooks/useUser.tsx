import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupabaseUser,
} from "@supabase/auth-helpers-react";

// comment: 추후 개선 예정.

export const UserContext = createContext<any>(undefined);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser } = useSessionContext();
  const user = useSupabaseUser();
  const accessToken = session?.access_token ?? null;

  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    setUserDetails({
      id: session?.user.id,
      email: session?.user.email,
    });
  }, [session]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser,
  };
  console.log(value);

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserContextProvider");
  }

  return context;
};
