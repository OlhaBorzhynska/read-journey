import type { BookDetails } from "../../types/book";
import css from "./MyBook.module.css";

interface MyBookProps {
  book: BookDetails;
}

const MyBook = ({ book }: MyBookProps) => {
  const isReading = book.progress.some(
    (session) => session.status === "active",
  );

  return (
    <section className={css.myBook}>
      <div className={css.titleTimeWrapper}>
        <h2 className={css.title}>My reading</h2>
        {book.timeLeftToRead && (
          <p className={css.timeLeft}>
            {book.timeLeftToRead.hours} hours and {book.timeLeftToRead.minutes}{" "}
            minutes left
          </p>
        )}
      </div>

      <div className={css.bookInfo}>
        <img className={css.bookImage} src={book.imageUrl} alt={book.title} />

        <div className={css.bookDetails}>
          <h3 className={css.bookTitle}>{book.title}</h3>
          <p className={css.author}>{book.author}</p>

          <svg className={css.statusIcon} aria-hidden="true">
            <use
              href={
                book.status === "done"
                  ? "/icons/sprite.svg#icon-block-done"
                  : isReading
                    ? "/icons/sprite.svg#icon-block-stop"
                    : "/icons/sprite.svg#icon-block-start"
              }
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default MyBook;
