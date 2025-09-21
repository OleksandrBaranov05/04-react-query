import { Toaster, toast } from "react-hot-toast"
import SearchBar from "../SearchBar/SearchBar"
import fetchMovies from "../../services/movieService"
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";



export default function App() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    async function handleSearch(search: string) {
        try {
            setError(false)
            setLoading(true)
            const newMovies = await fetchMovies(search);
            if (newMovies.length === 0) {
                toast.error("No movies found for your request.");
                return
            }
            setMovies(newMovies)
        }
        catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    function handleSelectMovie(movie: Movie) {
        if (selectedMovie) {
            return;
        }
        setSelectedMovie(movie)
    }

    const handleCloseModal = () => {
    setSelectedMovie(null);
    };

    return <>
        <Toaster/>
        <SearchBar onSubmit={handleSearch} />
        {loading ? <Loader /> : null}
        {error ? <ErrorMessage/> : null}
        {movies ? <MovieGrid movies={movies} onSelect={handleSelectMovie} /> : null}
        {selectedMovie ? <MovieModal movie={selectedMovie} onClose={handleCloseModal} /> : null}
    </>
}