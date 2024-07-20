"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormSchema } from "@/schemas/otpSchema";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { OTPFormData } from "@/hooks/DataTypes";
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

  //   const OtpAgainMutation = useOAgainOtpMutation();

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
    console.log(res);
    toast.success(res);
  }

  async function handleResendOTP() {
    if (!email) {
      return toast.error("you can't resend code");
    }

    setTimer(60);
    setIsResendEnabled(false);
    console.log("email", email);
    const res = await OtpAgainMutation.mutateAsync({ email: email });
    console.log("res", res);
    console.log("Resend OTP");
  }

  return (
    <>
      <div className="mt-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="my-8 text-center font-bold text-5xl ">
            OTP Verification
          </h1>
          <p className="my-4 font-semibold md:w-[60%] w-[80%]">
            Please enter the one-time password sent to your email:{" "}
            <span className="text-pink-500">{email}</span>
          </p>
        </div>
        <div className="flex   justify-center items-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-6  "
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password send to your email</FormLabel>
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
              <div className="mt-4  text-end">
                <Button onClick={handleResendOTP} disabled={!isResendEnabled}>
                  {isResendEnabled ? "Resend OTP" : `Resend OTP in ${timer}s`}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="items-center text-center flex justify-center my-10">
          <p className="md:w-[60%] w-[80%] ">
            Upon initiating account verification, a 6-digit verification code is
            automatically generated and sent to the contact information
            associated with your {}
            <span className="text-pink-500 font-bold">Email:{email}</span> .
            Please enter this code in the provided field below to complete the
            verification process. This step ensures the security and integrity
            of your account information.
          </p>
        </div>
      </div>
    </>
  );
}

function useOTPVerifyMutation() {
  // const navigate = useNavigate();

  return useMutation<any, AxiosError, OTPFormData>({
    mutationKey: ["otp"],
    mutationFn: async (data) => {
      const res = await axios.post("/api/users/verifyemail", data);
      console.log("res", res.data);
      return res.data.message;
    },
    onSuccess: (_, { email }) => {
      console.log("successfully verify", email);
    },
    onError: (error) => {
      console.error("OTP verification failed: ", error.message);

      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during OTP verification";

      toast.error(errorMessage);
    },
  });
}

function useAgainOtpMutation() {
  const router = useRouter();
  return useMutation<any, AxiosError, { email: string }>({
    mutationKey: ["otp"],
    mutationFn: async (data) => {
      const res = await axios.post("/api/users/resendcode", data);
      console.log(res.data);
    },
    onSuccess: () => {
      toast.success("OTP sent again successfully!");
      router.push(`/login`);
    },
    onError: (error) => {
      console.error("Sending OTP again failed: ", error);

      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred while sending OTP again";

      toast.error(errorMessage);
    },
  });
}
