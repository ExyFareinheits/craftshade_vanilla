import { SERVER_CONFIG } from '@/constants/server';
import { CONTACT_INFO } from '@/constants/staff';
import { FaDiscord, FaEnvelope, FaServer } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { BsSnow } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { useState } from 'react';
import './Footer.scss';

const Footer = () => {
  const [copiedIP, setCopiedIP] = useState(false);

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_CONFIG.ip);
      setCopiedIP(true);
      setTimeout(() => setCopiedIP(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__decorative-line" />
      
      <div className="footer__container">
        <div className="footer__section footer__section--brand">
          <div className="footer__brand">
            <BsSnow className="brand-icon" />
            <h3 className="footer__title">Craftshade</h3>
          </div>
          <p className="footer__text">Vanilla+ Minecraft сервер</p>
          <p className="footer__text footer__text--version">
            <FaServer className="version-icon" />
            Версія: {SERVER_CONFIG.version}
          </p>
          <div className="footer__support">
            <p className="footer__text">Підтримка:</p>
            <div className="support-badges">
              {SERVER_CONFIG.support.map((item) => (
                <span key={item} className="support-badge">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__section footer__section--connect">
          <h3 className="footer__title">Підключення</h3>
          <div className="footer__ip-container">
            <div className="footer__ip">{SERVER_CONFIG.ip}</div>
            <button 
              className={`copy-ip-btn ${copiedIP ? 'copied' : ''}`}
              onClick={copyIP}
              aria-label="Copy IP"
            >
              <MdContentCopy />
              <span className="copy-tooltip">
                {copiedIP ? 'Скопійовано!' : 'Копіювати'}
              </span>
            </button>
          </div>
          <p className="footer__guide">
            Натисни кнопку копіювання і вставте IP в Minecraft
          </p>
        </div>

        <div className="footer__section footer__section--social">
          <h3 className="footer__title">Соціальні мережі</h3>
          <div className="social-links">
            <a
              href={CONTACT_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link--discord"
              aria-label="Discord"
            >
              <FaDiscord className="social-icon" />
              <div className="social-content">
                <span className="social-name">Discord</span>
                <span className="social-desc">Приєднуйся до спільноти</span>
              </div>
            </a>
            <a
              href={`https://www.tiktok.com/${CONTACT_INFO.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link--tiktok"
              aria-label="TikTok"
            >
              <SiTiktok className="social-icon" />
              <div className="social-content">
                <span className="social-name">TikTok</span>
                <span className="social-desc">@{CONTACT_INFO.tiktok}</span>
              </div>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="social-link social-link--email"
              aria-label="Email"
            >
              <FaEnvelope className="social-icon" />
              <div className="social-content">
                <span className="social-name">Email</span>
                <span className="social-desc">Написати листа</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <div className="footer__bottom-content">
          <p className="copyright">
            <BsSnow className="copyright-icon" />
            &copy; 2024 Craftshade. Всі права захищені.
          </p>
          <p className="made-with">
            Створено з ❄️ для найкращої спільноти
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
