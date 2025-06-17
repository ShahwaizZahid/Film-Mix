import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SignupForm } from "@/components/ui/signup";
export default function page() {
  return (
    <>
      <div className="relative">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/70 dark:bg-black/60 shadow-md border border-border text-foreground hover:bg-accent/60 transition z-20"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <SignupForm />
      </div>
    </>
  );
}
