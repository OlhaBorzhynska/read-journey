import { useFormik } from "formik";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { createAddReadingSchema } from "./../../schemas/AddReadingSchema";

import { startReading, finishReading } from "../../services/bookService";
import type { BookDetails } from "../../types/book";
import Modal from "../../components/Modal/Modal";
import css from "./AddReading.module.css";
import { useState, type RefObject } from "react";

interface AddReadingProps {
  book: BookDetails;
  onBookUpdate: (book: BookDetails) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

interface AddReadingFormValues {
  page: string;
}

const AddReading = ({ book, onBookUpdate, inputRef }: AddReadingProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const activeSession = book.progress.find(
    (session) => session.status === "active",
  );

  const lastCompletedSession = [...book.progress]
    .filter((session) => session.status === "inactive")
    .at(-1);

  const lastReadPage = lastCompletedSession?.finishPage;

  const isReading = Boolean(activeSession);
  const isDone = book.status === "done";

  const minPage = activeSession
    ? activeSession.startPage + 1
    : lastReadPage
      ? lastReadPage + 1
      : 1;

  const maxPage = isReading ? book.totalPages : minPage;

  const validationSchema = createAddReadingSchema(minPage, maxPage);

  const formik = useFormik<AddReadingFormValues>({
    initialValues: {
      page: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const page = Number(values.page);

      try {
        const updatedBook = isReading
          ? await finishReading({ id: book._id, page })
          : await startReading({ id: book._id, page });

        onBookUpdate(updatedBook);
        resetForm();

        if (isReading) {
          if (updatedBook.status === "done") {
            setIsSuccessModalOpen(true);
          } else {
            toast.success("Reading session saved!");
          }
        } else {
          toast.success("Reading started!");
        }
      } catch (error) {
        if (isAxiosError<{ message?: string }>(error)) {
          toast.error(
            error.response?.data?.message ||
              "Something went wrong. Please try again.",
          );
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    },
  });

  return (
    <section className={css.addReading}>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <label className={css.title} htmlFor="page">
          {isReading
            ? `Stop page (maximum ${book.totalPages}):`
            : "Start page:"}
        </label>

        <div className={css.fieldGroup}>
          <div className={css.inputWrapper}>
            <label className={css.inputLabel} htmlFor="page">
              Page number:
            </label>

            <input
              ref={inputRef}
              className={css.input}
              id="page"
              name="page"
              type="number"
              min={minPage}
              max={maxPage}
              step="1"
              placeholder={
                isDone
                  ? "Book completed"
                  : isReading
                    ? "Enter the page"
                    : lastReadPage
                      ? `Last stopped at page ${lastReadPage}`
                      : "0"
              }
              value={formik.values.page}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(formik.touched.page && formik.errors.page)}
              aria-describedby={
                formik.touched.page && formik.errors.page
                  ? "page-error"
                  : undefined
              }
              disabled={isDone}
            />
          </div>

          {formik.touched.page && formik.errors.page && (
            <p className={css.error} id="page-error">
              {formik.errors.page}
            </p>
          )}
        </div>

        <button
          className={css.button}
          type="submit"
          disabled={formik.isSubmitting || isDone}
        >
          {isDone
            ? "Already read"
            : formik.isSubmitting
              ? "Loading..."
              : isReading
                ? "To stop"
                : "To start"}
        </button>
      </form>

      {isSuccessModalOpen && (
        <Modal
          onClose={() => setIsSuccessModalOpen(false)}
          labelledBy="success-title"
          modalClassName={css.successModal}
        >
          <div className={css.successContent}>
            <img src="/images/books-icon.png" alt="Books icon" />

            <h2 id="success-title">The book is read</h2>

            <p>
              It was an&nbsp;<span>exciting journey</span>, where each page
              revealed new horizons, and the characters became inseparable
              friends.
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default AddReading;
