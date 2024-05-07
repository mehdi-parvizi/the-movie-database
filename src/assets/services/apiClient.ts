import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: "application/json",
    authorization: import.meta.env.VITE_API_KEY_TMDB,
  },
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };
  get = (id: string | undefined) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
}
export default APIClient;
