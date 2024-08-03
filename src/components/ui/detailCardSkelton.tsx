"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDetailMovieCard() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-8 w-3/4 bg-gray-600 rounded-lg mb-4" />

        <div className="flex flex-col md:flex-row">
          {/* Poster Placeholder */}
          <Skeleton className="w-full md:w-1/3 h-[400px] bg-gray-600 rounded-lg mb-4 md:mb-0 md:mr-4" />

          {/* Details Placeholder */}
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Year */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Rated */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Released */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Runtime */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Genre */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Director */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Writer */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Actors */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Plot */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Language */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Country */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* Awards */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* IMDB Rating */}
            <Skeleton className="h-6 w-1/2 bg-gray-600 rounded-lg" />{" "}
            {/* IMDB Votes */}
          </div>
        </div>
      </div>
    </div>
  );
}
