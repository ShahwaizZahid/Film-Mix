"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { USERTypes } from "@/hooks/DataTypes";

// Define the shape of the state object
interface UserState {
  message: string | null;
  user: USERTypes | null;
}

// Define the AuthContext type
type AuthContextType = {
  user: UserState;
  setUser: (user: UserState) => void;
  isLoading: boolean;
};

// Create the AuthContext with default value null
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use AuthContext
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}

// AuthContextProvider component
export function AuthContextProvider({ children }: { children: ReactNode }) {
  // Initialize state with the proper type
  const [user, setUser] = useState<UserState>({
    message: null,
    user: null,
  });

  // Fetch user data with optimized settings
  const { isLoading } = useQuery<UserState, AxiosError>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.post("/api/users/me");
        const data: UserState = {
          message: response.data.message || null,
          user: response.data.user || null,
        };

        setUser(data);
        return data;
      } catch (error) {
        // If user is not authenticated, don't treat it as an error
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          const data: UserState = { message: null, user: null };
          setUser(data);
          return data;
        }
        throw error;
      }
    },
    retry: 1, // Only retry once
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
  });

  // Provide context value - no loading screen, let individual components handle loading
  const value: AuthContextType = {
    user,
    setUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
