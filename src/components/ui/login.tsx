"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "@/hooks/DataTypes";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/Auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema, FormValues } from "@/schemas/loginSchema";
import { LoaderPinwheel } from "lucide-react";
export function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const res = await loginMutation.mutateAsync(data);
    toast.success(res.message);
  };

  return (
    <>
      <div className=" py-4 px-6 md:w-[30%] w-[90%]  border-2 border-black dark:border-white rounded-3xl">
        <div className="items-center py-3 flex justify-center text-3xl font-bold">
          Login
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-md"
                      type="email"
                      placeholder="Email"
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
                      className=" text-md"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center">
              <Button
                // disabled={signupMutation.isPending || signupMutation.isSuccess}
                type="submit"
                className="border-2 border-white hover:bg-white hover:text-black"
              >
                {!loginMutation.isPending ? (
                  "Login"
                ) : (
                  <LoaderPinwheel className="animate-spin" />
                )}
              </Button>
            </div>
          </form>
          <div className=" my-6">
            if you have not account?{" "}
            <span className="text-blue-600 border-b-2 border-b-blue-600 font-semibold ">
              <Link href="/signup">signup</Link>
            </span>
          </div>
        </FormProvider>
      </div>
    </>
  );
}

import { useRouter, useSearchParams } from "next/navigation";

function useLogin() {
  const { setUser } = useAuthContext()!;

  const router = useRouter();
  return useMutation<any, AxiosError, LoginFormData>({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      const res = await axios.post("/api/users/login", { email, password });
      return res.data;
    },
    onSuccess: (data) => {
      router.push(`/movies`);
      console.log("successfully set this user", data.user);
      setUser(data);
    },
    onError: (error) => {
      console.error("Login failed: ", error);

      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during login";
      toast.error(errorMessage);
    },
  });
}
