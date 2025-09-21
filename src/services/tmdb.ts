export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  release_date?: string;
  poster_path?: string | null;
}

export interface TmdbSearchResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: TmdbMovie[];
}

const API_BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_KEY as string;

export async function searchMovies(query: string, page = 1): Promise<TmdbSearchResponse> {
  if (!API_KEY) {
    throw new Error('VITE_TMDB_KEY is missing. Add it to your .env');
  }
  const url = new URL(`${API_BASE}/search/movie`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('query', query);
  url.searchParams.set('page', String(page));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}