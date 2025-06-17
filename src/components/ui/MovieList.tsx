/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./movieCard";
import { SkeletonMovieCard } from "./movieCardSkelton";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieTypes } from "@/hooks/DataTypes";

export default function MoviesList() {
  const observerElem = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<MovieTypes[]>([]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(`/api/movies`, {
        params: { page: pageParam, limit: 10 },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length === 0) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const newMovies = data.pages.flatMap((page) => page.data);

      // Deduplicate based on _id
      setMovies((prevMovies) => {
        const movieIds = new Set(prevMovies.map((movie) => movie._id));
        return [
          ...prevMovies,
          ...newMovies.filter((movie) => !movieIds.has(movie._id)),
        ];
      });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (observerElem.current && hasNextPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
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

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-lg font-semibold text-red-500">
        Error occurred while fetching movies.
      </div>
    );
  }

  return (
    <>
      <div className="w-full px-2 md:px-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-8 place-items-center mt-12">
          {(isLoading && movies.length === 0) || isFetchingNextPage
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonMovieCard key={index} />
              ))
            : movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
        </div>
      </div>
      <div
        ref={observerElem}
        style={{ height: 1 }}
        className="text-white dark:text-black"
      >
        {/* Infinite scroll trigger */}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-8">
          <span className="animate-pulse text-pink-500 font-semibold text-lg">
            Loading more movies...
          </span>
        </div>
      )}
      {!hasNextPage && movies.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <span className="text-muted-foreground text-sm">
            You’ve reached the end of the list.
          </span>
        </div>
      )}
    </>
  );
}
