/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Badge } from "./badge";
import { MovieTypes } from "@/hooks/DataTypes";
import useSearch from "@/hooks/useSearch";
import toast from "react-hot-toast";

type MovieCardProps = {
  movie: MovieTypes;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const searchMutation = useSearch();

  const handleCardClick = async (movie: MovieTypes) => {
    const res = await searchMutation.mutateAsync({ title: movie.Title });
  };

  return (
    <div
      className="group max-w-[320px] rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 dark:border-white/30 my-6 relative bg-white/70 dark:bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-pink-400/60 hover:bg-gradient-to-br hover:from-purple-400/30 hover:to-pink-400/20 cursor-pointer"
      onClick={() => {
        toast.loading("Please wait...", { duration: 1000 });
        handleCardClick(movie);
      }}
    >
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg bg-gradient-to-br from-purple-400/40 via-pink-400/30 to-yellow-300/20 z-10" />
      <Badge className="absolute right-0 top-0 bg-pink-400 my-2 mx-2 z-20 shadow-md">
        IMDB: {movie.imdbRating}
      </Badge>
      <img
        className="w-full h-60 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
        src={movie.Poster}
        alt={movie.Title}
        onError={(e) => {
          e.currentTarget.src =
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg";
        }}
      />
      <div className="px-5 py-4 relative z-20">
        <div className="font-bold text-xl mb-1 text-purple-700 dark:text-pink-400 truncate transition-colors duration-300 group-hover:text-pink-500">
          {movie.Title}{" "}
          <span className="text-xs text-gray-400 ml-2">({movie.Year})</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold shadow">
            {movie.Genre}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            {movie.Country}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
            {movie.Rated}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {movie.Plot}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            Director: <span className="font-semibold">{movie.Director}</span>
          </span>
          <span>
            Runtime: <span className="font-semibold">{movie.Runtime}</span>
          </span>
        </div>
      </div>
      {/* Animated bottom bar on hover */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};

export default MovieCard;
