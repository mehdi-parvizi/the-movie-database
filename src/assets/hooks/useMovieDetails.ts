import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Media from "../entities/Media";
import useMovieStore from "../services/MovieStore";

const useMovieDetails = (id: string | undefined) => {
  const selectedType = useMovieStore((s) => s.selectedType);
  const apiClient = new APIClient<Media>(`/${selectedType}`);
  return useQuery({
    queryKey: ["details", id],
    queryFn: () => apiClient.get(id),
  });
};
export default useMovieDetails;
