"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonMovieCard() {
  return (
    <div className="w-full max-w-[320px] min-h-[520px] h-full rounded-2xl overflow-hidden border-2 border-white/20 dark:border-white/30 my-6 relative bg-white/70 dark:bg-black/60 backdrop-blur-md flex flex-col">
      {/* Badge skeleton */}
      <Skeleton className="h-6 w-16 absolute right-2 top-2 z-10 bg-pink-200 rounded-xl" />

      {/* Image skeleton */}
      <div className="relative flex-shrink-0">
        <Skeleton className="h-60 w-full rounded-t-2xl" />
      </div>

      {/* Content skeleton */}
      <div className="px-5 py-4 flex-grow flex flex-col justify-between space-y-3">
        <div className="flex-grow space-y-3">
          {/* Title skeleton */}
          <div className="min-h-[3rem] space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Tags skeleton */}
          <div className="min-h-[2rem] flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-6 w-10 rounded-full" />
          </div>

          {/* Plot skeleton */}
          <div className="min-h-[4.5rem] space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center mt-auto">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}
