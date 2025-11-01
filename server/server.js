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

// создаём Telegram-бота с включенным polling
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// храним ID пользователей, у которых включены уведомления
let users = new Set();

/* ====================================
   ОБРАБОТЧИК КОМАНДЫ /start
==================================== */
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "👋 Привет! Это ChinaOrderBot — открой мини-приложение и начни обучение:",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Открыть ChinaOrderBot",
              web_app: { url: "https://твой-домен/webapp" }, // ← замени на свой URL
            },
          ],
        ],
        resize_keyboard: true,
      },
    }
  );
});

/* ====================================
   API ДЛЯ MINI-APP
==================================== */

// включить уведомления
app.post("/api/notifications/on", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, error: "Не передан userId" });
  }

  users.add(userId);
  console.log(`✅ Уведомления ВКЛ для пользователя ${userId}`);

  // Отправляем уведомление сразу
  try {
    await bot.sendMessage(
      userId,
      "✅ Уведомления включены! Теперь я буду присылать тебе напоминания 😉"
    );
  } catch (err) {
    console.warn("❌ Ошибка при отправке пользователю:", userId, err.message);
  }

  res.json({ success: true });
});

// выключить уведомления
app.post("/api/notifications/off", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, error: "Не передан userId" });
  }

  users.delete(userId);
  console.log(`🚫 Уведомления ВЫКЛ для пользователя ${userId}`);

  try {
    await bot.sendMessage(userId, "🔕 Уведомления отключены.");
  } catch (err) {
    console.warn("Ошибка при уведомлении пользователя:", err.message);
  }

  res.json({ success: true });
});

/* ====================================
   ТЕСТОВЫЕ УВЕДОМЛЕНИЯ
==================================== */

// Каждую минуту бот рассылает сообщение всем подписанным пользователям
cron.schedule("*/1 * * * *", async () => {
  console.log(`⏰ Рассылка уведомлений ${users.size} пользователям...`);

  for (const id of users) {
    try {
      await bot.sendMessage(
        id,
        "📢 Напоминание от ChinaOrderBot: не забудь пройти новое задание сегодня!"
      );
    } catch (err) {
      console.warn("Ошибка при отправке уведомления:", id, err.message);
    }
  }
});

/* ====================================
   ЗАПУСК СЕРВЕРА
==================================== */
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Сервер уведомлений запущен на http://0.0.0.0:${PORT}`);
});
