import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCreditCard, FaCheckCircle, FaClipboard, FaDiscord } from 'react-icons/fa';
import './PaymentPage.scss';

interface OrderData {
  item: string;
  price: number;
  timestamp: number;
}

const CONTACT_INFO = {
  discord: 'https://discord.gg/YG6t2gZM26',
  monobank: '5375 4112 0578 7331',
};

const PAYMENT_INSTRUCTIONS = [
  'Ваш псевдонім (в грі + Discord)',
  'Ваше реальне ім\'я',
  'Ваша послуга',
  'Підтвердити в Discord покупку чеком',
];

const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CS-${timestamp}-${random}`;
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderCopied, setOrderCopied] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Отримуємо дані з sessionStorage
    const storedData = sessionStorage.getItem('pendingOrder');
    if (storedData) {
      const data = JSON.parse(storedData) as OrderData;
      setOrderData(data);
      setOrderId(generateOrderId());
      // Очищаємо sessionStorage після отримання
      sessionStorage.removeItem('pendingOrder');
    }
  }, []);

  const copyToClipboard = (text: string, type: 'card' | 'order') => {
    navigator.clipboard.writeText(text);
    if (type === 'card') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setOrderCopied(true);
      setTimeout(() => setOrderCopied(false), 2000);
    }
  };

  const handlePayment = () => {
    if (!confirmed) {
      alert('Будь ласка, підтвердіть що ви ознайомились з інструкціями');
      return;
    }
    window.open(CONTACT_INFO.discord, '_blank');
  };

  const handleBackToShop = () => {
    // Закриваємо вкладку якщо можливо, або навігуємо на магазин
    if (window.opener) {
      window.close();
    } else {
      navigate('/shop');
    }
  };

  if (!orderData) {
    return (
      <div className="payment-page">
        <div className="payment-page__container">
          <div className="error-message">
            <h2>Помилка</h2>
            <p>Не вибрано товар для оплати</p>
            <p className="error-hint">Будь ласка, поверніться до магазину та виберіть товар</p>
            <button onClick={handleBackToShop} className="back-button">
              Повернутись до магазину
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { item, price } = orderData;

  return (
    <div className="payment-page">
      <div className="payment-page__container">
        <motion.h1
          className="payment-page__title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <FaCreditCard /> Оформлення оплати
        </motion.h1>

        {/* Номер замовлення */}
        <motion.div
          className="order-id-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3>Номер вашого замовлення:</h3>
          <div className="order-id">
            <span className="order-id__value">{orderId}</span>
            <button
              className="copy-button copy-button--small"
              onClick={() => copyToClipboard(orderId, 'order')}
              title="Копіювати номер замовлення"
            >
              <FaClipboard />
              {orderCopied && <span className="copied-tooltip">Скопійовано!</span>}
            </button>
          </div>
          <p className="order-id__note">
            💡 Збережіть цей номер! Він знадобиться для підтвердження оплати в Discord
          </p>
        </motion.div>

        <motion.div
          className="order-summary"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Ваше замовлення</h2>
          <div className="order-item">
            <span className="order-item__name">{item}</span>
            <span className="order-item__price">{price} грн</span>
          </div>
          <div className="order-total">
            <span>До сплати:</span>
            <span className="total-price">{price} грн</span>
          </div>
        </motion.div>

        <motion.div
          className="payment-card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="payment-card__title">Реквізити для оплати</h2>
          
          <div className="card-number">
            <span className="card-label">Картка Monobank:</span>
            <div className="card-value">
              <span>{CONTACT_INFO.monobank}</span>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(CONTACT_INFO.monobank, 'card')}
                title="Копіювати"
              >
                <FaClipboard />
                {copied && <span className="copied-tooltip">Скопійовано!</span>}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="instructions"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="instructions__title">Інструкція з оплати</h2>
          <div className="instructions__content">
            <p className="instructions__intro">
              Для завершення покупки, будь ласка, дотримуйтесь наступних кроків:
            </p>
            
            <ol className="steps-list">
              {PAYMENT_INSTRUCTIONS.map((instruction, index) => (
                <li key={index} className="step-item">
                  <span className="step-number"></span>
                  <span className="step-text">{instruction}</span>
                </li>
              ))}
            </ol>

            <div className="important-note">
              <h3>⚠️ Важливо!</h3>
              <ul>
                <li>Послуга видається протягом <strong>24 годин</strong> після підтвердження оплати</li>
                <li>Обов'язково надішліть <strong>номер замовлення ({orderId})</strong> та чек в Discord</li>
                <li>Вказуйте точний нікнейм в грі та Discord</li>
                <li>Без підтвердження в Discord замовлення не буде оброблене</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="confirmation"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <FaCheckCircle className={`check-icon ${confirmed ? 'checked' : ''}`} />
            <span>Я ознайомився з інструкціями та готовий здійснити оплату</span>
          </label>
        </motion.div>

        <motion.div
          className="action-buttons"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            className="payment-button"
            onClick={handlePayment}
            disabled={!confirmed}
          >
            <FaDiscord /> Підтвердити в Discord
          </button>
          <button className="back-button" onClick={handleBackToShop}>
            {window.opener ? 'Закрити вкладку' : 'Повернутись до магазину'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
