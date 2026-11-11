import type { BookDetails } from "../../types/book";
import css from "./MyBook.module.css";

interface MyBookProps {
  book: BookDetails;
}

const MyBook = ({ book }: MyBookProps) => {
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
          <p className={css.pages}>{book.totalPages} pages</p>

          <span className={css.status}>In progress</span>
        </div>
      </div>
    </section>
  );
};

export default MyBook;
