"use client"; // Ensure this file is treated as client-side code

import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Use "next/navigation" for Next.js 13

export function useSearch() {
  const router = useRouter();

  return useMutation<any, AxiosError, { title: string }>({
    mutationKey: ["search"],
    mutationFn: async ({ title }) => {
      const res = await axios.post(
        "/api/movie/search",
        { title },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Search successful: ", data.movie._id);
      toast.success(data.message);
      router.push(`/movies/${data.movie._id}`);
    },
    onError: (error) => {
      console.error("Search failed: ", error);
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during search";
      toast.error(errorMessage);
    },
  });
}

export default useSearch;
