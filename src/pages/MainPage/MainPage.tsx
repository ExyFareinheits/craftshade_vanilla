import { motion } from 'framer-motion';
import { SERVER_CONFIG } from '@/constants/server';
import IceBlock3D from '@/components/IceBlock3D/IceBlock3D';
import { FaDiscord, FaGamepad, FaStar, FaUsers, FaShieldAlt, FaCrown } from 'react-icons/fa';
import { GiCrystalGrowth, GiWaterDrop, GiTreeBranch, GiSwordman, GiTreasureMap } from 'react-icons/gi';
import { BsSnow, BsLightningChargeFill } from 'react-icons/bs';
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
      {/* Hero Section з 3D кубом */}
      <section className="hero">
        <div className="hero__container">
          <motion.div
            className="hero__badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BsSnow /> Зимове оновлення 2025
          </motion.div>
          
          <motion.h1
            className="hero__title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Ласкаво просимо до <span className="gradient-text">Craftshade</span>
          </motion.h1>
          
          <IceBlock3D />
          
          <motion.p
            className="hero__subtitle"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            🎮 Сучасний Vanilla+ Minecraft сервер з унікальними механіками
          </motion.p>
          
          <motion.div
            className="hero__server-info"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="server-card">
              <span className="server-card__label">🌐 IP адреса:</span>
              <span className="server-card__value">{SERVER_CONFIG.ip}</span>
            </div>
            <div className="server-card">
              <span className="server-card__label">📦 Версія:</span>
              <span className="server-card__value">{SERVER_CONFIG.version}</span>
            </div>
            <div className="server-card">
              <span className="server-card__label">👥 Режим:</span>
              <span className="server-card__value">Vanilla+</span>
            </div>
          </motion.div>
        </div>
        
        {/* Декоративні 3D елементи */}
        <div className="hero__decorations">
          <div className="floating-crystal crystal-1">❄️</div>
          <div className="floating-crystal crystal-2">💎</div>
          <div className="floating-crystal crystal-3">✨</div>
          <div className="floating-crystal crystal-4">🔷</div>
        </div>
      </section>

      {/* Статистика серверу */}
      <section className="stats">
        <div className="stats__container">
          <motion.div
            className="stats__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="stat-card" variants={itemVariants}>
              <FaUsers className="stat-card__icon" />
              <div className="stat-card__value">Багато</div>
              <div className="stat-card__label">Активних гравців</div>
            </motion.div>
            
            <motion.div className="stat-card" variants={itemVariants}>
              <GiTreasureMap className="stat-card__icon" />
              <div className="stat-card__value">Понад 10+</div>
              <div className="stat-card__label">Унікальних квестів</div>
            </motion.div>
            
            <motion.div className="stat-card" variants={itemVariants}>
              <FaShieldAlt className="stat-card__icon" />
              <div className="stat-card__value">Універсальна</div>
              <div className="stat-card__label">Онлайн підтримка</div>
            </motion.div>
            
            <motion.div className="stat-card" variants={itemVariants}>
              <BsLightningChargeFill className="stat-card__icon" />
              <div className="stat-card__value">99.9%</div>
              <div className="stat-card__label">Аптайм серверу</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Унікальні механіки */}
      <section className="features">
        <div className="features__container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-header__title">
              <GiCrystalGrowth /> Унікальні механіки
            </h2>
            <p className="section-header__subtitle">
              Покращуємо ванільний Minecraft, зберігаючи його дух
            </p>
          </motion.div>
          
          <motion.div
            className="features__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">
                <GiSwordman />
              </div>
              <h3 className="feature-card__title">Система заточування</h3>
              <p className="feature-card__text">
                Покращуйте свої інструменти та зброю за допомогою спеціальних ресурсів. 
                Збільшуйте ефективність видобутку та силу атак!
              </p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">
                <GiTreeBranch />
              </div>
              <h3 className="feature-card__title">TreeCapitator</h3>
              <p className="feature-card__text">
                Зрубайте ціле дерево одним махом! Утримуйте SHIFT та рубайте дерева 
                швидше та ефективніше.
              </p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">
                <GiWaterDrop />
              </div>
              <h3 className="feature-card__title">Фільтрація води</h3>
              <p className="feature-card__text">
                Створюйте фільтри для очищення води! Система крафту фільтрів 
                додає реалізму та нові можливості виживання.
              </p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">
                <GiTreasureMap />
              </div>
              <h3 className="feature-card__title">Система квестів</h3>
              <p className="feature-card__text">
                Понад 50 унікальних квестів з винагородами! Виконуйте завдання, 
                досліджуйте світ та отримуйте ексклюзивні нагороди.
              </p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">
                <FaDiscord />
              </div>
              <h3 className="feature-card__title">Голосовий зв'язок</h3>
              <p className="feature-card__text">
                Інтеграція з Discord та Voicemod. Спілкуйтеся з друзями прямо в грі 
                через голосові канали!
              </p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-card__icon">
                <FaCrown />
              </div>
              <h3 className="feature-card__title">Leaf Shake</h3>
              <p className="feature-card__text">
                Труситьлистя дерев для отримання додаткових ресурсів. 
                Відкривайте нові способи здобування матеріалів!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Чому ми? */}
      <section className="why-us">
        <div className="why-us__container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-header__title">
              <FaStar /> Чому Craftshade?
            </h2>
          </motion.div>

          <motion.div
            className="why-us__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="reason-card" variants={itemVariants}>
              <div className="reason-card__number">01</div>
              <h3 className="reason-card__title">Баланс та справедливість</h3>
              <p className="reason-card__text">
                Ніяких Pay-to-Win механік. Усі донат-привілегії - лише косметичні 
                та не впливають на геймплей.
              </p>
            </motion.div>

            <motion.div className="reason-card" variants={itemVariants}>
              <div className="reason-card__number">02</div>
              <h3 className="reason-card__title">Активна спільнота</h3>
              <p className="reason-card__text">
                Дружня атмосфера, регулярні івенти, турніри та змагання. 
                Станьте частиною великої сім'ї!
              </p>
            </motion.div>

            <motion.div className="reason-card" variants={itemVariants}>
              <div className="reason-card__number">03</div>
              <h3 className="reason-card__title">Регулярні оновлення</h3>
              <p className="reason-card__text">
                Постійно додаємо нові механіки, квести та контент. 
                Сервер розвивається разом з гравцями!
              </p>
            </motion.div>

            <motion.div className="reason-card" variants={itemVariants}>
              <div className="reason-card__number">04</div>
              <h3 className="reason-card__title">Технічна стабільність</h3>
              <p className="reason-card__text">
                Потужне обладнання, захист від DDoS, регулярні бекапи. 
                Ваш прогрес завжди в безпеці!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA секція */}
      <section className="cta">
        <motion.div
          className="cta__container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta__icon-group">
            <FaGamepad className="cta__floating-icon" />
            <BsSnow className="cta__floating-icon" />
            <GiCrystalGrowth className="cta__floating-icon" />
          </div>
          
          <h2 className="cta__title">Готові розпочати пригоду?</h2>
          <p className="cta__text">
            Приєднуйтесь до тисяч гравців прямо зараз!<br />
            Скопіюйте IP та підключайтесь до серверу
          </p>
          
          <div className="cta__ip-box">
            <span className="cta__ip-label">IP адреса серверу:</span>
            <div className="cta__ip">{SERVER_CONFIG.ip}</div>
          </div>
          
          <div className="cta__links">
            <a href="/shop" className="cta__button cta__button--primary">
              <FaCrown /> Переглянути донати
            </a>
            <a href="/help" className="cta__button cta__button--secondary">
              <FaGamepad /> Як почати гру
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MainPage;
