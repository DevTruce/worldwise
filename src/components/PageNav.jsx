import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <Logo />
      <button
        className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonHidden : ""}`}
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ""}`}>
        <button
          className={styles.closeButton}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        <ul>
          <li>
            <NavLink to="/pricing" onClick={handleLinkClick}>
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" onClick={handleLinkClick}>
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.ctaLink} onClick={handleLinkClick}>
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PageNav;
