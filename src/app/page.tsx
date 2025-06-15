/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import "@/styles/home.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthContext } from "@/context/Auth";
import { useEffect, useState } from "react";
import { Play, Users, Star, Sparkles, Film, ArrowRight } from "lucide-react";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuthContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("this thimw user", user);
  }, [user]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="animated-bg relative min-h-screen flex justify-center items-center text-center overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-float-slow"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Film
            className="absolute top-32 left-12 text-white/20 w-8 h-8 animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <Star
            className="absolute top-48 right-16 text-yellow-400/30 w-6 h-6 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <Play
            className="absolute bottom-40 left-20 text-blue-400/25 w-10 h-10 animate-ping"
            style={{ animationDelay: "2s" }}
          />
          <Sparkles
            className="absolute top-60 left-1/3 text-purple-400/20 w-7 h-7 animate-spin"
            style={{ animationDuration: "3s" }}
          />
          <Users
            className="absolute bottom-32 right-1/4 text-green-400/25 w-8 h-8 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div
          className={`md:w-[70%] w-[90%] relative z-10 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Main Title with Enhanced Animation */}
          <div className="relative mb-8">
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold my-16 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-gradient-x transition-all duration-1000 transform ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              Welcome to{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  MovieLand
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 animate-pulse"></div>
              </span>
            </h1>

            {/* Animated underline */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>

          {/* Enhanced Description */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-lg md:text-xl mb-6 animate-slide-in my-20 py-10 leading-relaxed text-gray-100 relative">
              Filmix is your go-to destination for all things movies. Discover
              detailed information about your favorite films, including cast,
              plot summaries, trailers, and reviews. Stay updated with the
              latest releases, top picks, and timeless classics. Dive into the
              world of cinema with Filmix!
            </p>
          </div>

          {/* Enhanced Buttons */}
          <div
            className={`space-x-8 my-16 transition-all duration-1000 delay-500 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 py-3 px-8 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl transform">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <div className="relative flex items-center space-x-2">
                <Play size={20} className="group-hover:animate-pulse" />
                <Link href="/movies" className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </div>
            </Button>

            <Button className="group relative overflow-hidden bg-transparent hover:bg-white/10 border-2 border-white/30 hover:border-white/50 py-3 px-8 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <div className="relative flex items-center space-x-2">
                <Users size={20} className="group-hover:animate-bounce" />
                <Link href="/contactus" className="flex items-center space-x-2">
                  <span>Contact Us</span>
                </Link>
              </div>
            </Button>
          </div>

          {/* New Stats Section */}
          <div
            className={`grid grid-cols-3 gap-8 mt-20 transition-all duration-1000 delay-700 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-center group cursor-pointer">
              <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                10K+
              </div>
              <div className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                Movies
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
                50K+
              </div>
              <div className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                Users
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                4.8★
              </div>
              <div className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                Rating
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full">
            <div className="w-1 h-3 bg-white/70 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </>
  );
}
