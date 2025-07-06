/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./movieCard";
import { SkeletonMovieCard } from "./movieCardSkelton";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieTypes, MoviesApiResponse } from "@/hooks/DataTypes";

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
  } = useInfiniteQuery<MoviesApiResponse>({
    queryKey: ["movies"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(`/api/movies`, {
        params: { page: pageParam, limit: 10 },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      // Use the pagination metadata from the API response
      if (!lastPage.pagination?.hasNextPage) {
        return undefined;
      }
      return lastPage.pagination.nextPage;
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
    if (observerElem.current && hasNextPage && !isFetchingNextPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px",
        }
      );

      observer.observe(observerElem.current);

      return () => {
        if (observerElem.current) observer.unobserve(observerElem.current);
      };
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 place-items-stretch justify-items-center mt-12">
          {/* Show existing movies */}
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}

          {/* Show skeleton cards when loading initial data or fetching next page */}
          {isLoading &&
            movies.length === 0 &&
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonMovieCard key={`skeleton-${index}`} />
            ))}

          {/* Show additional skeleton cards when fetching next page */}
          {isFetchingNextPage &&
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonMovieCard key={`skeleton-next-${index}`} />
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
