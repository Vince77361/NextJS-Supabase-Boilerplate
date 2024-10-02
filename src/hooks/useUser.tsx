import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupabaseUser,
} from "@supabase/auth-helpers-react";

interface UserDetailsType {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export const UserContext = createContext<any>(undefined);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabaseClient,
  } = useSessionContext();
  const user = useSupabaseUser();
  const accessToken = session?.access_token ?? null;
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const GetUser = async () => {
    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", user?.id)
      .single();
    if (error) {
      console.error("Failed to get Profile: ", error);
      return null;
    }
    return { data };
  };
  const fetchUserDetails = async () => {
    try {
      const userDetailsResult = await GetUser();
      if (userDetailsResult?.data) {
        setUserDetails(userDetailsResult.data);
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    setIsLoadingData(true);
    if (!user) {
      setUserDetails(null);
    } else {
      fetchUserDetails();
    }
    setIsLoadingData(false);
  }, [user, isLoadingUser, isLoadingData]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData,
    fetchUserDetails,
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
