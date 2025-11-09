import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { BsSnow } from 'react-icons/bs';
import { useAuth } from '../../contexts/AuthContext';
import LoginButton from '../LoginButton/LoginButton';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <BsSnow className="header__logo-icon" />
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
          <div className="header__auth">
            {!loading && (user ? <ProfileDropdown /> : <LoginButton />)}
          </div>
          
          <NavLink to="/" className="header__link" onClick={closeMenu}>
            <span className="link-text">Головна</span>
          </NavLink>
          <NavLink to="/help" className="header__link" onClick={closeMenu}>
            <span className="link-text">Допомога</span>
          </NavLink>
          <NavLink to="/updates" className="header__link" onClick={closeMenu}>
            <span className="link-text">Оновлення</span>
          </NavLink>
          <NavLink to="/shop" className="header__link" onClick={closeMenu}>
            <span className="link-text">Магазин</span>
          </NavLink>
          <NavLink to="/staff" className="header__link" onClick={closeMenu}>
            <span className="link-text">Персонал</span>
          </NavLink>
        </nav>
      </div>
      
      {/* Overlay для закриття меню при кліку поза ним */}
      {isMenuOpen && (
        <div className="header__overlay" onClick={closeMenu} />
      )}
    </header>
  );
};

export default Header;
