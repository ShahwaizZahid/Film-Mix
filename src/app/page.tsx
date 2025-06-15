/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/Auth";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import "@/styles/home.css";

import { Play, Users, Star, Sparkles, Film, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";

export default function HomePage() {
  const { user } = useAuthContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("current user", user);
    setIsVisible(true);
  }, [user]);

  return (
    <>
      <Navbar />

      <div className="animated-bg relative min-h-screen flex justify-center items-center text-center overflow-hidden">
        {/* Background Decorative Bubbles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-xl animate-float-slow"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Film className="absolute top-32 left-12 text-white/20 w-8 h-8 animate-bounce" />
          <Star className="absolute top-48 right-16 text-yellow-400/30 w-6 h-6 animate-pulse" />
          <Play className="absolute bottom-40 left-20 text-blue-400/25 w-10 h-10 animate-ping" />
          <Sparkles className="absolute top-60 left-1/3 text-purple-400/20 w-7 h-7 animate-spin" />
          <Users className="absolute bottom-32 right-1/4 text-green-400/25 w-8 h-8 animate-bounce" />
        </div>

        {/* Main Content */}
        <div
          className={`md:w-[70%] w-[90%] z-10 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Title with Typewriter */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-gradient-x my-10">
            <Typewriter
              words={[
                "Welcome to MovieLand",
                "Discover Films & More",
                "Dive Into Cinematic Worlds",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1800}
            />
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed py-8 px-2">
            Filmix is your all-in-one movie hub. View detailed film pages, watch
            trailers, read plot summaries, explore related titles, and get
            personalized suggestions. Whether youre hunting blockbusters or
            hidden gems — Filmix has you covered!
          </p>

          {/* Buttons */}
          <div className="flex justify-center items-center flex-wrap gap-6 mt-8">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all"
            >
              <Link href="/movies" className="flex items-center gap-2">
                <Play size={20} />
                Get Started
                <ArrowRight size={16} />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur"
            >
              <Link href="/contactus" className="flex items-center gap-2">
                <Users size={20} />
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-white text-center">
            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="text-sm text-gray-300">Movies Listed</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">50K+</h2>
              <p className="text-sm text-gray-300">Active Users</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">4.8★</h2>
              <p className="text-sm text-gray-300">Average Rating</p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full">
              <div className="w-1 h-3 bg-white/70 rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
