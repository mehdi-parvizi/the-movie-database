import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import useMovieStore from "../services/MovieStore";

export interface Recommendation {
  title: string;
  media_type: "movie" | "tv";
  id: number;
  genre_ids: number[];
}

interface MovieRecommendation extends Recommendation {
  media_type: "movie";
  original_title: string;
  release_date: string;
}

interface TVRecommendation extends Recommendation {
  media_type: "tv";
  original_name: string;
  first_air_date: string;
}

interface Recommendations {
  results: (MovieRecommendation | TVRecommendation)[];
}

const useRecommendation = (id: string) => {
  const selectedType = useMovieStore((s) => s.selectedType);
  const endpoint = `/${selectedType}/${id}/recommendations?language=en-US&page=1`;
  const apiClient = new APIClient<Recommendations>(endpoint);
  return useQuery<Recommendations>({
    queryKey: ["recommendations", id],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!endpoint,
  });
};

export default useRecommendation;
