import { NavLink } from "react-router-dom";
import css from "./StartWorkout.module.css";

const StartWorkout = () => {
  return (
    <div className={css.startWorkout}>
      <div className={css.workoutInfo}>
        <h2 className={css.title}>Start your workout</h2>

        <ol className={css.steps}>
          <li className={css.step}>
            <span className={css.stepNumber}>1</span>
            <p className={css.stepText}>
              Create a personal library:{" "}
              <span className={css.accentText}>
                add the books you intend to read to it.
              </span>
            </p>
          </li>

          <li className={css.step}>
            <span className={css.stepNumber}>2</span>
            <p className={css.stepText}>
              Create your first workout:{" "}
              <span className={css.accentText}>
                define a goal, choose a period, start training.
              </span>
            </p>
          </li>
        </ol>

        <NavLink to="/library" className={css.libraryLink}>
          My library{" "}
          <svg className={css.libraryIcon} aria-hidden="true">
            <use href={`/icons/sprite.svg#icon-log-in`} />
          </svg>
        </NavLink>
      </div>

      <div className={css.quote}>
        <img
          className={css.quoteIcon}
          src="/images/books-icon.png"
          alt="books icon"
          aria-hidden="true"
        />

        <blockquote className={css.quoteText}>
          "Books are&nbsp; <span className={css.quoteAccentText}>windows</span>
          &nbsp; to the world, and reading is a journey into the unknown."
        </blockquote>
      </div>
    </div>
  );
};

export default StartWorkout;
