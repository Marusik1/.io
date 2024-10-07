const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/api/pdf/:subject', (req, res) => {
  const subject = req.params.subject;
  const filePath = `./pdf/${subject}.pdf`; // Путь к PDF-файлу на сервере

  try {
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    fileStream.pipe(res);
  } catch (error) {
    console.error('Ошибка при чтении PDF:', error);
    res.status(500).send('Ошибка при загрузке PDF');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
