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

// app.js (Клиентский код)
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const subject = button.id;
      const fileUrl = `/api/pdf/${subject}.pdf`; // URL вашего сервера

      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();

        const telegram = Telegram.WebApp;
        const file = new File([blob], `${subject}.pdf`, { type: 'application/pdf' });

        await telegram.MainButton.setText('Загрузить PDF');
        await telegram.MainButton.setParams({
          is_external: true,
          is_silent: true,
        });
        await telegram.MainButton.show();
        await telegram.sendData(file, {
          contentType: 'application/pdf',
          filename: `${subject}.pdf`,
          caption: 'PDF-файл для скачивания',
        });
      } catch (error) {
        console.error('Ошибка при загрузке PDF:', error);
        // Выведите сообщение об ошибке пользователю
        alert('Ошибка при загрузке PDF. Пожалуйста, попробуйте позже.');
      }
    });
  });
});
