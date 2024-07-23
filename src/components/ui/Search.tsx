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
import MovieCard from "./movieCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formSchema, FormValues } from "@/schemas/searchSchema";
import { SkeletonMovieCard } from "./movieCardSkelton";
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
    <>
      <div className="flex flex-col-reverse w-full md:flex-row justify-center md:space-x-10 mt-14 items-center">
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
                    <div className="flex justify-center items-center border-2 border-black dark:border-white rounded-3xl px-3 ">
                      <Input
                        className="text-md ring-offset-none border-none focus:outline-none    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 "
                        placeholder="Search"
                        {...field}
                      />
                      <SearchImg />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </FormProvider>

        <div className="w-full flex justify-end mb-10 md:w-fit md:justify-center md:my-0">
          <Select>
            <SelectTrigger className="w-[180px] my-0  border-2 border-black dark:border-white mr-10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center mt-12 ">
        <SkeletonMovieCard></SkeletonMovieCard>
        <SkeletonMovieCard></SkeletonMovieCard>
        <SkeletonMovieCard></SkeletonMovieCard>
        <SkeletonMovieCard></SkeletonMovieCard>
        <SkeletonMovieCard></SkeletonMovieCard>
        <SkeletonMovieCard></SkeletonMovieCard>
        <SkeletonMovieCard></SkeletonMovieCard>
        <SkeletonMovieCard></SkeletonMovieCard>
      </div>
    </>
  );
}
