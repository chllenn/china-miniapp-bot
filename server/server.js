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

// 📦 Храним ID пользователей с включёнными уведомлениями
let users = new Set();

/* =============================
   Telegram логика
============================= */

// команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const opts = {
    reply_markup: {
      keyboard: [
        [
          { text: "Открыть мини-приложение", web_app: { url: "https://china-miniapp-5wr4qfh65-chllenns-projects.vercel.app" } }
        ],
        ["О проекте"],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };

  bot.sendMessage(
    chatId,
    "👋 Привет! Это ChinaOrderBot — обучающее мини-приложение по заказам из Китая.",
    opts
  );
});

// реакция на “О проекте”
bot.on("message", (msg) => {
  if (msg.text === "О проекте") {
    bot.sendMessage(
      msg.chat.id,
      "📦 ChinaOrderBot — обучающее приложение, которое научит тебя заказывать товары с AliExpress, 1688 и Taobao."
    );
  }
});

/* =============================
   API для мини-приложения
============================= */

app.post("/api/notifications/on", (req, res) => {
  const { userId } = req.body;
  if (!userId)
    return res.status(400).json({ success: false, error: "Нет userId" });

  users.add(userId);
  console.log(`✅ Уведомления ВКЛ для пользователя ${userId}`);
  res.json({ success: true });
});

app.post("/api/notifications/off", (req, res) => {
  const { userId } = req.body;
  if (!userId)
    return res.status(400).json({ success: false, error: "Нет userId" });

  users.delete(userId);
  console.log(`🚫 Уведомления ВЫКЛ для пользователя ${userId}`);
  res.json({ success: true });
});

/* =============================
   Автоматическая рассылка
============================= */

cron.schedule("*/1 * * * *", async () => {
  console.log(`⏰ Отправка уведомлений ${users.size} пользователям...`);
  for (const id of users) {
    try {
      await bot.sendMessage(id, "📢 Привет от ChinaOrderBot! Не забудь сегодня пройти обучение 😉");
    } catch (err) {
      console.warn("❌ Ошибка при отправке пользователю", id, err.message);
    }
  }
});

/* =============================
   Запуск сервера
============================= */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Сервер уведомлений запущен на порту ${PORT}`);
});
