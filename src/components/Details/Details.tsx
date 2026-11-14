import { useState } from "react";
import type { BookDetails } from "../../types/book";
import Diary from "../Diary/Diary";
import css from "./Details.module.css";
import Statistics from "../Statistics/Statistics";

interface DetailsProps {
  book: BookDetails;
  onBookUpdate: (updatedBook: BookDetails) => void;
}

type DetailsView = "diary" | "statistics";

const Details = ({ book, onBookUpdate }: DetailsProps) => {
  const [activeView, setActiveView] = useState<DetailsView>("diary");

  const hasReadingHistory = book.progress.some(
    (reading) =>
      reading.status === "inactive" &&
      reading.finishPage !== undefined &&
      Boolean(reading.finishReading),
  );

  return (
    <section className={css.details}>
      <div className={css.titleIconWrapper}>
        <h2 className={css.title}>
          {!hasReadingHistory
            ? "Progress"
            : activeView === "diary"
              ? "Diary"
              : "Statistics"}
        </h2>

        {hasReadingHistory && (
          <div className={css.viewButtons}>
            <button
              type="button"
              className={`${css.viewButton} ${
                activeView === "diary" ? css.active : ""
              }`}
              aria-label="Diary"
              aria-pressed={activeView === "diary"}
              onClick={() => setActiveView("diary")}
            >
              <svg className={css.viewIcon} aria-hidden="true">
                <use href="/icons/sprite.svg#icon-hourglass" />
              </svg>
            </button>

            <button
              type="button"
              className={`${css.viewButton} ${
                activeView === "statistics" ? css.active : ""
              }`}
              aria-label="Statistics"
              aria-pressed={activeView === "statistics"}
              onClick={() => setActiveView("statistics")}
            >
              <svg className={css.viewIcon} aria-hidden="true">
                <use href="/icons/sprite.svg#icon-pie-chart" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {!hasReadingHistory && (
        <div className={css.progressContent}>
          <p className={css.description}>
            Here you will see when and how much you read. To record, click on
            the red button above.
          </p>

          <div className={css.starIconWrapper} aria-hidden="true">
            <img className={css.starIcon} src="/images/star-icon.png" alt="" />
          </div>
        </div>
      )}

      {hasReadingHistory && activeView === "diary" && (
        <Diary book={book} onBookUpdate={onBookUpdate} />
      )}

      {hasReadingHistory && activeView === "statistics" && (
        <Statistics book={book} />
      )}
    </section>
  );
};

export default Details;
