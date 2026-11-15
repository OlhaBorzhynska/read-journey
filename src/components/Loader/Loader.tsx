import css from "./Loader.module.css";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  label?: string;
  showLabel?: boolean;
}

const Loader = ({
  size = "medium",
  label = "Loading...",
  showLabel = false,
}: LoaderProps) => {
  return (
    <div className={css.loader} role="status" aria-live="polite">
      <span className={`${css.spinner} ${css[size]}`} aria-hidden="true" />

      <span className={showLabel ? css.label : css.visuallyHidden}>
        {label}
      </span>
    </div>
  );
};

export default Loader;
