import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import css from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${css.navLink} ${isActive ? css.active : ""}`;

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);

    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Could not end your session on the server. You have been logged out on this device.",
      );
    } finally {
      navigate("/");
    }
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo variant="auth" />

        <div className={css.mobileControls}>
          <div className={css.mobileAvatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <button
            type="button"
            className={css.burgerButton}
            onClick={handleMenuToggle}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="user-navigation"
          >
            <svg className={css.menuIcon} aria-hidden="true">
              <use
                href={`/icons/sprite.svg#icon-${isMenuOpen ? "x" : "menu"}`}
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <button
            type="button"
            className={css.backdrop}
            onClick={handleMenuClose}
            aria-label="Close navigation menu"
          />
        )}

        <nav
          id="user-navigation"
          className={`${css.navigation} ${
            isMenuOpen ? css.navigationOpen : ""
          }`}
          aria-label="Main navigation"
        >
          <button
            type="button"
            className={css.closeButton}
            onClick={handleMenuClose}
            aria-label="Close navigation menu"
          >
            <svg className={css.closeIcon} aria-hidden="true">
              <use href="/icons/sprite.svg#icon-exit" />
            </svg>
          </button>

          <ul className={css.navList}>
            <li className={css.navItem}>
              <NavLink
                to="/recommended"
                className={getNavLinkClass}
                onClick={handleMenuClose}
              >
                Home
              </NavLink>
            </li>

            <li className={css.navItem}>
              <NavLink
                to="/library"
                className={getNavLinkClass}
                onClick={handleMenuClose}
              >
                My library
              </NavLink>
            </li>

            <li className={css.navItem}>
              <NavLink
                to="/reading"
                className={getNavLinkClass}
                onClick={handleMenuClose}
              >
                My training
              </NavLink>
            </li>
          </ul>

          <button
            type="button"
            className={css.logoutButtonMobile}
            onClick={handleLogout}
          >
            Log out
          </button>
        </nav>

        <div className={css.desktopUserBar}>
          <div className={css.userInfo}>
            <div className={css.userAvatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <span className={css.userName}>{user?.name}</span>
          </div>

          <button
            type="button"
            className={css.logoutButton}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
