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
    console.log("Selected movie:", movie);
  };

  return (
    <div
      className="max-w-[300px] rounded-xl overflow-hidden shadow-lg border-2 border-black my-4 dark:border-white relative "
      onClick={() => {
        toast.loading("wait");
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
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg";
        }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.Title}</div>
        <p className="text-base">Released: {movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
