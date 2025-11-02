import TelegramBot from "node-telegram-bot-api";

const token = "8280337762:AAGNvUSZYh1Ap2p_Xwp5r3yCX4stL7T4qT4";
const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  // Приветственное сообщение с кнопками (в чате, как ты хотел)
  await bot.sendMessage(
    chatId,
    "👋 Привет! Добро пожаловать в ChinaOrderBot — Mini App по заказам из Китая!",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 Открыть ChinaOrderBot",
              web_app: {
                url: "https://china-miniapp-bot-cy9w.vercel.app"
              },
            },
          ],
          [{ text: "ℹ️ О проекте", callback_data: "about" }],
        ],
      },
    }
  );

  // Отображаем обычную клавиатуру внизу (вместо меню Telegram)
  await bot.sendMessage(chatId, "Начни заказывать уже сейчас!", {
    reply_markup: {
      keyboard: [
        [{ text: "🚀 Открыть мини-приложение" }],
        [{ text: "ℹ️ О проекте" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

// Обработка reply-кнопок (внизу под полем ввода)
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "🚀 Открыть мини-приложение") {
    await bot.sendMessage(chatId, "🔗 Нажми ниже, чтобы открыть Mini App:", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 Запустить ChinaOrderBot",
              web_app: {
                url: "https://china-miniapp-bot-cy9w.vercel.app",
              },
            },
          ],
        ],
      },
    });
  }

  if (text === "ℹ️ О проекте") {
    await bot.sendMessage(
      chatId,
      "🇨🇳 ChinaOrderBot — обучающее мини-приложение, которое научит тебя заказывать товары из Китая без посредников."
    );
  }
});

// Обработка inline-кнопки "О проекте"
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  if (query.data === "about") {
    await bot.sendMessage(
      chatId,
      "🇨🇳 ChinaOrderBot — обучающее мини-приложение, которое научит тебя заказывать товары из Китая без посредников."
    );
  }
});

console.log("✅ ChinaOrderBot запущен и слушает /start");
