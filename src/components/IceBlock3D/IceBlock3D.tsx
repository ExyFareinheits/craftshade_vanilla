import { motion } from 'framer-motion';
import './IceBlock3D.scss';

// Оптимізована версія без складних обчислень
const IceBlock3D = () => {
  return (
    <motion.div
      className="ice-block-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="ice-block">
        <div className="ice-block__face ice-block__face--front"></div>
        <div className="ice-block__face ice-block__face--back"></div>
        <div className="ice-block__face ice-block__face--right"></div>
        <div className="ice-block__face ice-block__face--left"></div>
        <div className="ice-block__face ice-block__face--top"></div>
        <div className="ice-block__face ice-block__face--bottom"></div>
      </div>
    </motion.div>
  );
};

export default IceBlock3D;
