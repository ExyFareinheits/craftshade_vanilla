import { motion } from 'framer-motion';
import { FaClock, FaUserTie, FaDiscord, FaEnvelope } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { STAFF_SCHEDULE, CONTACT_INFO } from '@/constants/staff';
import './StaffPage.scss';

const StaffPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div className="staff-page">
      <div className="staff-page__container">
        <motion.h1
          className="staff-page__title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <FaUserTie /> Графік роботи персоналу
        </motion.h1>

        <motion.p
          className="staff-page__subtitle"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Наша команда завжди на зв'язку щоб допомогти вам
        </motion.p>

        <motion.div
          className="schedule-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {STAFF_SCHEDULE.map((schedule, index) => (
            <motion.div
              key={index}
              className="schedule-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="schedule-card__header">
                <h2 className="schedule-card__role">{schedule.role}</h2>
                <FaClock className="schedule-card__icon" />
              </div>

              <div className="schedule-card__times">
                <div className="time-block">
                  <span className="time-label">Будні дні:</span>
                  <span className="time-value">{schedule.weekday}</span>
                </div>
                <div className="time-block">
                  <span className="time-label">Вихідні:</span>
                  <span className="time-value">{schedule.weekend}</span>
                </div>
                <div className="time-block time-block--break">
                  <span className="time-label">Перерва:</span>
                  <span className="time-value">{schedule.break}</span>
                </div>
              </div>

              {schedule.members && schedule.members.length > 0 && (
                <div className="schedule-card__members">
                  <h4>Персонал:</h4>
                  <div className="members-list">
                    {schedule.members.map((member, idx) => (
                      <span key={idx} className="member-badge">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Контактна інформація */}
        <motion.div
          className="contact-section"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="contact-section__title">Зв'яжіться з нами</h2>
          <div className="contact-grid">
            <a
              href={CONTACT_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card--discord"
            >
              <FaDiscord className="contact-card__icon" />
              <span className="contact-card__label">Discord</span>
              <span className="contact-card__value">Приєднатись</span>
            </a>

            <a
              href={`https://www.tiktok.com/${CONTACT_INFO.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card--tiktok"
            >
              <SiTiktok className="contact-card__icon" />
              <span className="contact-card__label">TikTok</span>
              <span className="contact-card__value">{CONTACT_INFO.tiktok}</span>
            </a>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="contact-card contact-card--email"
            >
              <FaEnvelope className="contact-card__icon" />
              <span className="contact-card__label">Email</span>
              <span className="contact-card__value">{CONTACT_INFO.email}</span>
            </a>
          </div>
        </motion.div>

        {/* Додаткова інформація */}
        <motion.div
          className="info-banner"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p>
            💡 <strong>Порада:</strong> Для швидшої відповіді рекомендуємо звертатись в Discord
            у відповідні канали підтримки. Наша команда намагається відповідати якомога швидше!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StaffPage;
