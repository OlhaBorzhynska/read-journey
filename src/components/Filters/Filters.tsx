import { Formik, Form, Field } from "formik";
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
  const handleSubmit = (values: FiltersValues) => {
    onSubmit({
      title: values.title.trim() || undefined,
      author: values.author.trim() || undefined,
    });
  };

  return (
    <div className={css.filters}>
      <p className={css.title}>Filters:</p>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="title"
            placeholder="Book title: Enter text"
          />

          <Field
            className={css.input}
            type="text"
            name="author"
            placeholder="The author: Enter text"
          />

          <button className={css.button} type="submit">
            To apply
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Filters;
