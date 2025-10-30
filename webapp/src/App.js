import React from "react";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b2d24] text-white text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md"
      >
        <h1 className="text-4xl font-bold mb-4 tracking-wide">
          DailyDeals: Обучение по Китаю 🇨🇳
        </h1>

        <p className="text-white/80 mb-10 text-lg leading-relaxed">
          Научись заказывать товары из Китая без посредников, экономить и
          зарабатывать. Всё просто, шаг за шагом.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#1b1b1b] text-black font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg hover:bg-[#2a2a2a] transition-all w-full"
        >
          Начать обучение
        </motion.button>

        <p className="mt-6 text-sm text-white/60">
          Сделано с ❤️ DailyDeals | Никита Дмитриевич
        </p>
      </motion.div>
    </div>
  );
}

export default App;
