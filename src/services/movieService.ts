import axios, { type AxiosRequestConfig } from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/";
axios.defaults.baseURL = BASE_URL;

const endpoint = "search/movie";
const myApiKey = import.meta.env.VITE_TMDB_TOKEN;

interface MovieHttpResponse {
  results: Movie[];
  total_pages: number;
}

export default async function fetchMovies(
  query: string,
  page: number,
): Promise<MovieHttpResponse> {
  const config: AxiosRequestConfig = {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${myApiKey}`,
    },
  };

  const response = await axios.get<MovieHttpResponse>(endpoint, config);
  return response.data;
}
