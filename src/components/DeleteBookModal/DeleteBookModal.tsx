import Modal from "../Modal/Modal";
import css from "./DeleteBookModal.module.css";

interface DeleteBookModalProps {
  bookTitle: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteBookModal = ({
  bookTitle,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteBookModalProps) => {
  return (
    <Modal onClose={onClose} labelledBy="delete-book-modal-title">
      <div className={css.content}>
        <h2 className={css.title}>Delete book?</h2>

        <p className={css.text}>
          Are you sure to remove book{" "}
          <span className={css.bookTitle}>"{bookTitle}"</span> from your
          library?
        </p>

        <div className={css.buttons}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>

          <button
            type="button"
            className={css.deleteButton}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBookModal;
