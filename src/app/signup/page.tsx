import React from "react";
import { SignupForm } from "@/components/ui/signup";
export default function page() {
  return (
    <>
      <div className="min-h-screen min-w-screen flex justify-center items-center bg-slate-900">
        <SignupForm></SignupForm>
      </div>
    </>
  );
}
