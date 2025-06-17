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
      <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-purple-100/60 via-pink-100/60 to-yellow-100/40 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-colors duration-500 relative overflow-hidden">
        {/* Decorative Bubbles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl animate-float-slow"></div>
        </div>
        <LoaderPinwheel className="animate-spin w-28 h-28 text-purple-500 z-10" />
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
