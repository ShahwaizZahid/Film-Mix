"use client";
import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { USERTypes } from "@/hooks/DataTypes";

type AuthContextType = {
  user: USERTypes;
  setUser: (user: USERTypes) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>({
    message: null,
    userer: null,
  });

  const { isLoading } = useQuery<USERTypes, AxiosError>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.post("/api/users/me");

      console.log(response.data.user);
      if (response.data)
        setUser({ message: response.data.message, user: response.data.user });

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <span className="loading loading-bars loading-xs">
          loading.............
        </span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  const value: AuthContextType = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
