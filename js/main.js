const emailInput = document.querySelector('.newsletter__input');
const errorMessage = document.querySelector('.error-message');
const newsletterForm = document.querySelector('.newsletter__form');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const modal = document.getElementById('modal');
const modalText = document.querySelector('.modal-text');
const closeModal = document.querySelector('.close');

// Функция для валидации email
function validateEmail(event) {
    event.preventDefault();
    const email = emailInput.value.trim();
  // Проверяем, соответствует ли введенный email регулярному выражению
    if (emailRegex.test(email)) {
        modalText.textContent = `Ваш email ${email} успешно подписался на наши уведомления!`;
        modal.style.display = 'block';

        errorMessage.style.display = 'none';
        emailInput.value = '';
        return true;
    } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Пожалуйста, введите корректный email';
        return false;
    }
}

// Закрытие модального окна при клике на крестик
closeModal.onclick = function() {
    modal.style.display = 'none';
}

// Закрытие модального окна при клике вне области окна
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Добавляем обработчик события submit для формы
newsletterForm.addEventListener('submit', validateEmail);

// Добавляем обработчик события input для поля ввода email
emailInput.addEventListener('input', () => {
    // Если поле ввода пустое, скрываем сообщение об ошибке
    if (emailInput.value.trim() === '') {
        errorMessage.style.display = 'none';
    }
});
