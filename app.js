// app.js

//  Функция для обработки нажатия на кнопку
function handleButtonClick(fileId) {
  //  Получение имени файла
  const fileName = document.getElementById(fileId).textContent;

  //  Создание объекта данных
  const data = {
    file: fileId,
    name: fileName
  };

  //  Отправка данных на сервер
  fetch('/api/send_file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Файл успешно отправлен');
    } else {
      console.error('Ошибка отправки файла');
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
}

//  Добавление обработчика для каждой кнопки
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    handleButtonClick(button.id);
  });
});


