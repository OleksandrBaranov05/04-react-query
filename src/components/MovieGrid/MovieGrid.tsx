import css from "./MovieGrid.module.css"
import type { Movie } from "../../types/movie";
import {getImageUrl} from "../../utils/getImageUrl.ts"

interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[]
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
    return <ul className={css.grid}>
        {movies.map((movie) => (
            <li key={movie.id} onClick={() => onSelect(movie)} >
                <div className={css.card}>
                    <img
                        className={css.image}
                        src={getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        loading="lazy"
                    />
                    <h2 className={css.title}>{movie.title}</h2>
                </div>
            </li>
            ))}
    </ul>
}