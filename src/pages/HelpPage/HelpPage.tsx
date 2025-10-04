import { MECHANICS } from '@/constants/mechanics';
import './HelpPage.scss';

const HelpPage = () => {
  return (
    <div className="help-page">
      <div className="help-page__container">
        <h1 className="help-page__title">Механіки сервера</h1>
        <p className="help-page__intro">
          Craftshade пропонує унікальні механіки, які роблять гру цікавішою. 
          Більшість комбінацій працюють з поєднанням <strong>SHIFT</strong>.
        </p>

        <div className="mechanics">
          {MECHANICS.map((mechanic) => (
            <div key={mechanic.id} className="mechanic-card">
              <div className="mechanic-card__header">
                <span className="mechanic-card__number">{mechanic.id}</span>
                <h2 className="mechanic-card__title">{mechanic.title}</h2>
              </div>
              
              <p className="mechanic-card__description">{mechanic.description}</p>
              
              <div className="mechanic-card__usage">
                <h3>Як використовувати:</h3>
                <p>{mechanic.howToUse}</p>
              </div>

              {mechanic.tips && (
                <div className="mechanic-card__tips">
                  <span className="tips-icon">💡</span>
                  <p>{mechanic.tips}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
