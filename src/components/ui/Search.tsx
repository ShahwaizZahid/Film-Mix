"use client";

import React from "react";
import { Search as SearchImg } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema, FormValues } from "@/schemas/searchSchema";

export default function Search() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex justify-center items-center"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center items-center">
                    <Input
                      className=" text-md"
                      placeholder="Search"
                      {...field}
                    />
                    <SearchImg></SearchImg>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </FormProvider>
    </div>
  );
}
