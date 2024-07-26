"use client";
import React, { useEffect, useRef } from "react";
import MovieCard from "./movieCard";
import { SkeletonMovieCard } from "./movieCardSkelton";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export default function MoviesList({ search }: any) {
  const observerElem = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", search],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `/api/movies?page=${pageParam}&limit=10&search=${search || ""}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length === 0) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });

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
    return <div>Error occurred</div>;
  }

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center mt-12">
        {(isLoading && !data) || isFetchingNextPage
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonMovieCard key={index} />
            ))
          : data?.pages.map((page) =>
              page.data.map((movie: any) => (
                <MovieCard key={movie._id} movie={movie} />
              ))
            )}
      </div>
      <div
        ref={observerElem}
        style={{ height: 1 }}
        className=" text-white dark:text-black"
      >
        .
      </div>
    </>
  );
}
