import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LearningPage from "./LearningPage";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#013220] text-white overflow-hidden">

      {/* Кнопка-гамбургер */}
      <button
        className="absolute top-4 left-4 flex flex-col justify-between w-8 h-6 focus:outline-none z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="block w-full h-1 bg-white rounded-full"></span>
        <span className="block w-full h-1 bg-white rounded-full"></span>
        <span className="block w-full h-1 bg-white rounded-full"></span>
      </button>

      {/* Выезжающее меню */}
      <div
  className={`fixed top-0 left-0 h-full bg-black text-white w-64 transform ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out p-6 z-40`}
>
  <div className="mt-12">   {/* Отступ сверху */}
    <h2 className="text-2xl font-bold mb-6">Меню</h2>
    <nav className="flex flex-col gap-4">
      <Link to="/" className="hover:text-yellow-400 transition" onClick={() => setMenuOpen(false)}>
        🏠 Главная
      </Link>
      <Link to="/learning" className="hover:text-yellow-400 transition" onClick={() => setMenuOpen(false)}>
        📘 Обучение
      </Link>
      <button className="text-left hover:text-yellow-400 transition">💬 Чат с модератором</button>
      <button className="text-left hover:text-yellow-400 transition">🤖 ИИ-ассистент</button>
      <button className="text-left hover:text-yellow-400 transition">⚙️ Настройки</button>
    </nav>
  </div>
</div>


      {/* Основной контент */}
      <h1 className="text-4xl font-bold mb-6 mt-12">🇨🇳 China Import Helper</h1>
      <p className="mb-8 text-lg text-center text-white/90 max-w-md">
        Добро пожаловать в обучающее мини-приложение по заказу товаров из Китая.
      </p>

      <Link
        to="/learning"
        className="bg-gray-800 text-white px-8 py-4 rounded-2xl text-lg mb-4 hover:bg-gray-700 transition-all"
      >
        🚀 Начать обучение
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning" element={<LearningPage />} />
      </Routes>
    </Router>
  );
}
