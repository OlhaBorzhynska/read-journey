import { useFormik } from "formik";
import type { RecommendedBooksParams } from "../../types/book";
import css from "./Filters.module.css";

interface FiltersProps {
  onSubmit: (filters: Pick<RecommendedBooksParams, "title" | "author">) => void;
}

interface FiltersValues {
  title: string;
  author: string;
}

const initialValues: FiltersValues = {
  title: "",
  author: "",
};

const Filters = ({ onSubmit }: FiltersProps) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onSubmit({
        title: values.title.trim() || undefined,
        author: values.author.trim() || undefined,
      });
    },
  });

  return (
    <div className={css.filters}>
      <p className={css.title}>Filters:</p>

      <form className={css.form} onSubmit={formik.handleSubmit}>
        <div className={css.inputWrapper}>
          <label className={css.inputLabel} htmlFor="title">
            Book title:
          </label>

          <input
            className={css.input}
            id="title"
            type="text"
            name="title"
            placeholder="Enter text"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div className={css.inputWrapper}>
          <label className={css.inputLabel} htmlFor="author">
            The author:
          </label>

          <input
            className={css.input}
            id="author"
            type="text"
            name="author"
            placeholder="Enter text"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <button className={css.button} type="submit">
          To apply
        </button>
      </form>
    </div>
  );
};

export default Filters;
