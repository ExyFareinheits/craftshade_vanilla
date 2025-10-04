import './UpdatesPage.scss';

interface Update {
  id: number;
  date: string;
  version: string;
  type: 'update' | 'hotfix' | 'feature';
  title: string;
  changes: string[];
}

const UPDATES: Update[] = [
  {
    id: 1,
    date: '2024-01-15',
    version: '1.2.0',
    type: 'update',
    title: 'Оновлення механіки рубіння дерев',
    changes: [
      'Покращено баланс втрати міцності інструментів',
      'Додано підтримку всіх типів дерев',
      'Виправлено баг з дубами',
    ],
  },
  {
    id: 2,
    date: '2024-01-10',
    version: '1.1.1',
    type: 'hotfix',
    title: 'Hotfix: Виправлення критичних багів',
    changes: [
      'Виправлено краш при заточуванні предметів',
      'Виправлено дуплікацію предметів при розпилюванні',
    ],
  },
  {
    id: 3,
    date: '2024-01-05',
    version: '1.1.0',
    type: 'feature',
    title: 'Нова механіка: Трусіння листви',
    changes: [
      'Додано можливість швидко прибирати листя',
      'Додано дроп саджанців при труснні',
      'Оптимізація серверної продуктивності',
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

  return (
    <div className="updates-page">
      <div className="updates-page__container">
        <h1 className="updates-page__title">Оновлення та зміни</h1>
        <p className="updates-page__subtitle">
          Останні новини та покращення сервера Craftshade
        </p>

        <div className="timeline">
          {UPDATES.map((update) => (
            <div key={update.id} className="update-card">
              <div className="update-card__header">
                <div className="update-card__meta">
                  <span className={`update-card__badge update-card__badge--${getTypeColor(update.type)}`}>
                    {getTypeLabel(update.type)}
                  </span>
                  <span className="update-card__version">v{update.version}</span>
                </div>
                <span className="update-card__date">{update.date}</span>
              </div>

              <h2 className="update-card__title">{update.title}</h2>

              <ul className="update-card__changes">
                {update.changes.map((change, index) => (
                  <li key={index}>
                    <span className="bullet">•</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatesPage;
