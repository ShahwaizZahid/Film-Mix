import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

export function useSearch() {
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
      console.log("Search successful: ", data);
    },
    onError: (error) => {
      console.error("Search failed: ", error);

      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during search";
      console.log("erroror", errorMessage);
    },
  });
}

export default useSearch;
