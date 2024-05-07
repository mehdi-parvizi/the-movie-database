import Media from "../entities/Media";
import useMovieStore from "../services/MovieStore";
import APIClient from "../services/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface FetchResponseType {
  page: number;
  results: Media[];
  total_results: number;
  total_pages: number;
}

const useMedia = () => {
  const selectedType = useMovieStore((s) => s.selectedType);
  const apiClient = new APIClient<FetchResponseType>(
    `discover/${selectedType}`
  );
  const selectedGenre = useMovieStore((s) => s.selectedGenre);
  return useInfiniteQuery({
    queryKey: [selectedType, selectedGenre?.id],
    queryFn: ({ pageParam }) =>
      apiClient.getAll({
        params: {
          language: "en-US",
          page: pageParam,
          with_genres: selectedGenre?.id,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.page <= Math.min(20, lastPage.total_pages)
        ? allPages.length + 1
        : undefined;
    },
  });
};
export default useMedia;
