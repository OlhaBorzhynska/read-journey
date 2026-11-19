import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),

  email: Yup.string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Please enter a valid email address",
    )
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters")
    .test(
      "not-only-spaces",
      "Password cannot contain only spaces",
      (value) => !!value && value.trim().length > 0,
    ),
});
