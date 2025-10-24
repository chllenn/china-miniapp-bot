const { Telegraf } = require('telegraf');

const bot = new Telegraf('8280337762:AAGNvUSZYh1Ap2p_Xwp5r3yCX4stL7T4qT4'); 

bot.start((ctx) => {
  ctx.reply('👋 Привет! Я помогу тебе освоить заказы из Китая!');
});

bot.command('menu', (ctx) => {
  ctx.reply('Главное меню:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🚀 Открыть Mini App', web_app: { url: 'https://example.com' } }],
        [{ text: '🔑 Ввести код доступа', callback_data: 'enter_code' }],
      ],
    },
  });
});

bot.launch();
console.log('✅ Бот запущен...');
