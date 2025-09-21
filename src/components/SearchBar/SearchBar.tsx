import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

export interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  async function actionSubmit(formData: FormData) {
    const value = String(formData.get("query") || "").trim();
    if (!value) {
      toast("Please enter your search query.");
      return;
    }
    onSubmit(value);
  }

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        {}
        <form
          className={css.form}
          action={async (formData) => {
            await actionSubmit(formData);
          }}
        >
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
