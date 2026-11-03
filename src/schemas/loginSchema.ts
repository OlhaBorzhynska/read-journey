import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});
