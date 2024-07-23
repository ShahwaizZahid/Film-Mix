"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import Search from "@/components/ui/Search";
import MovieCard from "@/components/ui/movieCard";
export default function Page() {
  return (
    <>
      <Navbar />
      <Search></Search>
    </>
  );
}
