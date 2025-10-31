import React, { useState } from "react";
import "./ExitPage.css";

const ExitPage = () => {
  const [explode, setExplode] = useState(false);

  const handleExit = () => {
    setExplode(true);

    // Закрытие Telegram mini app после анимации
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

        {/* Фрагменты кнопки */}
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`fragment fragment-${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ExitPage;
