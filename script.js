(function () {
    const body = document.body;
    const collapseDiv = document.getElementById('card');
    const menu = document.getElementById('menu');
    const accessibleClass = 'accessible';

    // Load saved preference
    if (localStorage.getItem('accessibleMode') === 'true') {
        body.classList.add(accessibleClass);
        collapseDiv.classList.add(accessibleClass);
        menu.classList.add(accessibleClass);
    }

    // Animation trigger on page load
    document.addEventListener('DOMContentLoaded', function () {
        const fadeIns = document.querySelectorAll('.fade-in');
        fadeIns.forEach(el => el.classList.add('fade-in'));
        const slideInLefts = document.querySelectorAll('.slide-in-left');
        slideInLefts.forEach(el => el.classList.add('slide-in-left'));
        const slideInRights = document.querySelectorAll('.slide-in-right');
        slideInRights.forEach(el => el.classList.add('slide-in-right'));
    });

    // New accessibility dropdown toggle and controls
    const fontIncreaseBtn = document.getElementById('font-increase');
    const fontDecreaseBtn = document.getElementById('font-decrease');
    const colorThemeButtons = document.querySelectorAll('.color-theme-btn');
    const imgHideBtn = document.getElementById('img-hide');
    const imgGrayscaleBtn = document.getElementById('img-grayscale');
    const imgResetBtn = document.getElementById('img-reset');
    const bodyElement = document.body;
    const headerElement = document.querySelector('header');
    const collapseElement = document.getElementById('card');
    const menuElement = document.getElementById('menu');
    const element = document.documentElement;

    fontIncreaseBtn.addEventListener('click', function () {
        element.style.fontSize = '20pt';
    });

    fontDecreaseBtn.addEventListener('click', function () {
        element.style.fontSize = '16pt';
    });

    // Обработчик событий для кнопок тем
    colorThemeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Удаление существующих классов тем с body, header и collapse div
            bodyElement.classList.remove('theme-white', 'theme-dark', 'theme-lightyellow', 'theme-lightblue', 'theme-brown');
            headerElement.classList.remove('theme-white', 'theme-dark', 'theme-lightyellow', 'theme-lightblue', 'theme-brown');
            if (collapseElement) {
                collapseElement.classList.remove('theme-white', 'theme-dark', 'theme-lightyellow', 'theme-lightblue', 'theme-brown');
            }
            if (menuElement) {
                menuElement.classList.remove('theme-white', 'theme-dark', 'theme-lightyellow', 'theme-lightblue', 'theme-brown');
            }
            // Добавление выбранного класса темы к body, header и collapse div
            const theme = this.getAttribute('data-theme');
            bodyElement.classList.add('theme-' + theme);
            headerElement.classList.add('theme-' + theme);
            if (collapseElement) {
                collapseElement.classList.add('theme-' + theme);
            }
            if (menuElement) {
                menuElement.classList.add('theme-' + theme);
            }
            // Сохранение выбранной темы в localStorage
            localStorage.setItem('selectedTheme', theme);

            // Обновление активного состояния кнопок
            colorThemeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Применение сохраненной темы при загрузке страницы
    document.addEventListener('DOMContentLoaded', function () {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            bodyElement.classList.add('theme-' + savedTheme);
            headerElement.classList.add('theme-' + savedTheme);
            if (collapseElement) {
                collapseElement.classList.add('theme-' + savedTheme);
            }
            if (menuElement) {
                menuElement.classList.add('theme-' + savedTheme);
            }

            // Установка активного состояния для кнопки темы
            colorThemeButtons.forEach(btn => {
                if (btn.getAttribute('data-theme') === savedTheme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    });

    imgHideBtn.addEventListener('click', function () {
        document.querySelectorAll('img').forEach(img => {
            img.style.visibility = 'hidden';
        });
        document.querySelectorAll('section').forEach(section => {
            section.style.background = 'none';
        });
        document.getElementsByClassName('card-bg-1')[0].style.background = 'none';
        document.getElementsByClassName('card-bg-1')[1].style.background = 'none';
        document.getElementsByClassName('card-bg-1')[2].style.background = 'none';
        document.getElementsByClassName('card-bg-1')[3].style.background = 'none';
    });

    imgGrayscaleBtn.addEventListener('click', function () {
        document.querySelectorAll('img').forEach(img => {
            img.style.visibility = '';
            img.style.filter = 'grayscale(100%)';
        });
        document.querySelectorAll('section').forEach(section => {
            section.style.background = '';
            section.style.filter = 'grayscale(100%)';
        });
       document.getElementsByClassName('card-bg-1')[0].style.background = '';
        document.getElementsByClassName('card-bg-1')[1].style.background = '';
        document.getElementsByClassName('card-bg-1')[2].style.background = '';
        document.getElementsByClassName('card-bg-1')[3].style.background = '';
        document.getElementsByClassName('card-bg-1')[0].style.filter = 'grayscale(100%)';
        document.getElementsByClassName('card-bg-1')[1].style.filter = 'grayscale(100%)';
        document.getElementsByClassName('card-bg-1')[2].style.filter = 'grayscale(100%)';
        document.getElementsByClassName('card-bg-1')[3].style.filter = 'grayscale(100%)';
    });

imgResetBtn.addEventListener('click', function () {
    document.querySelectorAll('img').forEach(img => {
        img.style.visibility = '';
        img.style.filter = '';
    });
    document.querySelectorAll('section').forEach(section => {
        section.style.background = '';
        section.style.filter = '';
    });
    document.getElementsByClassName('card-bg-1')[0].style.background = '';
    document.getElementsByClassName('card-bg-1')[1].style.background = '';
    document.getElementsByClassName('card-bg-1')[2].style.background = '';
    document.getElementsByClassName('card-bg-1')[3].style.background = '';
     document.getElementsByClassName('card-bg-1')[0].style.filter = '';
    document.getElementsByClassName('card-bg-1')[1].style.filter = '';
    document.getElementsByClassName('card-bg-1')[2].style.filter = '';
    document.getElementsByClassName('card-bg-1')[3].style.filter = '';
});

// Image viewer modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const imageViewerModal = new bootstrap.Modal(document.getElementById('imageViewerModal'));
    const modalImage = document.getElementById('modalImage');

    document.querySelectorAll('img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            modalImage.src = this.src;
            modalImage.alt = this.alt || 'Image preview';
            imageViewerModal.show();
        });
    });
});
})();
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
