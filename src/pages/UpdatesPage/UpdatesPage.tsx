import { motion } from 'framer-motion';
import { GiTreasureMap, GiWaterDrop, GiCrystalGrowth } from 'react-icons/gi';
import { BsSnow } from 'react-icons/bs';
import { FaBug, FaRocket, FaStar } from 'react-icons/fa';
import './UpdatesPage.scss';

interface Update {
  id: number;
  date: string;
  version: string;
  type: 'update' | 'hotfix' | 'feature';
  title: string;
  changes: string[];
  icon?: JSX.Element;
}

const UPDATES: Update[] = [
  {
    id: 1,
    date: '2025-11-01',
    version: '2.1.0',
    type: 'feature',
    title: '❄️ Зимове оновлення: Система квестів',
    icon: <GiTreasureMap />,
    changes: [
      'Додано понад 10 унікальних квестів з різними рівнями складності',
      'Система винагород: отримуйте ексклюзивні предмети та ресурси',
      'Щоденні та тижневі квести для постійної активності',
      'Таблиця лідерів для найактивніших мисливців за квестами',
      'Інтеграція з системою досягнень',
    ],
  },
  {
    id: 2,
    date: '2025-10-03',
    version: '2.0.5',
    type: 'feature',
    title: '💧 Система фільтрації води',
    icon: <GiWaterDrop />,
    changes: [
      'Додано крафт водяних фільтрів з різних матеріалів',
      'Система очищення води: базовий, покращений та досконалий фільтри',
      'Очищена вода дає додаткові ефекти (регенерація, швидкість)',
      'Можливість створення постійних джерел чистої води',
      'Нові досягнення пов\'язані з фільтрацією',
    ],
  },
  {
    id: 3,
    date: '2025-10-06',
    version: '2.0.0',
    type: 'update',
    title: '🎨 Великий візуальний редизайн',
    icon: <BsSnow />,
    changes: [
      'Повністю оновлений дизайн сайту в зимовій тематиці',
      'Додано 3D анімовані елементи (льодовий куб, сніг)',
      'Оптимізація продуктивності: GPU прискорення для всіх анімацій',
      'Покращена мобільна версія з адаптивними ефектами',
      'Нова система навігації з анімованими переходами',
    ],
  },
  {
    id: 4,
    date: '2025-09-15',
    version: '1.5.2',
    type: 'update',
    title: '⚒️ Покращення системи заточування',
    icon: <GiCrystalGrowth />,
    changes: [
      'Додано нові рівні заточування (до рівня 10)',
      'Збалансовано витрату ресурсів для покращення',
      'Додано візуальні ефекти для заточених предметів',
      'Можливість зняти заточування та повернути частину ресурсів',
      'Система збереження заточування при ремонті',
    ],
  },
  {
    id: 5,
    date: '2025-09-10',
    version: '1.5.1',
    type: 'hotfix',
    title: '🐛 Виправлення критичних багів',
    icon: <FaBug />,
    changes: [
      'Виправлено краш при заточуванні деяких предметів',
      'Виправлено дуплікацію предметів при розпилюванні',
      'Виправлено проблему з втратою прогресу квестів',
      'Покращено стабільність серверу під високим навантаженням',
    ],
  },
  {
    id: 6,
    date: '2025-09-03',
    version: '1.5.0',
    type: 'feature',
    title: '🌳 Покращення TreeCapitator',
    icon: <FaRocket />,
    changes: [
      'Додано підтримку всіх типів дерев включно з величезними грибами',
      'Покращено баланс втрати міцності інструментів',
      'Додано опцію вимкнення для окремих типів дерев',
      'Оптимізовано алгоритм рубання для великих дерев',
      'Анімація падіння дерева стала більш плавною',
    ],
  },
  {
    id: 7,
    date: '2024-11-05',
    version: '1.4.0',
    type: 'feature',
    title: '🍃 Механіка трусіння листя',
    icon: <FaStar />,
    changes: [
      'Додано можливість швидко прибирати листя тримаючи SHIFT',
      'Підвищений дроп саджанців при труснні листя (30%)',
      'Додано шанс отримати золоті яблука з дубового листя',
      'Оптимізація серверної продуктивності',
      'Візуальні ефекти для трусіння листя',
    ],
  },
];

const UpdatesPage = () => {
  const getTypeColor = (type: Update['type']) => {
    switch (type) {
      case 'update':
        return 'blue';
      case 'hotfix':
        return 'red';
      case 'feature':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getTypeLabel = (type: Update['type']) => {
    switch (type) {
      case 'update':
        return 'Оновлення';
      case 'hotfix':
        return 'Hotfix';
      case 'feature':
        return 'Нова функція';
      default:
        return 'Зміни';
    }
  };

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
    <div className="updates-page">
      <div className="updates-page__container">
        <motion.div
          className="updates-page__header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-icon">
            <BsSnow />
          </div>
          <h1 className="updates-page__title">Оновлення та зміни</h1>
          <p className="updates-page__subtitle">
            Останні новини та покращення сервера Craftshade
          </p>
        </motion.div>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {UPDATES.map((update, index) => (
            <motion.div
              key={update.id}
              className="update-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <div className="update-card__timeline-marker">
                <div className="marker-icon">
                  {update.icon || <FaRocket />}
                </div>
                <div className="marker-line" />
              </div>

              <div className="update-card__content">
                <div className="update-card__header">
                  <div className="update-card__meta">
                    <span className={`update-card__badge update-card__badge--${getTypeColor(update.type)}`}>
                      {getTypeLabel(update.type)}
                    </span>
                    <span className="update-card__version">v{update.version}</span>
                  </div>
                  <span className="update-card__date">
                    📅 {new Date(update.date).toLocaleDateString('uk-UA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <h2 className="update-card__title">{update.title}</h2>

                <ul className="update-card__changes">
                  {update.changes.map((change, changeIndex) => (
                    <motion.li
                      key={changeIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: changeIndex * 0.1 }}
                    >
                      <span className="bullet">✨</span>
                      {change}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="updates-page__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>Більше оновлень уже в розробці! Слідкуйте за нашими соцмережами 🚀</p>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdatesPage;
