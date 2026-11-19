import type { RecommendedBook } from "../../types/book";
import Loader from "../Loader/Loader";
import css from "./RecommendedBooks.module.css";

interface RecommendedBooksProps {
  books: RecommendedBook[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
  onBookSelect: (book: RecommendedBook) => void;
}

const RecommendedBooks = ({
  books,
  page,
  totalPages,
  isLoading,
  error,
  onPageChange,
  onBookSelect,
}: RecommendedBooksProps) => {
  return (
    <section className={css.recommended}>
      <div className={css.titlePaginationWrapper}>
        <h1 className={css.title}>Recommended</h1>

        {books.length > 0 && (
          <div className={css.pagination}>
            <button
              type="button"
              className={css.arrow}
              disabled={isLoading || page <= 1}
              onClick={() => onPageChange(page - 1)}
              aria-label="Previous page"
            >
              <svg className={css.paginationIcon} aria-hidden="true">
                <use href={`/icons/sprite.svg#icon-chevron-left`} />
              </svg>
            </button>

            <button
              type="button"
              className={css.arrow}
              disabled={isLoading || page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              aria-label="Next page"
            >
              <svg className={css.paginationIcon} aria-hidden="true">
                <use href={`/icons/sprite.svg#icon-chevron-right`} />
              </svg>
            </button>
          </div>
        )}
      </div>

      {isLoading && books.length === 0 && (
        <div className={css.loadingContainer}>
          <Loader size="medium" />
        </div>
      )}

      {error && <p className="errorMessage">{error}</p>}

      {!isLoading && !error && books.length === 0 && (
        <div className={css.emptyState}>
          <div className={css.emptyIconWrapper} aria-hidden="true">
            <img
              className={css.emptyIcon}
              src="/images/books-icon.png"
              alt="books icon"
              aria-hidden="true"
            />
          </div>

          <p className={css.emptyText}>
            We couldn't find&nbsp;
            <span className={css.emptyTextAccent}>any books</span>&nbsp;matching
            your search. Try another title or author.
          </p>
        </div>
      )}

      {!error && books.length > 0 && (
        <>
          <ul className={css.list}>
            {books.map((book) => (
              <li className={css.item} key={book._id}>
                <button
                  type="button"
                  className={css.bookButton}
                  onClick={() => onBookSelect(book)}
                  aria-label={`View details about ${book.title}`}
                >
                  <img
                    className={css.image}
                    src={book.imageUrl}
                    alt={book.title}
                    loading="lazy"
                  />

                  <h2 className={css.bookTitle}>{book.title}</h2>
                  <p className={css.author}>{book.author}</p>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default RecommendedBooks;
