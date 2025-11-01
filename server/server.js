// server/server.js
import express from "express";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 токен твоего бота
const BOT_TOKEN = "8280337762:AAGNvUSZYh1Ap2p_Xwp5r3yCX4stL7T4qT4";
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// 🗂️ Хранилище ID пользователей, у кого включены уведомления
let users = new Set();

/* ================================
   TELEGRAM: приветствие и кнопки
================================= */

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "👋 Привет! Это ChinaOrderBot — твой помощник в заказах из Китая.", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "🧭 Открыть мини-приложение",
            web_app: { url: "https://china-miniapp-bot.vercel.app" }, // ← сюда вставь ссылку на своё mini-app
          },
        ],
        [
          { text: "ℹ️ О проекте" },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

// обработчик кнопки «О проекте»
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "ℹ️ О проекте") {
    bot.sendMessage(
      chatId,
      "📦 ChinaOrderBot — это обучающее мини-приложение, которое поможет тебе освоить заказ товаров с китайских площадок (1688, Taobao, Poizon и др.).\n\n🚀 Начни обучение прямо в мини-аппе!"
    );
  }
});

/* ================================
   API для mini-app
================================= */

// включить уведомления
app.post("/api/notifications/on", (req, res) => {
  const { userId } = req.body;
  if (!userId)
    return res.status(400).json({ success: false, error: "Нет userId" });

  users.add(userId);
  console.log(`✅ Уведомления ВКЛ для пользователя ${userId}`);
  res.json({ success: true });
});

// выключить уведомления
app.post("/api/notifications/off", (req, res) => {
  const { userId } = req.body;
  if (!userId)
    return res.status(400).json({ success: false, error: "Нет userId" });

  users.delete(userId);
  console.log(`🚫 Уведомления ВЫКЛ для пользователя ${userId}`);
  res.json({ success: true });
});

/* ================================
   Рассылка уведомлений
================================= */

// ⏰ каждую минуту (для теста)
cron.schedule("*/1 * * * *", async () => {
  console.log(`⏰ Отправка уведомлений ${users.size} пользователям...`);
  for (const id of users) {
    try {
      await bot.sendMessage(
        id,
        "📢 Привет от ChinaOrderBot! Не забудь пройти обучение сегодня 😉"
      );
    } catch (err) {
      console.warn("❌ Ошибка при отправке пользователю", id, err.message);
    }
  }
});

/* ================================
   Запуск сервера
================================= */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Сервер уведомлений запущен на порту ${PORT}`);
});
