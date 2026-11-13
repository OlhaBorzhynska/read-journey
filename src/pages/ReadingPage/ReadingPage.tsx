import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getBookById } from "../../services/bookService";
import type { BookDetails } from "../../types/book";
import Dashboard from "../../components/Dashboard/Dashboard";
import AddReading from "../../components/AddReading/AddReading";
import Details from "../../components/Details/Details";
import MyBook from "../../components/MyBook/MyBook";
import css from "./ReadingPage.module.css";

const ReadingPage = () => {
  const { bookId } = useParams();

  const [book, setBook] = useState<BookDetails | null>(null);
  const [error, setError] = useState(false);

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
      <div className={css.readingContainer}>
        <p>Book not found</p>
      </div>
    );

  if (error)
    return (
      <div className={css.readingContainer}>
        <p>Failed to load book</p>
      </div>
    );

  if (!book)
    return (
      <div className={css.readingContainer}>
        <p>Loading...</p>
      </div>
    );

  return (
    <main className="container">
      <div className={css.readingContainer}>
        <Dashboard>
          <AddReading book={book} onBookUpdate={setBook} />
          <Details book={book} onBookUpdate={setBook} />
        </Dashboard>
        <MyBook book={book} />
      </div>
    </main>
  );
};

export default ReadingPage;
