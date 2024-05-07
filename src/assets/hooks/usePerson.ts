import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import useMovieStore from "../services/MovieStore";

export interface PersonCreditsType {
  genre_ids: number;
  release_date?: string;
  first_air_date?: string;
  original_title?: string;
  original_name?: string;
}

interface Credits {
  cast: PersonCreditsType[];
}

const usePerson = () => {
  const id = useMovieStore((s) => s.mediaId);
  const endpoint = `/person/${id}/combined_credits`;
  const apiClient = new APIClient<Credits>(endpoint);
  return useQuery({
    queryKey: ["credit", id],
    queryFn: apiClient.getAll,
  });
};

export default usePerson;
