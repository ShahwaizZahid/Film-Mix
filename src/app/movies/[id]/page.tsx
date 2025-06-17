/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import "@/styles/globals.css";
import Slider from "react-slick";
import axios from "axios";
import { SkeletonDetailMovieCard } from "@/components/ui/detailCardSkelton";
import * as React from "react";
import MovieCard from "@/components/ui/movieCard";
import { ArrowLeft } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
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
  const router = useRouter();

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
      <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-purple-100/60 via-pink-100/60 to-yellow-100/40 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-colors duration-500">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/70 dark:bg-black/60 shadow-md border border-border text-foreground hover:bg-accent/60 transition z-20"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        {/* Decorative Bubbles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-2xl animate-float-slow"></div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen py-8 relative z-10">
          <div className="w-full max-w-3xl rounded-3xl shadow-2xl p-8 border-2 border-white/30 bg-white/80 dark:bg-black/70 backdrop-blur-md transition-all duration-500">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x text-center">
              {movie?.Title}
            </h1>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={movie?.Poster}
                alt={movie?.Title}
                className="w-full md:w-1/3 h-auto rounded-2xl shadow-lg object-cover"
              />
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <p>
                    <span className="font-semibold">Year:</span> {movie?.Year}
                  </p>
                  <p>
                    <span className="font-semibold">Rated:</span> {movie?.Rated}
                  </p>
                  <p>
                    <span className="font-semibold">Released:</span>{" "}
                    {movie?.Released}
                  </p>
                  <p>
                    <span className="font-semibold">Runtime:</span>{" "}
                    {movie?.Runtime}
                  </p>
                  <p>
                    <span className="font-semibold">Genre:</span> {movie?.Genre}
                  </p>
                  <p>
                    <span className="font-semibold">Director:</span>{" "}
                    {movie?.Director}
                  </p>
                  <p className="col-span-2">
                    <span className="font-semibold">Writer:</span>{" "}
                    {movie?.Writer.join(", ")}
                  </p>
                  <p className="col-span-2">
                    <span className="font-semibold">Actors:</span>{" "}
                    {movie?.Actors.join(", ")}
                  </p>
                  <p className="col-span-2">
                    <span className="font-semibold">Plot:</span> {movie?.Plot}
                  </p>
                  <p>
                    <span className="font-semibold">Language:</span>{" "}
                    {movie?.Language}
                  </p>
                  <p>
                    <span className="font-semibold">Country:</span>{" "}
                    {movie?.Country}
                  </p>
                  <p>
                    <span className="font-semibold">Awards:</span>{" "}
                    {movie?.Awards}
                  </p>
                  <p>
                    <span className="font-semibold">IMDB Rating:</span>{" "}
                    {movie?.imdbRating}
                  </p>
                  <p>
                    <span className="font-semibold">IMDB Votes:</span>{" "}
                    {movie?.imdbVotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <main className="w-full max-w-6xl p-4 mt-12">
            <div className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              Related Movies
            </div>
            <div className="slider-container space-x-4 my-12">
              <Slider {...settings}>
                {relatedMovies?.map((relatedMovie: any) => (
                  <div key={relatedMovie._id} className="px-2">
                    <MovieCard movie={relatedMovie} />
                  </div>
                ))}
              </Slider>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
