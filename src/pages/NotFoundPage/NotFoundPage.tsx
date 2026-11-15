import { useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className={`container ${css.page}`}>
      <div className={css.content}>
        <p className={css.errorCode}>404</p>

        <h1 className={css.title}>Page not found</h1>

        <p className={css.text}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <button
          type="button"
          className={css.button}
          onClick={() => navigate("/recommended")}
        >
          Back to recommended
        </button>
      </div>
    </main>
  );
};

export default NotFoundPage;
