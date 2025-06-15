import React from "react";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import { Users, Sparkles, Film, Star } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-background text-foreground relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">
        {/* Decorative Bubbles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl animate-float-slow"></div>
        </div>
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Film className="absolute top-32 left-12 text-muted-foreground w-8 h-8 animate-bounce" />
          <Star className="absolute top-48 right-16 text-yellow-400/40 w-6 h-6 animate-pulse" />
          <Sparkles className="absolute top-60 left-1/3 text-purple-400/30 w-7 h-7 animate-spin" />
          <Users className="absolute bottom-32 right-1/4 text-green-400/30 w-8 h-8 animate-bounce" />
        </div>
        {/* Main Card */}
        <div className="bg-white/80 dark:bg-black/70 p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto border-2 border-white/30 mt-24 mb-12 backdrop-blur-md z-10 transition-all duration-500">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              About Filmix
            </h1>
          </header>
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-purple-600 dark:text-pink-400 text-center">
                Your Gateway to the World of Movies
              </h2>
              <p className="text-lg text-center text-muted-foreground">
                Filmix is a modern platform built for movie lovers, by movie
                lovers. Our mission is to help you discover, explore, and enjoy
                films from every genre and era, all in one beautiful and
                intuitive space.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-purple-600 dark:text-pink-400">
                Our Story
              </h2>
              <p className="text-lg">
                Born from a passion for cinema and technology, Filmix was
                created to make movie discovery effortless and fun. We blend
                advanced filtering, personalized recommendations, and a vibrant
                community to bring you a truly immersive movie experience.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-purple-600 dark:text-pink-400">
                What Makes Filmix Unique?
              </h2>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>
                  <strong>Personalized Discovery:</strong> Get recommendations
                  tailored to your taste, mood, and viewing history.
                </li>
                <li>
                  <strong>Advanced Filters:</strong> Search by genre, rating,
                  year, and more—find the perfect film for any occasion.
                </li>
                <li>
                  <strong>Modern Experience:</strong> Enjoy a sleek, responsive
                  interface with beautiful visuals and smooth animations.
                </li>
                <li>
                  <strong>Secure & Social:</strong> Sign up to save favorites,
                  rate movies, and connect with fellow film fans.
                </li>
                <li>
                  <strong>Always Growing:</strong> We’re constantly adding new
                  features and titles to keep your movie journey fresh.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-purple-600 dark:text-pink-400">
                Join the Filmix Community
              </h2>
              <p className="text-lg">
                Whether you’re a casual viewer or a dedicated cinephile, Filmix
                is your home for all things movies. Sign up today and start
                exploring a universe of films, curated just for you.
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg">
                Have questions or feedback? Visit our{" "}
                <Link
                  href="/contactus"
                  className="text-pink-600 hover:underline font-semibold"
                >
                  Contact Us
                </Link>{" "}
                page—we’d love to hear from you!
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
