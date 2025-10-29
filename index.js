const { Telegraf } = require('telegraf');
const bot = new Telegraf('8280337762:AAGNvUSZYh1Ap2p_Xwp5r3yCX4stL7T4qT4'); 

bot.start((ctx) => {
  ctx.reply('👋 Привет! Добро пожаловать в Mini App по заказам из Китая!', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🚀 Открыть Mini App', web_app: { url: 'https://china-miniapp-bot-cy9w.vercel.app' } }
        ],
        [
          { text: '📦 О проекте', callback_data: 'about' }
        ]
      ]
    }
  });
});

bot.action('about', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('🇨🇳 Этот бот поможет тебе разобраться, как заказывать товары из Китая без посредников.');
});

bot.launch();
console.log('✅ Бот запущен...');

