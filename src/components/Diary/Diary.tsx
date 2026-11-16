import { useState } from "react";
import toast from "react-hot-toast";
import { deleteReading } from "../../services/bookService";
import type { BookDetails } from "../../types/book";
import css from "./Diary.module.css";

interface DiaryProps {
  book: BookDetails;
  onBookUpdate: (updatedBook: BookDetails) => void;
}

const Diary = ({ book, onBookUpdate }: DiaryProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const readings = book.progress
    .filter(
      (reading) =>
        reading.status === "inactive" &&
        reading._id &&
        reading.finishPage !== undefined &&
        reading.finishReading,
    )
    .sort(
      (a, b) =>
        new Date(b.finishReading!).getTime() -
        new Date(a.finishReading!).getTime(),
    );

  const getPagesRead = (startPage: number, finishPage: number) => {
    return finishPage - startPage;
  };

  const getReadingDuration = (startReading: string, finishReading: string) => {
    const start = new Date(startReading).getTime();
    const finish = new Date(finishReading).getTime();

    return Math.max(1, Math.round((finish - start) / 60000));
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes}min`;
    if (remainingMinutes === 0) return `${hours}h`;

    return `${hours}h ${remainingMinutes}min`;
  };

  const getReadingPercentage = (finishPage: number) => {
    return Math.min(
      100,
      Number(((finishPage / book.totalPages) * 100).toFixed(1)),
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = async (readingId: string) => {
    try {
      setDeletingId(readingId);

      const updatedBook = await deleteReading({
        bookId: book._id,
        readingId,
      });

      onBookUpdate(updatedBook);

      toast.success("Reading session deleted");
    } catch {
      toast.error("Failed to delete reading session");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={css.diaryScroll}>
      <div className={css.diaryContent}>
        {readings.length === 0 ? (
          <p className={css.emptyMessage}>No reading sessions yet.</p>
        ) : (
          <ul className={css.diaryList}>
            {readings.map((reading) => {
              const readingId = reading._id!;
              const finishPage = reading.finishPage!;
              const finishReading = reading.finishReading!;

              const pagesRead = getPagesRead(reading.startPage, finishPage);

              const duration = getReadingDuration(
                reading.startReading,
                finishReading,
              );

              const percentage = getReadingPercentage(finishPage);

              return (
                <li className={css.diaryItem} key={readingId}>
                  <div className={css.diaryItemHeader}>
                    <div className={css.dateWrapper}>
                      <span className={css.dateIndicator} />
                      <p className={css.date}>{formatDate(finishReading)}</p>
                    </div>

                    <p className={css.pagesCount}>{finishPage} pages</p>
                  </div>

                  <div className={css.diaryItemContent}>
                    <div className={css.readingStats}>
                      <p className={css.percentage}>{percentage}%</p>
                      <p className={css.duration}>{formatDuration(duration)}</p>
                    </div>

                    <div className={css.diaryActions}>
                      <div className={css.readingSpeed}>
                        <div className={css.speedChart} />
                        <p className={css.speedValue}>
                          {Math.round(pagesRead / (duration / 60))} pages
                          <br />
                          per hour
                        </p>
                      </div>

                      <button
                        type="button"
                        className={css.deleteButton}
                        aria-label="Delete reading session"
                        disabled={deletingId === readingId}
                        onClick={() => handleDelete(readingId)}
                      >
                        <svg className={css.deleteIcon} aria-hidden="true">
                          <use href="/icons/sprite.svg#icon-trash" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Diary;
