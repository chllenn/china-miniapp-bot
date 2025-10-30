import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LearningPage() {
  const modules = [
    { id: 1, title: "Модуль 1 — Регистрация", subCount: 9 },
    { id: 2, title: "Модуль 2 — Поиск поставщиков", subCount: 5 },
    { id: 3, title: "Модуль 3 — Переговоры", subCount: 5 },
    { id: 4, title: "Модуль 4 — Оплата", subCount: 6 },
    { id: 5, title: "Модуль 5 — Логистика", subCount: 4 },
    { id: 6, title: "Модуль 6 — Таможня", subCount: 15 },
    { id: 7, title: "Модуль 7 — Работа с возвратами", subCount: 10 },
  ];

  // === Загружаем состояние напрямую из localStorage ===
  const getSavedProgress = () => {
    try {
      const saved = localStorage.getItem("chinaLearningProgress");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Ошибка чтения localStorage:", e);
      return {};
    }
  };

  const [openModule, setOpenModule] = useState(null);
  const [passedTests, setPassedTests] = useState(getSavedProgress);
  const [completedModules, setCompletedModules] = useState(
    Object.keys(getSavedProgress()).length
  );

  const handleOpenModule = (id) => {
    setOpenModule(openModule === id ? null : id);
  };

  const handleStartTest = (moduleId) => {
    const confirmStart = window.confirm("🧠 Пройти тест по этому модулю?");
    if (confirmStart) {
      const passed = Math.random() > 0.1; // имитация
      if (passed) {
        alert("✅ Тест успешно пройден! Прогресс сохранён.");
        if (!passedTests[moduleId]) {
          const updated = { ...passedTests, [moduleId]: true };
          setPassedTests(updated);
          setCompletedModules(Object.keys(updated).length);
          localStorage.setItem("chinaLearningProgress", JSON.stringify(updated));
        }
      } else {
        alert("❌ Недостаточно правильных ответов. Попробуй снова!");
      }
    }
  };

  const progress = (completedModules / modules.length) * 100;

  // сброс прогресса вручную
  const handleReset = () => {
    if (window.confirm("Сбросить весь прогресс обучения?")) {
      localStorage.removeItem("chinaLearningProgress");
      setPassedTests({});
      setCompletedModules(0);
      alert("Прогресс обнулён ✅");
    }
  };

  return (
    <div className="min-h-screen bg-[#013220] text-white flex flex-col items-center px-4 py-8">
      {/* Заголовок */}
      <div className="flex justify-between items-center w-full max-w-2xl mb-6">
        <h1 className="text-2xl font-bold">📘 Обучение</h1>
        <span className="text-lg font-semibold">{completedModules}/7</span>
      </div>

      {/* Прогресс-бар */}
      <div className="relative w-full max-w-2xl h-5 bg-transparent border border-white rounded-full overflow-hidden mb-10">
        <div
          className="bg-white h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Список модулей */}
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {modules.map((mod) => (
          <div key={mod.id}>
            <button
              onClick={() => handleOpenModule(mod.id)}
              className={`w-full ${
                passedTests[mod.id]
                  ? "bg-green-700"
                  : "bg-black hover:bg-gray-900"
              } text-white font-semibold py-3 rounded-xl transition`}
            >
              {mod.title}
            </button>

            {openModule === mod.id && (
              <div className="mt-2 ml-4 flex flex-col gap-2">
                {[...Array(mod.subCount)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      alert(`📄 Модуль ${mod.id}.${i + 1} — PDF добавим позже`)
                    }
                    className="w-full bg-gray-800 hover:bg-gray-700 text-sm py-2 rounded-lg transition"
                  >
                    Модуль {mod.id}.{i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handleStartTest(mod.id)}
                  className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-2 rounded-lg mt-2 transition"
                >
                  🧠 Пройти тест
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Кнопка назад */}
      <Link
        to="/"
        className="mt-10 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all"
      >
        ⬅ Назад на главную
      </Link>

      {/* Сброс */}
      <button
        onClick={handleReset}
        className="mt-4 text-sm text-gray-400 hover:text-white underline"
      >
        🔄 Сбросить прогресс
      </button>
    </div>
  );
}
