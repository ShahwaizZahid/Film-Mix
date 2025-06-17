"use client";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search as SearchImg, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchSchema, SearchFormValues } from "@/schemas/searchSchema";

interface SearchFormProps {
  onSubmit: SubmitHandler<SearchFormValues>;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  return (
    <FormProvider {...form}>
      <div className="mt-14 w-full flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center items-center w-full max-w-xl"
        >
          <div className="flex items-center w-full bg-white/80 dark:bg-black/60 border-2 border-transparent bg-clip-padding rounded-3xl shadow-xl backdrop-blur-md transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-400 hover:shadow-2xl px-4 py-2 gap-2">
            <Home className="text-purple-500 dark:text-pink-400 mr-2" />
            <Input
              className="flex-1 text-md bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:outline-none placeholder:text-muted-foreground"
              placeholder="Search movies, actors, genres..."
              {...form.register("search")}
              autoComplete="off"
            />

            <button
              type="submit"
              className="ml-2 p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-110 transition-transform shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              aria-label="Search"
            >
              <SearchImg className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
