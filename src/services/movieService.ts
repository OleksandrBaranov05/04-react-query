import axios, { type AxiosResponse } from "axios";
import type { TmdbSearchResponse } from "../types/movie";


const token = import.meta.env.VITE_TMDB_TOKEN as string;
if (!token) {
  throw new Error("VITE_TMDB_TOKEN is missing. Put it in your .env");
}

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`, // v4 Bearer token
    "Content-Type": "application/json;charset=utf-8",
  },
});

/**
 * Пошук фільмів за ключовим словом з пагінацією.
 */
export async function fetchMovies(
  query: string,
  page: number
): Promise<TmdbSearchResponse> {
  const resp: AxiosResponse<TmdbSearchResponse> = await api.get(
    "/search/movie",
    {
      params: {
        query,
        page,
        include_adult: false,
      },
    }
  );
  return resp.data;
}

/** Хелпер для побудови url зображення */
export function buildImg(path: string | null | undefined, size: "w500" | "original" = "w500") {
  if (!path) return "";
  const base = "https://image.tmdb.org/t/p/";
  return `${base}${size}${path}`;
}
