const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 8000; //  Порт для сервера

//  Токен вашего Telegram бота
const token = '7940438226:AAEqvu1U5ezSSk6txF_lgEWy1n3SDBB1bGo';
const bot = new TelegramBot(token, { polling: true });

app.use(express.json());

//  Обработчик для отправки файла
app.post('/api/send_file', (req, res) => {
  const { file, name } = req.body;

  //  Получение ID чата
  bot.getUpdates()
    .then(updates => {
      const chatId = updates[updates.length - 1].message.chat.id;
      
      //  Отправка файла в Telegram
      bot.sendDocument(chatId, `./files/${file}.pdf`, { 
        caption: `Файл: ${name}`
      })
      .then(() => {
        res.send('Файл отправлен');
      })
      .catch(error => {
        res.status(500).send('Ошибка отправки файла');
        console.error('Ошибка:', error);
      });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
