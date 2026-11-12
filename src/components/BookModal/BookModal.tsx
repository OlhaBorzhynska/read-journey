import type { Book, ReadingStatus } from "../../types/book";
import Modal from "../Modal/Modal";
import css from "./BookModal.module.css";

type BookModalMode = "recommended" | "library";

interface BookModalProps {
  book: Book;
  onClose: () => void;
  mode: BookModalMode;
  status?: ReadingStatus;
  onAdd?: () => void;
  onStartReading?: () => void;
  isAdding?: boolean;
  isInLibrary?: boolean;
  isCheckingLibrary?: boolean;
}

const BookModal = ({
  book,
  onClose,
  mode,
  status,
  onAdd,
  onStartReading,
  isAdding,
  isInLibrary,
  isCheckingLibrary,
}: BookModalProps) => {
  const getReadingButtonText = () => {
    switch (status) {
      case "in-progress":
        return "Continue reading";
      case "done":
        return "View statistics";
      default:
        return "Start reading";
    }
  };

  return (
    <Modal onClose={onClose} labelledBy="book-modal-title">
      <div className={css.bookContent}>
        <img className={css.bookImage} src={book.imageUrl} alt={book.title} />

        <h2 id="book-modal-title" className={css.bookTitle}>
          {book.title}
        </h2>

        <p className={css.author}>{book.author}</p>
        <p className={css.totalPages}>{book.totalPages}&nbsp;pages</p>

        {mode === "recommended" ? (
          <button
            type="button"
            className={css.addButton}
            onClick={onAdd}
            disabled={isCheckingLibrary || isAdding || isInLibrary}
          >
            {isCheckingLibrary
              ? "Checking library..."
              : isInLibrary
                ? "Already in library"
                : isAdding
                  ? "Adding..."
                  : "Add to library"}
          </button>
        ) : (
          <button
            type="button"
            className={css.addButton}
            onClick={onStartReading}
          >
            {getReadingButtonText()}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default BookModal;
