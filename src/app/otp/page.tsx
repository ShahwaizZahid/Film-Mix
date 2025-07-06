"use client";

import React, { Suspense } from "react";
import { InputOTPForm } from "@/components/ui/otp";
export default function page() {
  return (
    <>
      <Suspense fallback={<div>Loading OTP...</div>}>
        <InputOTPForm></InputOTPForm>
      </Suspense>
    </>
  );
}
