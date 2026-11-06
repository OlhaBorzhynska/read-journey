import type { Book } from "../../types/book";
import Modal from "../Modal/Modal";
import css from "./BookModal.module.css";

type BookModalMode = "recommended" | "library";

interface BookModalProps {
  book: Book;
  onClose: () => void;
  mode: BookModalMode;
  onAdd?: () => void;
  onStartReading?: () => void;
  isAdding?: boolean;
  isAdded?: boolean;
}

const BookModal = ({
  book,
  onClose,
  mode,
  onAdd,
  onStartReading,
  isAdding,
  isAdded,
}: BookModalProps) => {
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
            disabled={isAdding || isAdded}
          >
            {isAdding ? "Adding..." : isAdded ? "Added" : "Add to library"}
          </button>
        ) : (
          <button
            type="button"
            className={css.addButton}
            onClick={onStartReading}
          >
            Start reading
          </button>
        )}
      </div>
    </Modal>
  );
};

export default BookModal;
