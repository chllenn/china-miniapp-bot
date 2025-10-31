import React, { useState } from "react";
import "./ExitPage.css";

const ExitPage = () => {
  const [explode, setExplode] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handleExit = () => {
    setExplode(true);
    setShowFlash(true);

    // скрываем вспышку чуть позже
    setTimeout(() => setShowFlash(false), 300);

    // закрытие Telegram mini app
    setTimeout(() => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.close();
      } else {
        window.close();
      }
    }, 2000);
  };

  return (
    <div className="exit-container">
      <div className={`exit-button ${explode ? "explode" : ""}`} onClick={handleExit}>
        <span>Выйти из приложения</span>

        {/* Кубики */}
        {[...Array(16)].map((_, i) => (
          <div key={i} className={`fragment fragment-${i + 1}`} />
        ))}
      </div>

      {/* Вспышка */}
      {showFlash && <div className="flash-effect" />}

      {/* Частицы */}
      {explode &&
        [...Array(25)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${50 + (Math.random() * 20 - 10)}%`,
            top: `${50 + (Math.random() * 10 - 5)}%`,
            animationDelay: `${Math.random() * 0.2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }} />
        ))}
    </div>
  );
};

export default ExitPage;
