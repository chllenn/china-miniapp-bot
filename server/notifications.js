// server/notifications.js
import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8280337762:AAGNvUSZYh1Ap2p_Xwp5r3yCX4stL7T4qT4"; // получи у BotFather
const bot = new TelegramBot(TOKEN, { polling: false });

// Хранилище активных пользователей
let subscribedUsers = new Set();

// Подписка
export const subscribeUser = (userId) => {
  subscribedUsers.add(userId);
  console.log(`✅ Подписан: ${userId}`);
};

// Отписка
export const unsubscribeUser = (userId) => {
  subscribedUsers.delete(userId);
  console.log(`🚫 Отписан: ${userId}`);
};

// Отправка уведомлений каждые 60 секунд (для теста)
setInterval(() => {
  subscribedUsers.forEach((id) => {
    bot.sendMessage(id, "📦 Напоминание: пора продолжить обучение в ChinaOrderBot!");
  });
}, 60 * 1000); // 1 минута
