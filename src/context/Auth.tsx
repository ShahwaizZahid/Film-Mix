"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { USERTypes } from "@/hooks/DataTypes";
import { LoaderPinwheel } from "lucide-react";
// Define the shape of the state object
interface UserState {
  message: string | null;
  user: USERTypes | null;
}

// Define the AuthContext type
type AuthContextType = {
  user: UserState;
  setUser: (user: UserState) => void;
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

  // Fetch user data
  const { isLoading } = useQuery<UserState, AxiosError>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.post("/api/users/me");
      const data: UserState = {
        message: response.data.message || null,
        user: response.data.user || null,
      };

      setUser(data);

      return data;
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <LoaderPinwheel className="animate-spin w-28 h-28" />
      </div>
    );
  }

  // Provide context value
  const value: AuthContextType = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
