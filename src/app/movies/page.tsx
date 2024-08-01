"use client";
import React, { useState } from "react";

import MoviesList from "@/components/ui/MovieList";
import Navbar from "@/components/ui/Navbar";
import SearchForm from "@/components/ui/Search";
export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (data: { search: string }) => {
    console.log(data);
    setSearchQuery(data.search);
  };
  return (
    <>
      <Navbar></Navbar>
      <SearchForm onSubmit={handleSearchSubmit} />
      <MoviesList></MoviesList>
    </>
  );
}

import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

function useSearch() {
  return useMutation<any, AxiosError, any>({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      const res = await axios.post(
        `/login`,
        { email, password },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      // toast.success("Login successful!");
      console.log("Login successfully");
    },
    onError: (error) => {
      console.error("Login failed: ", error);

      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during login";
      // toast.error(errorMessage);
    },
  });
}
