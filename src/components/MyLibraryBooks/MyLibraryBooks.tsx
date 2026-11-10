import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { getOwnBooks, deleteBook } from "../../services/bookService";
import type { UserBook, ReadingStatus } from "../../types/book";
import css from "./MyLibraryBooks.module.css";
import { useNavigate } from "react-router-dom";
import BookModal from "../BookModal/BookModal";

interface MyLibraryBooksProps {
  refreshKey: number;
}

type BookFilter = ReadingStatus | "all";

const filterLabels: Record<BookFilter, string> = {
  unread: "Unread",
  "in-progress": "In progress",
  done: "Done",
  all: "All books",
};

const MyLibraryBooks = ({ refreshKey }: MyLibraryBooksProps) => {
  const [books, setBooks] = useState<UserBook[]>([]);
  const [filter, setFilter] = useState<BookFilter>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<UserBook | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;

    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getOwnBooks(filter === "all" ? undefined : filter);

        if (!isActive) return;

        setBooks(data);
      } catch {
        if (!isActive) return;

        setError("Failed to load your books. Please try again.");
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
  }, [filter, refreshKey]);

  useEffect(() => {
    if (!isFilterOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isFilterOpen]);

  const handleFilterSelect = (value: BookFilter) => {
    setFilter(value);
    setIsFilterOpen(false);
  };

  const handleDeleteBook = async (id: string) => {
    if (deletingBookId) return;

    try {
      setDeletingBookId(id);

      await deleteBook(id);

      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));

      toast.success("Book removed from your library.");
    } catch (error) {
      if (isAxiosError<{ message?: string }>(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to delete the book. Please try again.",
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setDeletingBookId(null);
    }
  };

  const handleBookClick = (book: UserBook) => {
    setSelectedBook(book);
  };

  const handleModalClose = () => {
    setSelectedBook(null);
  };

  const handleStartReading = () => {
    if (!selectedBook) return;

    navigate("/reading", {
      state: { bookId: selectedBook._id },
    });
  };

  return (
    <section className={css.library}>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>My library</h1>

        <div className={css.filterWrapper} ref={filterRef}>
          <button
            type="button"
            className={css.filterButton}
            onClick={() => setIsFilterOpen((prev) => !prev)}
            aria-label="Filter books by reading status"
            aria-haspopup="listbox"
            aria-expanded={isFilterOpen}
            aria-controls="book-filter-options"
          >
            <span>{filterLabels[filter]}</span>

            <svg
              className={`${css.filterIcon} ${
                isFilterOpen ? css.filterIconOpen : ""
              }`}
              aria-hidden="true"
            >
              <use href="/icons/sprite.svg#icon-chevron-down" />
            </svg>
          </button>

          {isFilterOpen && (
            <ul
              className={css.filterOptions}
              id="book-filter-options"
              role="listbox"
              aria-label="Reading status"
            >
              {(Object.keys(filterLabels) as BookFilter[]).map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    className={`${css.filterOption} ${
                      filter === option ? css.filterOptionActive : ""
                    }`}
                    onClick={() => handleFilterSelect(option)}
                    role="option"
                    aria-selected={filter === option}
                  >
                    {filterLabels[option]}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isLoading && <p className={css.message}>Loading books...</p>}

      {error && <p className={css.error}>{error}</p>}

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
            To start training, add &nbsp;
            <span className={css.emptyTextAccent}>some of your books</span>
            &nbsp;or from the recommended ones
          </p>
        </div>
      )}

      {!isLoading && !error && books.length > 0 && (
        <ul className={css.list}>
          {books.map((book) => (
            <li className={css.item} key={book._id}>
              <button
                type="button"
                className={css.bookButton}
                onClick={() => handleBookClick(book)}
                aria-label={`View details for ${book.title}`}
              >
                <img
                  className={css.bookImage}
                  src={book.imageUrl}
                  alt={book.title}
                  loading="lazy"
                />
              </button>

              <div className={css.textBtnWrapper}>
                <div className={css.textWrapper}>
                  <h2 className={css.bookTitle}>{book.title}</h2>

                  <p className={css.author}>{book.author}</p>
                </div>

                <button
                  type="button"
                  className={css.deleteButton}
                  onClick={() => handleDeleteBook(book._id)}
                  disabled={deletingBookId === book._id}
                  aria-label={`Delete ${book.title} from library`}
                >
                  <svg className={css.deleteIcon} aria-hidden="true">
                    <use href="/icons/sprite.svg#icon-trash" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleModalClose}
          mode="library"
          onStartReading={handleStartReading}
        />
      )}
    </section>
  );
};

export default MyLibraryBooks;
