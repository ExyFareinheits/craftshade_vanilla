import { motion } from 'framer-motion';
import { SERVER_CONFIG } from '@/constants/server';
import './MainPage.scss';

const MainPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="main-page">
      <section className="hero">
        <div className="hero__container">
          <motion.h1
            className="hero__title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Ласкаво просимо до <span>Craftshade</span>
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Сучасний Vanilla+ Minecraft сервер
          </motion.p>
          <motion.div
            className="hero__server-info"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="server-card">
              <span className="server-card__label">IP адреса:</span>
              <span className="server-card__value">{SERVER_CONFIG.ip}</span>
            </div>
            <div className="server-card">
              <span className="server-card__label">Версія:</span>
              <span className="server-card__value">{SERVER_CONFIG.version}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="features">
        <div className="features__container">
          <motion.h2
            className="features__title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Чому Craftshade?
          </motion.h2>
          
          <motion.div
            className="features__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">⚡</div>
              <h3 className="feature-card__title">Vanilla+</h3>
              <p className="feature-card__text">
                Унікальні механіки які роблять гру цікавішою, але не ламають її логіку
              </p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">🛠️</div>
              <h3 className="feature-card__title">Заточування</h3>
              <p className="feature-card__text">
                Покращуйте свої інструменти для кращої ефективності
              </p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">🌳</div>
              <h3 className="feature-card__title">Рубіння дерев</h3>
              <p className="feature-card__text">
                Зрубайте ціле дерево за кілька ударів
              </p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">🎮</div>
              <h3 className="feature-card__title">Підтримка голосу</h3>
              <p className="feature-card__text">
                DiscordSRV та Voicemod для кращої комунікації
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="cta">
        <motion.div
          className="cta__container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta__title">Готові розпочати пригоду?</h2>
          <p className="cta__text">Підключайтесь до сервера прямо зараз!</p>
          <div className="cta__ip">{SERVER_CONFIG.ip}</div>
        </motion.div>
      </section>
    </div>
  );
};

export default MainPage;
