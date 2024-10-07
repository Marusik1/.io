document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const subject = button.id;
      const fileUrl = `https://your-server.com/api/pdf/${subject}`; // Замените на ваш сервер

      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();

        const telegram = Telegram.WebApp;
        const file = new File([blob], `${subject}.pdf`, {type: 'application/pdf'});

        await telegram.MainButton.setText('Загрузить PDF');
        await telegram.MainButton.setParams({
          is_external: true, 
          is_silent: true,
        });
        await telegram.MainButton.show();
        await telegram.sendData(file, {
          contentType: 'application/pdf',
          filename: `${subject}.pdf`,
          caption: 'PDF-файл для скачивания'
        });
      } catch (error) {
        console.error('Ошибка при загрузке PDF:', error);
        // Выведите сообщение об ошибке пользователю
        alert('Ошибка при загрузке PDF. Пожалуйста, попробуйте позже.');
      }
    });
  });
});
