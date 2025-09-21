import { useState } from 'react';
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from 'react-paginate';
import { searchMovies} from "../../services/tmdb";
import type { TmdbMovie } from "../../services/tmdb";
import css from './App.module.css';


export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isFetching, isError, error, isSuccess } = useQuery({
  queryKey: ["movies", query, page],
  queryFn: () => searchMovies(query, page),
  enabled: query.trim().length > 0,
  placeholderData: keepPreviousData, // ✅ аналогічна поведінка v4
});          
  

  const totalPages = data?.total_pages ?? 0;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <h1>Пошук фільмів</h1>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введіть назву фільму…"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Шукати</button>
      </form>

      {isError && (
        <p style={{ color: 'crimson' }}>
          {(error as Error)?.message || 'Сталася помилка під час завантаження'}
        </p>
      )}

      {isFetching && <p>Завантаження…</p>}

      {isSuccess && data.results.length === 0 && <p>Нічого не знайдено.</p>}

      {isSuccess && data.results.length > 0 && (
        <>
          <p style={{ opacity: 0.8, marginBottom: 8 }}>
            Знайдено: <b>{data.total_results}</b>
          </p>

          <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0 }}>
            {data.results.map((m: TmdbMovie) => (
              <li
                key={m.id}
                style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}
              >
                <b>{m.title}</b>{' '}
                {m.release_date ? `(${m.release_date.slice(0, 4)})` : ''}
                <p style={{ margin: '8px 0 0 0' }}>
                  {m.overview || 'Опис відсутній.'}
                </p>
              </li>
            ))}
          </ul>

          {/* Пагінація тільки якщо сторінок > 1 */}
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}
    </div>
  );
}