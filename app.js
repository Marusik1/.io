document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Получите ID чата
        Telegram.WebApp.ready().then(function() {
          const chatId = Telegram.WebApp.initDataUnsafe.user.id;
  
          // Отправьте запрос на сервер
          fetch('/pdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `chat_id=${chatId}`
          })
          .then(response => {
            // Обработка ответа от сервера (например, показ сообщения об успешной отправке)
            console.log('PDF file sent successfully!');
          })
          .catch(error => {
            // Обработка ошибок
            console.error('Error sending PDF file:', error);
          });
        });
      });
    });
  });
