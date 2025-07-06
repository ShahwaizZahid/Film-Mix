"use client";
import React, { useState } from "react";
import MoviesList from "@/components/ui/MovieList";
import Navbar from "@/components/ui/Navbar";
import SearchForm from "@/components/ui/Search";
import useSearch from "@/hooks/useSearch";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Users, Sparkles, Film, Star } from "lucide-react";

export default function Page() {
  const searchMutation = useSearch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = async (data: { search: string }) => {
    const res = await searchMutation.mutateAsync({ title: data.search });
    setSearchQuery(data.search);
  };

  return (
    <>
      <Navbar />
      <div className="bg-background text-foreground relative min-h-screen flex flex-col items-center justify-start overflow-hidden transition-colors duration-300 pt-28">
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
        <div className="w-full z-10">
          <SearchForm onSubmit={handleSearchSubmit} />
        </div>
        <div className="w-full z-10">
          <ErrorBoundary>
            <MoviesList />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
