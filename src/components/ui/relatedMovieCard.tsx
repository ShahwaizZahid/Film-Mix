// components/ui/RelatedMovieCard.tsx
import React from "react";
import { Badge } from "./badge"; // Ensure the Badge component is correctly imported

export default function RelatedMovieCard() {
  return (
    <div className="p-3 w-80 h-fit">
      <div className="card bg-base-100 w-full h-full relative shadow-xl transform hover:scale-105 duration-200 transition-transform dark:border dark:bg-slate-900 dark:text-white">
        <figure className="relative w-full h-full">
          <Badge className="absolute z-40 right-0 bg-pink-400 my-1 mx-1">
            IMDB: 9.0
          </Badge>
          <img
            className="w-full h-full object-cover"
            src="https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
            alt="Movie Poster"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg font-bold mb-2 truncate">
            {/* Replace with actual movie title */}
            Example Movie Title
          </h2>
          <div className="card-actions flex justify-between items-center mt-4">
            <div className="badge badge-outline">$ Price</div>
            {/* Add other actions or elements as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
