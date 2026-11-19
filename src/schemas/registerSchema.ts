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
    .test(
      "min-length",
      "Password must be at least 7 characters",
      (value) => !!value && value.trim().length >= 7,
    )
    .matches(/^\S/, "Password cannot start with a space"),
});
