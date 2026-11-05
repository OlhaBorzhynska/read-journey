import type { RecommendedBook } from "../../types/book";
import Modal from "../Modal/Modal";
import css from "./BookModal.module.css";

interface BookModalProps {
  book: RecommendedBook;
  onClose: () => void;
}

const BookModal = ({ book, onClose }: BookModalProps) => {
  return (
    <Modal onClose={onClose} labelledBy="book-modal-title">
      <div className={css.bookContent}>
        <img className={css.bookImage} src={book.imageUrl} alt={book.title} />

        <h2 id="book-modal-title" className={css.bookTitle}>
          {book.title}
        </h2>

        <p className={css.author}>{book.author}</p>
        <p className={css.totalPages}>{book.totalPages}&nbsp;pages</p>

        <button type="button" className={css.addButton}>
          Add to library
        </button>
      </div>
    </Modal>
  );
};

export default BookModal;
