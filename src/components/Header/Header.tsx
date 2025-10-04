import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-text">Craftshade</span>
        </Link>

        <button 
          className={`header__burger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/" className="header__link" onClick={closeMenu}>
            Головна
          </NavLink>
          <NavLink to="/help" className="header__link" onClick={closeMenu}>
            Допомога
          </NavLink>
          <NavLink to="/updates" className="header__link" onClick={closeMenu}>
            Оновлення
          </NavLink>
          <NavLink to="/shop" className="header__link" onClick={closeMenu}>
            Магазин
          </NavLink>
          <NavLink to="/staff" className="header__link" onClick={closeMenu}>
            Персонал
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
