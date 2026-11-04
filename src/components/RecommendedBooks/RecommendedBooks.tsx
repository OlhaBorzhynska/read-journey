import type { RecommendedBook } from "../../types/book";
import css from "./RecommendedBooks.module.css";

interface RecommendedBooksProps {
  books: RecommendedBook[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
}

const RecommendedBooks = ({
  books,
  page,
  totalPages,
  isLoading,
  error,
  onPageChange,
}: RecommendedBooksProps) => {
  return (
    <section className={css.recommended}>
      <h1 className={css.title}>Recommended</h1>

      <div className={css.pagination}>
        <button
          type="button"
          className={css.arrow}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          &lt;
        </button>

        <span className={css.pageInfo}>
          {page} / {totalPages}
        </span>

        <button
          type="button"
          className={css.arrow}
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          &gt;
        </button>
      </div>

      {isLoading && <p>Loading books...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && books.length === 0 && <p>No books found.</p>}

      {!isLoading && !error && books.length > 0 && (
        <>
          <ul className={css.list}>
            {books.map((book) => (
              <li className={css.item} key={book._id}>
                <img
                  className={css.image}
                  src={book.imageUrl}
                  alt={book.title}
                  loading="lazy"
                />

                <h2 className={css.bookTitle}>{book.title}</h2>
                <p className={css.author}>{book.author}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default RecommendedBooks;
