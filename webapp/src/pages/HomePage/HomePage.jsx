import React from "react";
import { useNavigate } from "react-router-dom";
import BurgerMenu from "../../components/BurgerMenu";
import "./HomePage.css";
import logo from "./logo.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Бургер-меню */}
      <BurgerMenu />

      {/* Размытый логотип */}
      <div
        className="background-logo"
        style={{ backgroundImage: `url(${logo})` }}
      />

      {/* Главный контент */}
      <main className="main-content">
        <h1>ChinaOrderBot</h1>
        <p className="subtitle">
          Ваш персональный помощник в мире китайских заказов.  
          Учитесь и шаг за шагом заказывайте на китайских площадках.  
          Всё в ваших руках.
        </p>

        <div className="buttons">
          <button onClick={() => navigate("/learning")}>Начать обучение</button>
          <button onClick={() => navigate("/assistant")}>ИИ-ассистент</button>
          <button onClick={() => navigate("/exit")}>Выйти</button>
        </div>
      </main>
    </div>
  );
}
