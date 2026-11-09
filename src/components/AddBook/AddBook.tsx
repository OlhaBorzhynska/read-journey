import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

import { addBookSchema } from "../../schemas/addBookSchema";
import { addBookToLibrary } from "../../services/bookService";
import Modal from "../Modal/Modal";

import css from "./AddBook.module.css";

interface AddBookProps {
  onBookAdded: () => void;
}

interface AddBookFormValues {
  title: string;
  author: string;
  totalPages: string;
}

const initialValues: AddBookFormValues = {
  title: "",
  author: "",
  totalPages: "",
};

const AddBook = ({ onBookAdded }: AddBookProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = async (values: AddBookFormValues) => {
    try {
      await addBookToLibrary({
        title: values.title.trim(),
        author: values.author.trim(),
        totalPages: Number(values.totalPages),
      });

      onBookAdded();
      setIsSuccessModalOpen(true);

      return true;
    } catch (error) {
      if (isAxiosError<{ message?: string }>(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to add book. Please try again.",
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      return false;
    }
  };

  return (
    <>
      <section className={css.addBook}>
        <p className={css.title}>Create your library:</p>

        <Formik
          initialValues={initialValues}
          validationSchema={addBookSchema}
          onSubmit={async (values, { resetForm }) => {
            const isSuccess = await handleSubmit(values);

            if (isSuccess) {
              resetForm();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.fieldGroup}>
                <div className={css.inputWrapper}>
                  <label className={css.inputLabel} htmlFor="book-title">
                    Book title:
                  </label>
                  <Field
                    className={css.input}
                    id="book-title"
                    type="text"
                    name="title"
                    placeholder="Enter text"
                  />
                </div>
                <ErrorMessage
                  name="title"
                  component="p"
                  className={css.error}
                />
              </div>

              <div className={css.fieldGroup}>
                <div className={css.inputWrapper}>
                  <label className={css.inputLabel} htmlFor="book-author">
                    The author:
                  </label>
                  <Field
                    className={css.input}
                    id="book-author"
                    type="text"
                    name="author"
                    placeholder="Enter text"
                  />
                </div>
                <ErrorMessage
                  name="author"
                  component="p"
                  className={css.error}
                />
              </div>

              <div className={css.fieldGroup}>
                <div className={css.inputWrapper}>
                  <label className={css.inputLabel} htmlFor="book-pages">
                    Number of pages:
                  </label>
                  <Field
                    className={css.input}
                    id="book-pages"
                    type="number"
                    name="totalPages"
                    placeholder="0"
                  />
                </div>
                <ErrorMessage
                  name="totalPages"
                  component="p"
                  className={css.error}
                />
              </div>

              <button
                className={css.button}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add book"}
              </button>
            </Form>
          )}
        </Formik>
      </section>

      {isSuccessModalOpen && (
        <Modal
          onClose={() => setIsSuccessModalOpen(false)}
          labelledBy="success-title"
          modalClassName={css.successModal}
        >
          <div className={css.successContent}>
            <img src="/images/good-icon.png" alt="Good job icon" />
            <h2 id="success-title">Good job</h2>
            <p>
              Your book is now in &nbsp;<span>the library!</span>&nbsp; The joy
              knows no bounds and now you can start your training
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddBook;
