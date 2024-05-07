import { useQuery } from "@tanstack/react-query";
import useMovieStore from "../services/MovieStore";
import APIClient from "../services/apiClient";
import Media from "../entities/Media";

interface SearchResult {
  media_type: "tv" | "movie" | "person";
}

interface PersonResult extends SearchResult {
  original_name: string;
  media_type: "person";
  known_for_department: string;
  id: number;
  profile_path: string;
  known_for: Media[];
}

export interface MediaResults extends SearchResult {
  overview: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  media_type: "movie" | "tv";
  original_title: string;
  release_date: string;
  original_name: string;
  first_air_date: string;
}

export interface Results {
  results: (MediaResults | PersonResult)[];
  total_results: number;
}

const useSearch = () => {
  const searchedText = useMovieStore((s) => s.searchText);
  const apiClient = new APIClient<Results>(
    `/search/multi?query=${searchedText}&include_adult=false&language=en-US&page=1`
  );
  return useQuery({
    queryKey: ["searchedData", searchedText],
    queryFn: apiClient.getAll,
    enabled: searchedText.length > 2,
  });
};

export default useSearch;
