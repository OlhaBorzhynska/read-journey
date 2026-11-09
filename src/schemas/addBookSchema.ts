import * as Yup from "yup";

export const addBookSchema = Yup.object({
  title: Yup.string().trim().required("Book title is required"),

  author: Yup.string().trim().required("Author is required"),

  totalPages: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("Enter a valid number")
    .integer("Number of pages must be an integer")
    .positive("Number of pages must be greater than 0")
    .required("Number of pages is required"),
});
