import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import './ProfileDropdown.scss';

const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        className="profile-dropdown__trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={avatarUrl}
          alt={user.username}
          className="profile-dropdown__avatar"
        />
        <span className="profile-dropdown__username">{user.username}</span>
        <FaChevronDown className={`profile-dropdown__arrow ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="profile-dropdown__menu">
          <Link
            to="/profile"
            className="profile-dropdown__item"
            onClick={() => setIsOpen(false)}
          >
            <FaUser />
            <span>Профіль</span>
          </Link>
          <button
            className="profile-dropdown__item profile-dropdown__item--danger"
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            <FaSignOutAlt />
            <span>Вийти</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
