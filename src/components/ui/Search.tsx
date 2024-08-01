"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Search as SearchImg } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchForm({ onSubmit }: any) {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <div className="mt-14 w-screen">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex justify-center items-center"
        >
          <div className="flex justify-center items-center border-2 border-black dark:border-white rounded-3xl px-3">
            <Input
              className="text-md ring-offset-none border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0"
              placeholder="Search"
              {...form.register("search")}
            />
            <button type="submit">
              <SearchImg />
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
