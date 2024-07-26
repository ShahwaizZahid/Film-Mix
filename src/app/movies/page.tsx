"use client";
import React from "react";
import MoviesList from "@/components/ui/MovieList";
import Navbar from "@/components/ui/Navbar";
// import SearchForm from "@/components/ui/Search";
export default function Search() {
  return (
    <>
      {/* <SearchForm onSubmit={onSubmit}></SearchForm> */}
      <Navbar></Navbar>
      <MoviesList></MoviesList>
    </>
  );
}
