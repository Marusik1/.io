// Создание объекта TelegramWebApp для взаимодействия с ботом
const TelegramWebApp = new TelegramWebApp();

// Создание словаря с PDF файлами, доступными для загрузки
const pdfFiles = {
  "Kp": "kp.pdf",
  "Mp1": "mp1.pdf",
  "Ps1": "ps1.pdf",
  "Рим1": "rim1.pdf",
  "Konst1": "konst1.pdf",
  "Ad1": "ad1.pdf",
  "Gp1": "gp1.pdf",
  "Gpo1": "gpo1.pdf",
  "Gpp1": "gpp1.pdf",
  "Tp1": "tp1.pdf",
  "Yp1": "yp1.pdf",
  "Ypp1": "ypp1.pdf",
  "Pso1": "pso1.pdf",
  "Sp1": "sp1.pdf",
  "Infa1": "infa1.pdf",
  "Log1": "log1.pdf",
  "Yd1": "yd1.pdf"
};

// Обработчик нажатия на кнопки
const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Получение id кнопки
    const buttonId = button.id;

    // Проверка, есть ли PDF файл для данной кнопки
    if (pdfFiles[buttonId]) {
      // Создание JSON объекта для отправки в Telegram
      const data = {
        action: "send_pdf",
        pdf_file: pdfFiles[buttonId]
      };

      // Отправка JSON данных в Telegram бота
      TelegramWebApp.sendData(JSON.stringify(data));
    }
  });
});

// Обработчик ответа от бота
TelegramWebApp.onEvent("data", (data) => {
  // Получение ответа от бота
  const response = JSON.parse(data);

  // Обработка ответа бота, например, вывода сообщения
  if (response.status === "success") {
    alert("PDF файл отправлен успешно!");
  } else {
    alert("Ошибка при отправке PDF файла.");
  }
});
