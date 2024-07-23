import React from "react";
import { Badge } from "./badge";
type MovieCardProps = {
  title: string;
  year: number;
  poster: string;
  imdbRating: number;
};

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  poster,
  imdbRating,
}) => {
  return (
    <div className="max-w-[300px] rounded-xl overflow-hidden shadow-lg border-2 border-black my-8 dark:border-white relative">
      <Badge className="absolute right-0 bg-pink-400 my-1 mx-1 ">hello</Badge>
      <img
        className="w-full"
        src={
          "	https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        }
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Title: {title}</div>
        <p className="text-base">Released: {year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
