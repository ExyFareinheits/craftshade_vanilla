import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCrown, FaTicketAlt, FaGem } from 'react-icons/fa';
import { PREMIUM_BENEFITS, SHOP_ITEMS } from '@/constants/server';
import { DONATIONS, calculateDiscount } from '@/constants/donations';
import './ShopPage.scss';

const ShopPage = () => {
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false);

  const handlePurchase = (itemName: string, itemPrice: number) => {
    // Зберігаємо дані в sessionStorage для нової вкладки
    const orderData = {
      item: itemName,
      price: itemPrice,
      timestamp: Date.now()
    };
    sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
    
    // Відкриваємо в новій вкладці
    window.open('/payment', '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="shop-page">
      <div className="shop-page__container">
        <motion.h1
          className="shop-page__title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Онлайн-магазин
        </motion.h1>
        <motion.p
          className="shop-page__subtitle"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Підтримайте сервер та отримайте ексклюзивні переваги
        </motion.p>

        {/* Тогл для перегляду цін з Premium */}
        <div className="premium-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
            />
            <span>Показати ціни з Premium (-10%)</span>
          </label>
        </div>

        {/* Прохідки та Premium */}
        <motion.div
          className="shop-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="product-card" variants={itemVariants}>
            <div className="product-card__header">
              <h2 className="product-card__title">Прохідка на сервер</h2>
              <FaTicketAlt className="product-card__icon" />
            </div>

            <div className="product-card__pricing">
              <div className="price-item">
                <span className="price-item__label">Перша прохідка:</span>
                <span className="price-item__value price-item__value--free">
                  Безкоштовно
                </span>
              </div>
              <div className="price-item">
                <span className="price-item__label">Друга прохідка:</span>
                <span className="price-item__value">30 грн</span>
              </div>
            </div>

            <button
              className="product-card__button"
              onClick={() => handlePurchase('Прохідка на сервер', SHOP_ITEMS.secondPass.price)}
            >
              Отримати прохідку
            </button>
          </motion.div>

          <motion.div
            className="product-card product-card--premium"
            variants={itemVariants}
          >
            <div className="product-card__badge">Популярне</div>
            <div className="product-card__header">
              <h2 className="product-card__title">Premium доступ</h2>
              <FaCrown className="product-card__icon" />
            </div>

            <div className="product-card__price">35 грн</div>

            <div className="product-card__benefits">
              <h3>Що входить:</h3>
              <ul>
                {PREMIUM_BENEFITS.map((benefit, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="product-card__button product-card__button--premium"
              onClick={() => handlePurchase('Premium доступ', SHOP_ITEMS.premium.price)}
            >
              Купити Premium
            </button>
          </motion.div>
        </motion.div>

        {/* Донати */}
        <motion.div
          className="donations-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="section-title">
            <FaGem /> Донат привілегії
          </h2>
          <motion.div
            className="donations-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {DONATIONS.map((donation) => {
              const finalPrice = calculateDiscount(donation.price, isPremium);
              const hasDiscount = isPremium && donation.price >= 30;

              return (
                <motion.div
                  key={donation.id}
                  className="donation-card"
                  variants={itemVariants}
                  style={{ borderColor: donation.color }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="donation-card__header"
                    style={{ background: `linear-gradient(135deg, ${donation.color}22, ${donation.color}44)` }}
                  >
                    <h3 className="donation-card__name" style={{ color: donation.color }}>
                      {donation.name}
                    </h3>
                    <span className="donation-card__role">{donation.role}</span>
                  </div>

                  <div className="donation-card__price">
                    {hasDiscount && (
                      <span className="old-price">{donation.price} грн</span>
                    )}
                    <span className="current-price">{finalPrice} грн</span>
                    {hasDiscount && <span className="discount-badge">-10%</span>}
                  </div>

                  <div className="donation-card__items">
                    <h4>Набори:</h4>
                    {donation.items.map((item, idx) => (
                      <span key={idx} className="kit-badge">{item}</span>
                    ))}
                  </div>

                  <div className="donation-card__features">
                    <h4>Переваги:</h4>
                    <ul>
                      {donation.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="donation-card__button"
                    style={{ background: donation.color }}
                    onClick={() => handlePurchase(`Донат ${donation.name}`, finalPrice)}
                  >
                    Купити за {finalPrice} грн
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Інформація */}
        <motion.div
          className="info-section"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="info-card">
            <h3 className="info-card__title">ℹ️ Важлива інформація</h3>
            <ul className="info-card__list">
              <li>Перша прохідка на сервер завжди безкоштовна</li>
              <li>При покупці Premium ви отримуєте можливість подарувати 1 прохідку</li>
              <li>Знижка -10% діє на всі привілегії від 30 грн (на прохідку не поширюється)</li>
              <li>Після покупки зміни застосовуються автоматично протягом 24 годин</li>
              <li>Всі донати видаються після підтвердження оплати в Discord</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage;
