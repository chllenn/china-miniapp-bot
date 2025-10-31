import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "./logo.png";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    setUser(tg?.initDataUnsafe?.user);
  }, []);

  const handleExit = () => {
    navigate("/exit");
  };

  return (
    <div className="home-container">
      {/* Размытый логотип */}
      <div
        className="background-logo"
        style={{ backgroundImage: `url(${logo})` }}
      />

      {/* Кнопка-бургер */}
      <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Подложка */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      {/* Боковое меню */}
      <nav className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-header">
          {user && (
            <>
              <img
                src={user.photo_url}
                alt="avatar"
                className="menu-avatar"
              />
              <p className="menu-username">
                {user.first_name} {user.last_name || ""}
              </p>
            </>
          )}
        </div>

        <ul>
          <li onClick={() => navigate("/learning")}>Обучение</li>
          <li onClick={() => navigate("/assistant")}>ИИ-ассистент</li>
          <li onClick={() => navigate("/profile")}>Профиль</li>
          <li onClick={() => navigate("/settings")}>Настройки</li>
          <li onClick={handleExit}>Выход</li>
        </ul>
      </nav>

      {/* Главный контент */}
      <main className="main-content">
        <h1>ChinaOrderBot</h1>
        <p className="subtitle">
          Ваш персональный помощник в мире китайских заказов.  
          Учитесь и шаг за шагом заказывайте на китайских площадках.  
          Все в ваших руках.
        </p>

        <div className="buttons">
          <button onClick={() => navigate("/learning")}>Начать обучение</button>
          <button onClick={() => navigate("/assistant")}>ИИ-ассистент</button>
          <button onClick={handleExit}>Выйти</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
