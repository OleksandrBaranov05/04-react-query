import axios from "axios";
import type { Movie } from "../types/movie"

interface MovieRes {
    results: Movie[]
}

const token = import.meta.env.VITE_TMDB_TOKEN;
 
export default async function fetchMovies(search: string): Promise<Movie[]> {
    const getMovie = await axios.get<MovieRes>(`https://api.themoviedb.org/3/search/movie`, {
        params: {
            query: search,
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });

    return getMovie.data.results;
};