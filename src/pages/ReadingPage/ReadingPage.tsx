import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getBookById } from "../../services/bookService";
import type { BookDetails } from "../../types/book";
import Dashboard from "../../components/Dashboard/Dashboard";
import AddReading from "../../components/AddReading/AddReading";
import Details from "../../components/Details/Details";
import MyBook from "../../components/MyBook/MyBook";
import css from "./ReadingPage.module.css";
import Loader from "../../components/Loader/Loader";

const ReadingPage = () => {
  const pageInputRef = useRef<HTMLInputElement>(null);

  const { bookId } = useParams();

  const [book, setBook] = useState<BookDetails | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (book) {
      document.title = `${book.title} | Read Journey`;
    }

    return () => {
      document.title = "Read Journey — Your Personal Book Tracker";
    };
  }, [book]);

  useEffect(() => {
    if (!bookId) return;

    let isActive = true;

    const fetchBook = async () => {
      try {
        const data = await getBookById(bookId);

        if (isActive) {
          setBook(data);
        }
      } catch {
        if (isActive) {
          setError(true);
          toast.error("Failed to load book");
        }
      }
    };

    fetchBook();

    return () => {
      isActive = false;
    };
  }, [bookId]);

  if (!bookId)
    return (
      <div className={css.loadingContainer}>
        <p>Book not found</p>
      </div>
    );

  if (error)
    return (
      <div className={css.loadingContainer}>
        <p>Failed to load book</p>
      </div>
    );

  if (!book)
    return (
      <div className={css.loadingContainer}>
        <Loader size="large" />
      </div>
    );

  return (
    <main className="container">
      <div className={css.readingContainer}>
        <Dashboard>
          <AddReading
            book={book}
            onBookUpdate={setBook}
            inputRef={pageInputRef}
          />
          <Details book={book} onBookUpdate={setBook} />
        </Dashboard>
        <MyBook
          book={book}
          onStatusClick={() => pageInputRef.current?.focus()}
        />
      </div>
    </main>
  );
};

export default ReadingPage;
