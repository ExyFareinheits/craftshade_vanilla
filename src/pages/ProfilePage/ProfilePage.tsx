import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaCrown } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.scss';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }

    // Перевірка параметру success після авторизації
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      // Очищаємо URL
      window.history.replaceState({}, '', '/profile');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-page__loading">Завантаження...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png?size=256`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <div className="profile-page">
      <div className="profile-page__container">
        {showSuccess && (
          <motion.div
            className="profile-page__success"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            ✅ Успішно авторизовано!
          </motion.div>
        )}

        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-card__header">
            <img src={avatarUrl} alt={user.username} className="profile-card__avatar" />
            <div className="profile-card__info">
              <h1 className="profile-card__username">
                {user.username}
                {user.discriminator !== '0' && `#${user.discriminator}`}
              </h1>
              <div className="profile-card__badge">
                <FaDiscord />
                <span>Discord Account</span>
              </div>
            </div>
          </div>

          <div className="profile-card__section">
            <h2 className="profile-card__section-title">
              <FaCrown />
              Твої ролі на Discord сервері
            </h2>

            {user.roles && user.roles.length > 0 ? (
              <div className="profile-card__roles">
                {user.roles.map((role) => (
                  <div
                    key={role.id}
                    className="role-badge"
                    style={{
                      backgroundColor: role.color !== 0 
                        ? `#${role.color.toString(16).padStart(6, '0')}` 
                        : 'rgba(114, 137, 218, 0.2)',
                      borderColor: role.color !== 0 
                        ? `#${role.color.toString(16).padStart(6, '0')}` 
                        : 'rgba(114, 137, 218, 0.5)',
                    }}
                  >
                    {role.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="profile-card__hint">
                🎭 Тебе не знайдено на нашому Discord сервері або у тебе немає ролей.
              </p>
            )}
          </div>

          <div className="profile-card__section">
            <h2 className="profile-card__section-title">Статистика</h2>
            <div className="profile-card__stats">
              <div className="stat-item">
                <span className="stat-item__label">Час на сервері:</span>
                <span className="stat-item__value">--</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__label">Баланс:</span>
                <span className="stat-item__value">--</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__label">Квестів виконано:</span>
                <span className="stat-item__value">--</span>
              </div>
            </div>
            <p className="profile-card__hint">
              Статистика буде доступна після прив'язки Minecraft аккаунта
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
