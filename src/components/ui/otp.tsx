/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { FormSchema } from "@/schemas/otpSchema";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { OTPFormData } from "@/hooks/DataTypes";
import toast from "react-hot-toast";
import { LoaderPinwheel, Users, Sparkles, Film, Star } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  const OTPVerifyMutation = useOTPVerifyMutation();
  const OtpAgainMutation = useAgainOtpMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendEnabled(true);
      clearInterval(interval! as NodeJS.Timeout);
    }
    return () => clearInterval(interval as NodeJS.Timeout);
  }, [timer]);

  useEffect(() => {
    if (form.watch("pin").length === 6) {
      form.handleSubmit(onSubmit)();
    }
  }, [form.watch("pin")]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData: any = { token: data.pin, email: email };
    const res = await OTPVerifyMutation.mutateAsync(newData);
    toast.success(res);
  }

  async function handleResendOTP() {
    if (!email) {
      return toast.error("You can't resend code");
    }
    setTimer(60);
    setIsResendEnabled(false);
    await OtpAgainMutation.mutateAsync({ email: email });
  }

  return (
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
      {/* OTP Card */}
      <div className="w-[90%] md:w-[30%] py-8 px-8 bg-white/80 dark:bg-black/70 border-2 border-white/30 rounded-3xl shadow-2xl backdrop-blur-md z-10 transition-all duration-500">
        <h1 className="text-center font-bold text-4xl mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
          OTP Verification
        </h1>
        <p className="mb-6 font-semibold text-center">
          Please enter the one-time password sent to your email:{" "}
          <span className="text-pink-500">{email}</span>
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {OTPVerifyMutation.isPending || OtpAgainMutation.isPending ? (
              <div className="flex justify-center">
                <LoaderPinwheel className="animate-spin w-6 h-6" />
              </div>
            ) : (
              <div className="mt-4 text-end">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="disabled:text-gray-300 text-pink-600 font-semibold hover:underline"
                  disabled={!isResendEnabled}
                >
                  {isResendEnabled ? "Resend OTP" : `Resend OTP in ${timer}s`}
                </button>
              </div>
            )}
          </form>
        </Form>
        <div className="items-center text-center flex justify-center my-10">
          <p className="md:w-[90%] w-[98%] text-muted-foreground">
            A 6-digit verification code has been sent to your{" "}
            <span className="text-pink-500 font-bold">Email: {email}</span>.
            Please enter this code above to complete verification. This step
            ensures the security and integrity of your account.
          </p>
        </div>
      </div>
    </div>
  );
}

function useOTPVerifyMutation() {
  const router = useRouter();

  return useMutation<any, AxiosError, OTPFormData>({
    mutationKey: ["otp"],
    mutationFn: async (data) => {
      const res = await axios.post("/api/users/verifyemail", data);
      return res.data.message;
    },
    onSuccess: (_, { email }) => {
      router.push(`/login`);
    },
    onError: (error) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during OTP verification";
      toast.error(errorMessage);
    },
  });
}

function useAgainOtpMutation() {
  return useMutation<any, AxiosError, { email: string }>({
    mutationKey: ["otp"],
    mutationFn: async (data) => {
      const res = await axios.post("/api/users/resendcode", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("OTP sent again successfully!");
    },
    onError: (error) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred while sending OTP again";
      toast.error(errorMessage);
    },
  });
}
