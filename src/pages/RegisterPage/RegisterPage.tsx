import { Link } from "react-router-dom";
import css from "./RegisterPage.module.css";
import Logo from "../../components/Logo/Logo";
import { useState } from "react";

const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <main className="container">
      <div className={css.registerContainer}>
        <section className={css.registerSection}>
          <Logo variant="auth" />

          <div className={css.registerContent}>
            <h1 className={css.title}>
              Expand your mind, reading{" "}
              <span className={css.titleAccent}>a book</span>
            </h1>

            <form className={css.registerForm}>
              <div className={css.formFields}>
                <label className={css.inputWrapper}>
                  <span className={css.inputLabel}>Name:</span>
                  <input
                    className={css.input}
                    type="text"
                    name="name"
                    placeholder="Ilona Ratushniak"
                    autoComplete="name"
                  />
                </label>

                <label className={css.inputWrapper}>
                  <span className={css.inputLabel}>Mail:</span>
                  <input
                    className={css.input}
                    type="email"
                    name="email"
                    placeholder="Your@email.com"
                    autoComplete="email"
                  />
                </label>

                <label className={css.inputWrapper}>
                  <span className={css.inputLabel}>Password:</span>

                  <input
                    className={css.input}
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Yourpasswordhere"
                    autoComplete="new-password"
                  />

                  <button
                    className={css.passwordToggle}
                    type="button"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                  >
                    <svg className={css.passwordIcon}>
                      <use
                        href={`/icons/sprite.svg#${
                          isPasswordVisible ? "icon-eye" : "icon-eye-off"
                        }`}
                      />
                    </svg>
                  </button>
                </label>
              </div>

              <div className={css.formActions}>
                <button className={css.submitButton} type="submit">
                  Registration
                </button>

                <Link to="/login" className={css.loginLink}>
                  Already have an account?
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

export default RegisterPage;
