import { SERVER_CONFIG } from '@/constants/server';
import { CONTACT_INFO } from '@/constants/staff';
import { FaDiscord, FaEnvelope } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">Craftshade</h3>
          <p className="footer__text">Vanilla+ Minecraft сервер</p>
          <p className="footer__text">Версія: {SERVER_CONFIG.version}</p>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Підключення</h3>
          <p className="footer__ip">{SERVER_CONFIG.ip}</p>
          <div className="footer__support">
            <p className="footer__text">Підтримка:</p>
            {SERVER_CONFIG.support.map((item) => (
              <span key={item} className="support-badge">{item}</span>
            ))}
          </div>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Соціальні мережі</h3>
          <div className="social-links">
            <a
              href={CONTACT_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link--discord"
              aria-label="Discord"
            >
              <FaDiscord />
              <span>Discord</span>
            </a>
            <a
              href={`https://www.tiktok.com/${CONTACT_INFO.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link--tiktok"
              aria-label="TikTok"
            >
              <SiTiktok />
              <span>TikTok</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="social-link social-link--email"
              aria-label="Email"
            >
              <FaEnvelope />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p>&copy; 2024 Craftshade. Всі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;
