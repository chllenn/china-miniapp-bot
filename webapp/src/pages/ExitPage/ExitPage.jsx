import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExitPage.css";

export default function ExitPage() {
  const [explode, setExplode] = useState(false);
  const [flash, setFlash] = useState(false);
  const [hideContent, setHideContent] = useState(false);
  const navigate = useNavigate();

  const handleExit = () => {
    // Сначала включаем анимацию разлёта
    setExplode(true);

    // Через 0.4 секунды показываем вспышку и скрываем контент
    setTimeout(() => {
      setFlash(true);
      setHideContent(true);
    }, 400);

    // Через 1 секунду закрываем Telegram WebApp
    setTimeout(() => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.close();
      } else {
        window.close();
      }
    }, 1000);
  };

  return (
    <div className="exit-container">
      {flash && <div className="flash-effect" />}
      {!hideContent && (
        <>
          <h2 className="exit-text">Вы уверены, что хотите выйти?</h2>
          <div className="exit-buttons">
            <button onClick={() => navigate("/")}>Вернуться</button>
            <button
              className={`exit ${explode ? "explode" : ""}`}
              onClick={handleExit}
            >
              Выйти
            </button>
          </div>
        </>
      )}
    </div>
  );
}
