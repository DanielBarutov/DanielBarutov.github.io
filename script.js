// Добавление плавной прокрутки к секц
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Приветственное сообщение в консоли
console.log('Добро пожаловать на мой сайт-портфолио!'); 