/**
 * https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md
 */
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const ChatAPI = require('shopping-radar-sharedcode').db.ChatAPI;

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
  if (msg.entities && msg.entities.length > 0) {
    return;
  }

  bot.sendMessage(chatId, 'Received your message');
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const api = new ChatAPI();
  api.getChats(chatId, 'telegram').then((result) => {
    if (result && result.records.length > 0) {
      console.log(result.records[0].fields.chat_id);
      console.log(`The chat id is exist: ${chatId}`);
      bot.sendMessage(chatId, 'What product do you want to monitor?');
    } else {
      api.addChat(chatId, 'telegram', []).then((x) => {
        console.log(x);
        bot.sendMessage(chatId, `${msg.chat.first_name}, Welcome.`);
      }).catch(e => console.error(e));
    }
  });
});

bot.onText(/\/leave/, (msg) => {
  const chatId = msg.chat.id;
  const api = new ChatAPI();
  api.getChats(chatId, 'telegram').then((result) => {
    if (!result || result.records.length === 0) {
      console.log(`not find exist chat id: ${chatId}`);
    } else {
      const id = result.records[0].id;
      api.removeChat(id).then((result) => {
        console.log(result);
        if (result && result.deleted) {
          bot.sendMessage(chatId, `Good bye, ${msg.chat.first_name}`);
        }
      });
    }
  });
});

bot.on('polling_error', (err) => console.error(err));
