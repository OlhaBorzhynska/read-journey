import * as Yup from "yup";

export const createAddReadingSchema = (minPage: number, totalPages: number) =>
  Yup.object({
    page: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .typeError("Enter a valid page number")
      .integer("Page number must be an integer")
      .min(minPage, `Page number must be at least ${minPage}`)
      .max(totalPages, `The book has only ${totalPages} pages`)
      .required("Page number is required"),
  });
