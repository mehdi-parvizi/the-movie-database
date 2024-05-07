import Genre from "../entities/Genre";
import APIClient from "../services/apiClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Genres {
  genres: Genre[];
}

const useGenres = (type: string) => {
  const endpoint = `/genre/${type}/list?language=en`;
  const apiClient = new APIClient<Genres>(endpoint);
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["genres", type],
    queryFn: apiClient.getAll,
    staleTime: 60 * 60 * 1000, // 1h
    initialData: queryClient.getQueryData(["genres"]),
  });
};
export default useGenres;
