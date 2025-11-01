// server/server.js
import express from "express";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 токен твоего Telegram-бота
const BOT_TOKEN = "8280337762:AAGNvUSZYh1Ap2p_Xwp5r3yCX4stL7T4qT4";
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// 🌐 адрес мини-приложения
const WEB_APP_URL = "https://china-miniapp-5wr4qfh65-chllenns-projects.vercel.app";

// 📦 список пользователей, включивших уведомления
let users = new Set();

/* =============================
   1️⃣ Telegram логика
============================= */

// команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Открыть приложение", web_app: { url: WEB_APP_URL } },
          { text: "О проекте", callback_data: "about_project" },
        ],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    "👋 Привет! Это ChinaOrderBot — обучающее мини-приложение по заказам из Китая.\nВыбери действие ниже:",
    opts
  );
});

// обработка нажатия "О проекте"
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "about_project") {
    await bot.answerCallbackQuery(query.id);
    await bot.sendMessage(
      chatId,
      "📦 ChinaOrderBot — это обучающее мини-приложение, которое поможет тебе разобраться с заказами из Китая: AliExpress, 1688, Taobao, Poizon и другими площадками."
    );
  }
});

/* =============================
   2️⃣ API для мини-приложения
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
   3️⃣ Автоматическая рассылка
============================= */

// ⏰ каждую минуту тестовая рассылка (можно увеличить интервал)
cron.schedule("*/1 * * * *", async () => {
  console.log(`⏰ Рассылка уведомлений ${users.size} пользователям...`);
  for (const id of users) {
    try {
      await bot.sendMessage(
        id,
        "📢 Напоминание от ChinaOrderBot: не забудь пройти сегодня новый урок! 🚀"
      );
    } catch (err) {
      console.warn("❌ Ошибка при отправке пользователю", id, err.message);
    }
  }
});

/* =============================
   4️⃣ Запуск сервера
============================= */

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});
