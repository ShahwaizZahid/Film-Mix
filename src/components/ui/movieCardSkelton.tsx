"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonMovieCard() {
  return (
    <div className="flex flex-col space-y-3 border-2 relative rounded-xl p-2  my-6">
      <Skeleton className="h-[350px] w-[300px] " />
      <Skeleton className="h-5 w-12 right-0 mr-8 bg-pink-200 rounded-xl absolute" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
