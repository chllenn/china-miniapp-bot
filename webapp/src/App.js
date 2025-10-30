import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emeraldDark text-black">
      <h1 className="text-3xl font-bold mb-8 text-white">China Import Helper</h1>

      <div className="flex flex-col gap-4 w-3/4 max-w-sm">
        <button className="bg-graphite text-white py-3 rounded-xl hover:bg-black transition-all">
          🚀 Начать обучение
        </button>
        <button className="bg-graphite text-white py-3 rounded-xl hover:bg-black transition-all">
          📦 Мои заказы
        </button>
        <button className="bg-graphite text-white py-3 rounded-xl hover:bg-black transition-all">
          🧭 О курсе
        </button>
      </div>

      <p className="text-sm text-gray-400 mt-10">
        DailyDeals — обучение импорту из Китая
      </p>
    </div>
  );
}

export default App;
