import React from "react";
import { Badge } from "./badge";
import { MovieTypes } from "@/hooks/DataTypes";

type MovieCardProps = {
  movie: MovieTypes;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const handleCardClick = (movie: MovieTypes) => {
    console.log("Selected movie:", movie);
  };
  return (
    <div
      className="max-w-[300px] rounded-xl overflow-hidden shadow-lg border-2 border-black my-8 dark:border-white relative"
      onClick={() => {
        handleCardClick(movie);
      }}
    >
      <Badge className="absolute right-0 bg-pink-400 my-1 mx-1">
        IMDB: {movie.imdbRating}
      </Badge>
      <img
        className="w-full"
        src={movie.Poster}
        alt={movie.Title}
        onError={(e) => {
          e.currentTarget.src =
            "	https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg";
        }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Title: {movie.Title}</div>
        <p className="text-base">Released: {movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
