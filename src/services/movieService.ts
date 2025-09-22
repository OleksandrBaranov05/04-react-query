import axios, { type AxiosInstance } from "axios";
import type { Movie } from "../types/movie";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export interface TmdbSearchResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export async function fetchMovies(query: string, page: number): Promise<TmdbSearchResponse> {
  const { data } = await api.get<TmdbSearchResponse>("/search/movie", {
    params: { query, page, language: "uk-UA", include_adult: false },
  });
  return data;
}

export function buildImg(
  path: string | null,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500"
): string | null {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}