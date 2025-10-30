import React from "react";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#013220] text-white relative overflow-hidden">
      {/* Эффектный фон */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)]"></div>

      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10"
      >
        <h1 className="text-5xl font-bold mb-2 text-gold drop-shadow-lg">🇨🇳 China MiniApp</h1>
        <p className="text-gray-300 text-lg mb-10">Обучение заказам из Китая</p>
      </motion.div>

      {/* Основной контейнер */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-11/12 md:w-2/3 lg:w-1/2 bg-[#111111] rounded-3xl shadow-2xl border border-gold p-8 z-10"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gold">Твое обучение начинается здесь</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Добро пожаловать в курс по импорту товаров из Китая! 🚢  
          Здесь ты научишься находить поставщиков, оформлять заказы,  
          понимать логистику и даже зарабатывать на перепродаже.
        </p>

        <button className="bg-black text-gold font-bold py-3 px-8 rounded-xl border border-gold hover:bg-gold hover:text-black transition-all duration-300 shadow-md">
          🚀 Начать обучение
        </button>
      </motion.div>

      {/* Подпись */}
      <p className="mt-12 text-sm text-gray-400 z-10">
        © 2025 Никита Дмитриевич | DailyDeals
      </p>
    </div>
  );
}

export default App;
