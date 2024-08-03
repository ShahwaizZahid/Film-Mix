"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import "@/styles/globals.css";
import Slider from "react-slick";
import axios from "axios";
import { SkeletonDetailMovieCard } from "@/components/ui/detailCardSkelton";
import * as React from "react";
import MovieCard from "@/components/ui/movieCard"; // Ensure correct import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3.5,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const fetchMovieDetails = async (id: string) => {
  const res = await axios.post(`/api/search`, { id });
  return res.data;
};

export default function MovieDetailsPage() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => fetchMovieDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) return <SkeletonDetailMovieCard />;
  if (isError)
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  const movie = data?.movie;
  const relatedMovies = data?.relatedMovies;

  return (
    <>
      <div className="bg-gray-900 overflow-hidden">
        <div className="md:h-screen h-fit bg-gray-900 text-white flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{movie?.Title}</h1>
            <div className="flex flex-col md:flex-row">
              <img
                src={movie?.Poster}
                alt={movie?.Title}
                className="w-full md:w-1/3 h-auto rounded-lg mb-4 md:mb-0 md:mr-4"
              />
              <div className="flex-1">
                <p className="text-xl font-semibold mb-2">
                  Year: {movie?.Year}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Rated:</span> {movie?.Rated}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Released:</span>{" "}
                  {movie?.Released}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Runtime:</span>{" "}
                  {movie?.Runtime}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Genre:</span> {movie?.Genre}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Director:</span>{" "}
                  {movie?.Director}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Writer:</span>{" "}
                  {movie?.Writer.join(", ")}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Actors:</span>{" "}
                  {movie?.Actors.join(", ")}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Plot:</span> {movie?.Plot}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Language:</span>{" "}
                  {movie?.Language}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Country:</span>{" "}
                  {movie?.Country}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Awards:</span> {movie?.Awards}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">IMDB Rating:</span>{" "}
                  {movie?.imdbRating}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">IMDB Votes:</span>{" "}
                  {movie?.imdbVotes}
                </p>
              </div>
            </div>
          </div>
        </div>

        <main className="w-screen p-4">
          <div className="text-2xl font-bold mb-4">Related Movies</div>

          <div className="slider-container space-x-4 my-12">
            <Slider {...settings}>
              {relatedMovies?.map((relatedMovie: any) => (
                <MovieCard key={relatedMovie.id} movie={relatedMovie} />
              ))}
            </Slider>
          </div>
        </main>
      </div>
    </>
  );
}
