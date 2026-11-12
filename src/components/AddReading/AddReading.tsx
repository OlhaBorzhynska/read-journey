import { useFormik } from "formik";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { createAddReadingSchema } from "./../../schemas/AddReadingSchema";

import { startReading, finishReading } from "../../services/bookService";
import type { BookDetails } from "../../types/book";
import css from "./AddReading.module.css";

interface AddReadingProps {
  book: BookDetails;
  onBookUpdate: (book: BookDetails) => void;
}

interface AddReadingFormValues {
  page: string;
}

const AddReading = ({ book, onBookUpdate }: AddReadingProps) => {
  const activeSession = book.progress.find(
    (session) => session.status === "active",
  );

  const isReading = Boolean(activeSession);
  const minPage = activeSession ? activeSession.startPage + 1 : 1;

  const validationSchema = createAddReadingSchema(minPage, book.totalPages);

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
            toast.success("Congratulations! You finished the book!");
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
          {isReading ? "Stop page:" : "Start page:"}
        </label>

        <div className={css.fieldGroup}>
          <div className={css.inputWrapper}>
            <label className={css.inputLabel} htmlFor="page">
              Page number:
            </label>

            <input
              className={css.input}
              id="page"
              name="page"
              type="number"
              min={minPage}
              max={book.totalPages}
              step="1"
              placeholder="0"
              value={formik.values.page}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(formik.touched.page && formik.errors.page)}
              aria-describedby={
                formik.touched.page && formik.errors.page
                  ? "page-error"
                  : undefined
              }
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
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting
            ? "Loading..."
            : isReading
              ? "To stop"
              : "To start"}
        </button>
      </form>
    </section>
  );
};

export default AddReading;
