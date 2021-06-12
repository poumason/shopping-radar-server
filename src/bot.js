/**
 * https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md
 */
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
console.log('bot server started...');

// Listen for any kind of messages. There are difference kinds of messages.
bot.on('message', (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

bot.on('polling_error', (err) => console.error(err));
