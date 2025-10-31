import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "./logo.png";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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

      {/* Затемнение при открытом меню */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      {/* Боковое меню */}
      <nav className={`side-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/learning")}>Обучение</li>
          <li onClick={() => navigate("/assistant")}>ИИ-ассистент</li>
          <li onClick={() => navigate("/profile")}>Профиль</li>
          <li onClick={() => navigate("/settings")}>Настройки</li>
          <li onClick={() => navigate("/exit")}>Выход</li>
        </ul>
      </nav>

      {/* Главный контент */}
      <main className="main-content">
        <h1>ChinaOrderBot</h1>
        <p className="subtitle">
          Ваш персональный помощник в мире китайских заказов.  
          Пройдите обучение и научитесь безопасно заказывать с китайских площадок.  
          Всё под контролем — шаг за шагом!
        </p>

        <div className="buttons">
          <button onClick={() => navigate("/learning")}>Начать обучение</button>
          <button onClick={() => navigate("/assistant")}>ИИ-ассистент</button>
          <button onClick={() => navigate("/exit")}>Выйти</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
