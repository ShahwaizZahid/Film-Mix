"use client";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
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
  const observerElem = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `/api/movies?page=${pageParam}&limit=10`
      );
      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length === 0) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (observerElem.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );

      observer.observe(observerElem.current);

      return () => {
        if (observerElem.current) observer.unobserve(observerElem.current);
      };
    }
  }, [fetchNextPage, hasNextPage]);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    console.log(formData);
  };

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

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
                        className="text-md ring-offset-none border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 "
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
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center mt-12">
        {isLoading && !data
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonMovieCard key={index} />
            ))
          : data?.pages.map((page: any) =>
              page.data.map((movie: MovieTypes) => (
                <MovieCard key={movie._id} movie={movie} />
              ))
            )}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center mt-12">
        {(isLoading || isFetchingNextPage) &&
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonMovieCard key={index} />
          ))}
      </div>
      <div ref={observerElem} style={{ height: 1 }}></div>
    </>
  );
}
