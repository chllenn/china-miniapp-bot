import React from "react";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald text-white">
      <h1 className="text-4xl font-bold mb-6">🇨🇳 China Mini App</h1>
      <p className="mb-8 text-lg text-center text-white/90 max-w-md">
        Добро пожаловать в обучающее мини-приложение по заказу товаров из Китая.
      </p>
      <button className="bg-graphite text-black px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-700 transition-all shadow-lg">
        Войти в мини-приложение
      </button>
    </div>
  );
}

export default App;
