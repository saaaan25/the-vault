import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { Subscription, UserDetails } from "@/types";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
  theme: string | null;
  fullname: string | null;
  img: string | null;
  setTheme: (theme: string | null) => Promise<void>;
  setName: (fullname: string | null) => Promise<void>;
  setImg: (img: string | null) => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [fullname, setFullname] = useState<string | null>(null);
  const [img, setImg] = useState<string | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  const fetchUserDetails = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("theme, full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setTheme(data?.theme || null);
        setFullname(data?.full_name || null);
        setImg(data?.avatar_url || null);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching user details:", error.message);
        } else {
          console.error("Error fetching user details:", error);
        }
      }
    }
  };

  const updateUserTheme = async (newTheme: string | null) => {
    if (user) {
      try {
        const { error } = await supabase
          .from("users")
          .update({ theme: newTheme })
          .eq("id", user.id);

        if (error) {
          throw error;
        }

        setTheme(newTheme);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error updating user theme:", error.message);
        } else {
          console.error("Error updating user theme:", error);
        }
      }
    }
  };

  const updateUserName = async (newName: string | null) => {
    if (user) {
      try {
        const { error } = await supabase
          .from("users")
          .update({ full_name: newName })
          .eq("id", user.id);

        if (error) {
          throw error;
        }

        setFullname(newName);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error updating user name:", error.message);
        } else {
          console.error("Error updating user name:", error);
        }
      }
    }
  };

  const setNewImg = async (newImg: string | null) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from("users")
        .update({ avatar_url: newImg })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      setImg(newImg);
    } catch (error: any) {
      console.error("Error updating user image:", error.message);
      throw error; // Propagar el error para manejarlo donde se llama
    }
  };

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
      setTheme("bg-palette1-custom-color");
    }
    fetchUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
    theme,
    fullname,
    img,
    setTheme: updateUserTheme,
    setName: updateUserName,
    setImg: setNewImg,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }

  return context;
};
