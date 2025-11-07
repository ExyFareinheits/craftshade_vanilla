import './SnowEffect.scss';

// Оптимізована версія з CSS анімаціями замість canvas
const SnowEffect = () => {
  // Генеруємо тільки 30 сніжинок замість 100 для кращої продуктивності
  const snowflakes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${10 + Math.random() * 10}s`,
    size: `${2 + Math.random() * 3}px`,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className="snow-effect">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDelay: flake.animationDelay,
            animationDuration: flake.animationDuration,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
