"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { SignupFormData } from "@/hooks/DataTypes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
import { formSchema, FormValues } from "@/schemas/signupSchema";

export function SignupForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const signupMutation = useSignup();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    console.log(data);
    const res = await signupMutation.mutateAsync(data);
    console.log("measss", res);
    toast.success(res);
  };

  return (
    <>
      <div className=" py-4 px-6 md:w-[30%] w-[90%] border-2 border-white rounded-3xl">
        <div className="items-center py-3 flex justify-center text-3xl font-bold">
          Signup
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text-md"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text-md"
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
                      className="text-black text-md"
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
                disabled={signupMutation.isPending || signupMutation.isSuccess}
                type="submit"
                className="border-2 border-white hover:bg-white hover:text-black"
              >
                {!signupMutation.isPending ? "Signup" : <div>Loading...</div>}
              </Button>
            </div>
          </form>
          <div className=" my-6">
            if already have account?{" "}
            <span className="text-blue-600 border-b-2 border-b-blue-600 font-semibold ">
              <Link href="/login">login</Link>
            </span>
          </div>
        </FormProvider>
      </div>
    </>
  );
}

function useSignup() {
  const router = useRouter();
  return useMutation<any, AxiosError, SignupFormData>({
    mutationKey: ["signup"],
    mutationFn: async (data) => {
      const res = await axios.post("/api/users/signup", data);
      console.log(res.data.message);
      return res.data.message;
    },
    onSuccess: (_, { email }) => {
      console.log("success");
      router.push(`/otp?email=${encodeURIComponent(email)}`);
    },
    onError: (error) => {
      console.error("Signup failed: ", error);

      // Type assertion for error response
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during signup";

      toast.error(errorMessage);
    },
  });
}
