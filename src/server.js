const express = require('express');
const cors = require('cors');
const packageInfo = require('../package.json');
const port = process.env.PORT || 80;
const app = express();

app.use(cors);

app.get('/', (req, res) => res.json(packageInfo.version));

app.get('/health', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(`I'm fine, thank you. (${Date.now()}), ${process.env.TELEGRAM_BOT_TOKEN}`);
});

app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`);
});
