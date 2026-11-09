import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { getRecommendedBooks } from "../../services/bookService";
import type { RecommendedBook } from "../../types/book";

import css from "./RecommendedSection.module.css";

const RecommendedSection = () => {
  const [books, setBooks] = useState<RecommendedBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isActive = true;

    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const data = await getRecommendedBooks({
          page: 1,
          limit: 3,
        });

        if (!isActive) return;

        setBooks(data.results.slice(0, 3));
      } catch {
        if (!isActive) return;

        setError(true);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className={css.recommendedSection}>
      <h2 className={css.title}>Recommended books</h2>

      {isLoading && <p className={css.message}>Loading books...</p>}

      {error && (
        <p className={css.message}>
          Failed to load recommended books. Please try again.
        </p>
      )}

      {!isLoading && !error && (
        <ul className={css.bookList}>
          {books.map((book) => (
            <li className={css.bookItem} key={book._id}>
              <img
                className={css.bookImage}
                src={book.imageUrl}
                alt={book.title}
              />

              <h3 className={css.bookTitle}>{book.title}</h3>
              <p className={css.author}>{book.author}</p>
            </li>
          ))}
        </ul>
      )}

      <NavLink to="/recommended" className={css.homeLink}>
        Home
        <svg className={css.homeIcon} aria-hidden="true">
          <use href="/icons/sprite.svg#icon-log-in" />
        </svg>
      </NavLink>
    </section>
  );
};

export default RecommendedSection;
