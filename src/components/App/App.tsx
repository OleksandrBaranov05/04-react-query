import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie, TmdbSearchResponse } from "../../types/movie";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Movie | null>(null);

  const { data, isFetching, isError, error, isSuccess } = useQuery<TmdbSearchResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data && data.results.length === 0) {
      toast("No movies found for your request.");
    }
  }, [isSuccess, data]);

  const totalPages = data?.total_pages ?? 0;

  const handleSearchSubmit = (value: string) => {
    if (value === query) return;
    setQuery(value);
    setPage(1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />

      <main className={css.container}>
        {isError && <ErrorMessage message={(error as Error)?.message} />}

        {!isError && isFetching && <Loader />}

        {!isError && !isFetching && isSuccess && data?.results.length > 0 && (
          <>
            {}
            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => {
                  setPage(selected + 1);
                }}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}

            <MovieGrid movies={data.results} onSelect={(m) => setSelected(m)} />
          </>
        )}
      </main>

      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
