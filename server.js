const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000; // Вы можете выбрать любой порт

// Настройка маршрута для загрузки PDF-файлов
app.get('/api/pdf/:subject', (req, res) => {
  const subject = req.params.subject;
  const filePath = path.join(__dirname, 'pdf', `${subject}.pdf`); // Путь к PDF-файлу 

  try {
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    fileStream.pipe(res); // Отправка PDF-файла клиенту
  } catch (error) {
    console.error('Ошибка при загрузке PDF:', error);
    res.status(500).send('Ошибка при загрузке PDF'); // Ответ об ошибке
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
