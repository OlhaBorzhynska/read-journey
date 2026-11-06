import Dashboard from "../../components/Dashboard/Dashboard";
import Filters from "../../components/Filters/Filters";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";
import { getRecommendedBooks } from "../../services/bookService";
import type { RecommendedBook, RecommendedBooksParams } from "../../types/book";
import css from "./RecommendedPage.module.css";
import StartWorkout from "../../components/StartWorkout/StartWorkout";
import { useCallback, useEffect, useState } from "react";
import BookModal from "../../components/BookModal/BookModal";
import { addRecommendedBook } from "../../services/bookService";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

const getBooksLimit = () => {
  const width = window.innerWidth;

  if (width >= 1440) return 10;
  if (width >= 768) return 8;

  return 2;
};

type FiltersValues = Pick<RecommendedBooksParams, "title" | "author">;

const RecommendedPage = () => {
  const [books, setBooks] = useState<RecommendedBook[]>([]);
  const [filters, setFilters] = useState<FiltersValues>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(getBooksLimit);

  const [selectedBook, setSelectedBook] = useState<RecommendedBook | null>(
    null,
  );
  const [addedBookIds, setAddedBookIds] = useState<string[]>([]);

  const [isAdding, setIsAdding] = useState(false);

  const handleBookSelect = (book: RecommendedBook) => {
    setSelectedBook(book);
  };

  const handleModalClose = useCallback(() => {
    setSelectedBook(null);
  }, []);

  const handleAddBook = async (id: string) => {
    if (addedBookIds.includes(id)) return;

    try {
      setIsAdding(true);

      await addRecommendedBook(id);

      setAddedBookIds((prev) => [...prev, id]);

      toast.success("Book added to your library!");
      setSelectedBook(null);
    } catch (error) {
      if (isAxiosError<{ message?: string }>(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to add book. Please try again.",
        );
        return;
      }

      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getRecommendedBooks({
          ...filters,
          page,
          limit,
        });

        if (!isActive) return;

        setBooks(data.results);
        setTotalPages(data.totalPages);
      } catch {
        if (!isActive) return;

        setError("Failed to load books. Please try again.");
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
  }, [filters, page, limit]);

  useEffect(() => {
    const handleResize = () => {
      setLimit(getBooksLimit());
      setPage(1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFilterSubmit = (values: FiltersValues) => {
    setFilters(values);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className="container">
      <div className={css.recommendedContainer}>
        <Dashboard>
          <Filters onSubmit={handleFilterSubmit} />
          <StartWorkout />
        </Dashboard>

        <RecommendedBooks
          books={books}
          page={page}
          totalPages={totalPages}
          isLoading={isLoading}
          error={error}
          onPageChange={handlePageChange}
          onBookSelect={handleBookSelect}
        />
      </div>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleModalClose}
          onAdd={() => handleAddBook(selectedBook._id)}
          isAdding={isAdding}
          isAdded={addedBookIds.includes(selectedBook._id)}
        />
      )}
    </main>
  );
};

export default RecommendedPage;
