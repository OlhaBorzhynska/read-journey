import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import Logo from "../../components/Logo/Logo";
import css from "./LoginPage.module.css";
import { loginSchema } from "../../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";

type FieldName = "email" | "password";
type FieldStatus = "error" | "success" | "";

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await loginUser(values);

        toast.success("Login successful! Welcome back!");

        navigate("/recommended", { replace: true });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast.error("Invalid email or password.");
            return;
          }

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

  const getFieldStatus = (field: FieldName): FieldStatus => {
    if (!formik.touched[field]) return "";

    if (formik.errors[field]) return "error";

    if (formik.values[field].trim()) return "success";

    return "";
  };

  const renderFieldMessage = (field: FieldName, successMessage: string) => {
    const status = getFieldStatus(field);

    if (status === "error") {
      return (
        <p className={`${css.fieldMessage} ${css.errorMessage}`}>
          {formik.errors[field]}
        </p>
      );
    }

    if (status === "success") {
      return (
        <p className={`${css.fieldMessage} ${css.successMessage}`}>
          {successMessage}
        </p>
      );
    }

    return null;
  };

  const getStatusIcon = (status: FieldStatus) => {
    if (!status) return null;

    return (
      <svg className={css.statusIcon} aria-hidden="true">
        <use
          href={`/icons/sprite.svg#${
            status === "error" ? "icon-error" : "icon-check"
          }`}
        />
      </svg>
    );
  };

  return (
    <main className="container">
      <div className={css.loginContainer}>
        <section className={css.loginSection}>
          <Logo variant="auth" />

          <div className={css.loginContent}>
            <h1 className={css.title}>
              Expand your mind, reading{" "}
              <span className={css.titleAccent}>a book</span>
            </h1>

            <form
              className={css.loginForm}
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div className={css.formFields}>
                <div className={css.fieldGroup}>
                  <div
                    className={`${css.inputWrapper} ${
                      css[getFieldStatus("email")]
                    }`}
                  >
                    <label className={css.inputLabel} htmlFor="email">
                      Mail:
                    </label>

                    <input
                      className={css.input}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your@email.com"
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      aria-invalid={getFieldStatus("email") === "error"}
                    />

                    {getStatusIcon(getFieldStatus("email"))}
                  </div>

                  {renderFieldMessage("email", "Email is secure")}
                </div>

                <div className={css.fieldGroup}>
                  <div
                    className={`${css.inputWrapper} ${
                      css[getFieldStatus("password")]
                    }`}
                  >
                    <label className={css.inputLabel} htmlFor="password">
                      Password:
                    </label>

                    <input
                      className={css.input}
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Yourpasswordhere"
                      autoComplete="current-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      aria-invalid={getFieldStatus("password") === "error"}
                    />

                    <button
                      type="button"
                      className={`${css.passwordToggle} ${
                        getFieldStatus("password") === "error"
                          ? css.errorIcon
                          : getFieldStatus("password") === "success"
                            ? css.successIcon
                            : ""
                      }`}
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                      aria-label={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                    >
                      <svg className={css.passwordIcon} aria-hidden="true">
                        <use
                          href={`/icons/sprite.svg#${
                            isPasswordVisible ? "icon-eye" : "icon-eye-off"
                          }`}
                        />
                      </svg>
                    </button>
                  </div>

                  {renderFieldMessage("password", "Password is secure")}
                </div>
              </div>

              <div className={css.formActions}>
                <button
                  type="submit"
                  className={css.submitButton}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Loading..." : "Log In"}
                </button>

                <Link to="/register" className={css.registerLink}>
                  Don't have an account?
                </Link>
              </div>
            </form>
          </div>
        </section>

        <section className={css.previewSection}>
          <picture className={css.previewImage}>
            <source
              media="(min-width: 768px)"
              srcSet="
                /images/registration-desktop.webp 1x,
                /images/registration-desktop@2x.webp 2x
              "
            />

            <img
              src="/images/registration-mobile.png"
              srcSet="
                /images/registration-mobile.webp 1x,
                /images/registration-mobile@2x.webp 2x
              "
              alt="Read Journey application preview"
            />
          </picture>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
