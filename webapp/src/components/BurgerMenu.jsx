import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BurgerMenu.css";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const [user, setUser] = useState({ name: "", photo: "" });

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
      setUser({
        name: `${tgUser.first_name || ""} ${tgUser.last_name || ""}`.trim(),
        photo: tgUser.photo_url || "",
      });
    } else {
      setUser({
        name: "Пользователь",
        photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      });
    }
  }, []);

  // закрытие при клике вне меню
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <div
        ref={burgerRef}
        className={`burger-icon ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div ref={menuRef} className={`burger-menu ${isOpen ? "show" : ""}`}>
        <div className="menu-header">
          <img src={user.photo} alt="avatar" className="user-avatar" />
          <span className="user-name">{user.name}</span>
        </div>

        <div className="menu-items">
          <div
            className={`menu-item ${
              location.pathname === "/learning" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/learning")}
          >
            Обучение
          </div>
          <div
            className={`menu-item ${
              location.pathname === "/assistant" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/assistant")}
          >
            ИИ-ассистент
          </div>
          <div
            className={`menu-item ${
              location.pathname === "/track-check" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/track-check")}
          >
            Проверка трек-номеров
          </div>
          <div
            className={`menu-item ${
              location.pathname === "/profile" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/profile")}
          >
            Профиль
          </div>
          <div
            className={`menu-item ${
              location.pathname === "/settings" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/settings")}
          >
            Настройки
          </div>
          <div
            className={`menu-item ${
              location.pathname === "/exit" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/exit")}
          >
            Выход
          </div>
        </div>
      </div>
    </>
  );
}
