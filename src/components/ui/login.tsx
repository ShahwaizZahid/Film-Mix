"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/Auth";
import { LoginFormData } from "@/hooks/DataTypes";
import { formSchema, FormValues } from "@/schemas/loginSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel, Users, Sparkles, Film, Star } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import React from "react";

export default function LoginPage() {
  return (
    <>
      <div className="bg-background text-foreground relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">
        {/* Decorative Bubbles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl animate-float-slow"></div>
        </div>
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Film className="absolute top-32 left-12 text-muted-foreground w-8 h-8 animate-bounce" />
          <Star className="absolute top-48 right-16 text-yellow-400/40 w-6 h-6 animate-pulse" />
          <Sparkles className="absolute top-60 left-1/3 text-purple-400/30 w-7 h-7 animate-spin" />
          <Users className="absolute bottom-32 right-1/4 text-green-400/30 w-8 h-8 animate-bounce" />
        </div>
        {/* Login Card */}
        <div className="w-[90%] md:w-[30%] py-8 px-8 bg-white/80 dark:bg-black/70 border-2 border-white/30 rounded-3xl shadow-2xl backdrop-blur-md z-10 transition-all duration-500">
          <div className="text-center text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
            Login to Filmix
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export function LoginForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="text-md"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="text-md"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold border border-white/30 shadow-lg hover:scale-105 transition-transform"
          >
            {loginMutation.isPending ? (
              <LoaderPinwheel className="animate-spin w-5 h-5" />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>

      <div className="text-center mt-6 text-muted-foreground">
        Don’t have an account?{" "}
        <Link
          href="/signup"
          className="text-pink-600 dark:text-pink-400 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </div>
    </FormProvider>
  );
}

function useLogin() {
  const { setUser } = useAuthContext();
  const router = useRouter();

  return useMutation<any, AxiosError, LoginFormData>({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      const res = await axios.post("/api/users/login", { email, password });
      return res.data;
    },
    onSuccess: (data) => {
      router.push("/movies");
      toast.success("Logged in successfully");
      setUser(data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during login";
      toast.error(errorMessage);
    },
  });
}
