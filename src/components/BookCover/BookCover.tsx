interface BookCoverProps {
  imageUrl?: string | null;
  title: string;
  className?: string;
}

const BookCover = ({ imageUrl, title, className }: BookCoverProps) => {
  if (imageUrl) {
    return (
      <img
        className={className}
        src={imageUrl}
        alt={`${title} cover`}
        loading="lazy"
      />
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 280 425"
      role="img"
      aria-label={`${title} cover placeholder`}
    >
      <use href="/icons/sprite.svg#icon-book-placeholder" />
    </svg>
  );
};

export default BookCover;
