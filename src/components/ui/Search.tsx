"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search as SearchImg } from "lucide-react";
import { formSchema, FormValues } from "@/schemas/searchSchema";
import { MovieTypes } from "@/hooks/DataTypes";
import MovieCard from "./movieCard";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { SkeletonMovieCard } from "./movieCardSkelton";

export default function Search() {
  const [allData, setAllData] = useState<MovieTypes[] | null>(null);

  const { isLoading, isError, isSuccess, data } = useQuery<any, AxiosError>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await axios.get("/api/movies");
      return response.data;
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setAllData(data.data);
    }
  }, [isSuccess, data]);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    console.log(formData);
  };

  if (isError) {
    return <div>Error occurred</div>;
  }

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

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center mt-12">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonMovieCard key={index} />
          ))
        ) : allData && allData.length > 0 ? (
          allData.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <div>No data available</div>
        )}
      </div>
    </>
  );
}
