import type { MouseEvent } from "react";
import type { Movie } from "../../types/movie";
import { buildImg } from "../../services/movieService";
import css from "./MovieGrid.module.css";

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies.length) return null;

  const handleClick = (e: MouseEvent, m: Movie) => {
    e.preventDefault();
    onSelect(m);
  };

  return (
    <ul className={css.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div className={css.card} onClick={(e) => handleClick(e, m)}>
            <img
              className={css.image}
              src={buildImg(m.poster_path, "w500") || ""}
              alt={m.title}
              loading="lazy"
            />
            <h2 className={css.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
