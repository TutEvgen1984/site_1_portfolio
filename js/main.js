const emailInput = document.querySelector('.newsletter-content-form__input-user-mail');
const errorMessage = document.querySelector('.error-message');
const newsletterForm = document.querySelector('.newsletter-content-form');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* #region разбор ^[^\s@]+ */
/*

^ - начало строки
[] - набор символов
^ внутри набора[] означает орицание всех символов внутри
\s - пробел
^\s - всё кроме пробела
^\s @ - всё кроме пробела и @
[^\s@]- один любой символ кроме пробела и кроме @
+ - относится к предшествующему этому плюсу символам поиска и обозначает что их количество от 1 до бесконечности. Если этот плюс не поставить после [^\s@], то гайдутся куча символов по одному по отдельности кроме @ и пробела.
[^\s@]+ - от 1 до бесконечности символов кроме пробела и кроме @, так как стоит флаг g, то выберутся все совпадения в строке много раз даже если там будет "string@ string2@ string3@".
^[^\s@]+ - от 1 до бесконечности символов кроме пробела и кроме @, но за счет ^ перед[] выберется только то, что найдено сначала строки и вплоть до первого пробела либо @, а все сотальное исключится так как оно хоть и совпадает по искомому набору, но находится уже не вначале строки и поэтому уже не подходит.

В итоге мы в этом выражении выбрали все что до первого пробела либо собаки @

*/

/* #endregion */

/* #region разбор @[^\s@]+\.[^\s@]+$ */
/*
@ - это просто символ собаки, идущий вслед за тем, что мы нашли до этого, то есть мы его включаем теперь в поиск, он нам нужен
[^\s@]+ - это все симыолы кроме пробела и собаки идущие дальше собаки. ya.ru он выделит полностью
\. - это экранированная точка. Теперь поиск останавливается на точке включительно, находит только ya.
[^\s@]+ находит все сомволы после точки
$ означает конец строки

*/

/* #endregion */

const modal = document.getElementById('id-newsletter-modal');
const modalText = document.querySelector('.newsletter-modal--text');
const closeModal = document.querySelector('.newsletter-modal--close');

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
