import { Link } from "react-router-dom";
import css from "./Logo.module.css";

interface LogoProps {
  variant?: "auth" | "header";
}

const Logo = ({ variant = "header" }: LogoProps) => {
  return (
    <Link to="/" className={`${css.logo} ${css[variant]}`}>
      <svg className={css.logoIcon}>
        <use href="/icons/sprite.svg#icon-Logo" />
      </svg>

      <span className={css.logoText}>READ JOURNEY</span>
    </Link>
  );
};

export default Logo;
