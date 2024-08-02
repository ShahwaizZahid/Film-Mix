"use client";
import React, { useState } from "react";
import MoviesList from "@/components/ui/MovieList";
import Navbar from "@/components/ui/Navbar";
import SearchForm from "@/components/ui/Search";
import useSearch from "@/hooks/useSearch"; // Adjust the import path as needed

export default function Page() {
  const searchMutation = useSearch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = async (data: { search: string }) => {
    console.log(data);
    const res = await searchMutation.mutateAsync({ title: data.search });
    console.log(res);
    setSearchQuery(data.search);
  };

  return (
    <>
      <Navbar />
      <SearchForm onSubmit={handleSearchSubmit} />
      <MoviesList />
    </>
  );
}
