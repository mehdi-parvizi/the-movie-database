import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Trailer from "../entities/Trailer";
import useMovieStore from "../services/MovieStore";

interface Response {
  results: Trailer[];
}
const useVideo = (id: string) => {
  const selectedType = useMovieStore((s) => s.selectedType);
  const endpoint = `/${selectedType}/${id}/videos`;
  const apiClient = new APIClient<Response>(endpoint);
  return useQuery<Response>({
    queryKey: ["trailer", id],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useVideo;
