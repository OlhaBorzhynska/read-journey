import type { BookDetails } from "../../types/book";
import css from "./Statistics.module.css";

interface StatisticsProps {
  book: BookDetails;
}

const Statistics = ({ book }: StatisticsProps) => {
  const completedReadings = book.progress.filter(
    (reading) =>
      reading.status === "inactive" && reading.finishPage !== undefined,
  );

  const activeReadings = book.progress.filter(
    (reading) => reading.status === "active",
  );

  const reachedPages = [
    ...completedReadings.map((reading) => reading.finishPage!),
    ...activeReadings.map((reading) => reading.startPage),
  ];

  const pagesRead = Math.min(book.totalPages, Math.max(0, ...reachedPages));

  const percentage =
    book.totalPages > 0 ? Math.round((pagesRead / book.totalPages) * 100) : 0;

  return (
    <>
      <p className={css.description}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>

      <div className={css.statistics}>
        <div className={css.chartWrapper}>
          <svg
            className={css.chart}
            viewBox="0 0 100 100"
            role="img"
            aria-label={`Reading progress: ${percentage}%`}
          >
            <circle className={css.chartTrack} cx="50" cy="50" r="44" />

            <circle
              className={css.chartProgress}
              cx="50"
              cy="50"
              r="44"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={2 * Math.PI * 44 * (1 - percentage / 100)}
            />
          </svg>

          <span className={css.chartLabel}>100%</span>
        </div>

        <div className={css.progressInfo}>
          <div className={css.progressLabel}>
            <span className={css.legendSquare} />
            <span className={css.percentAge}>{percentage}%</span>
          </div>

          <p className={css.pagesRead}>{pagesRead} pages read</p>
        </div>
      </div>
    </>
  );
};

export default Statistics;
