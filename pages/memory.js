document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { id: 1, symbol: '<div>' },
        { id: 2, symbol: '<div>' },
        { id: 3, symbol: '<a>' },
        { id: 4, symbol: '<a>' },
        { id: 5, symbol: '<span>' },
        { id: 6, symbol: '<span>' },
        { id: 7, symbol: '<p>' },
        { id: 8, symbol: '<p>' },
        { id: 9, symbol: '<body>' },
        { id: 10, symbol: '<body>' },
        { id: 11, symbol: '<header>' },
        { id: 12, symbol: '<header>' },
        { id: 13, symbol: '<footer>' },
        { id: 14, symbol: '<footer>' }
    ];

    const tagExplanations = {
        '<div>': '<div> - Используется для группировки и стилизации блоков содержимого.',
        '<a>': '<a> - Определяет гиперссылку, которая ведет на другую страницу или ресурс.',
        '<span>': '<span> - Используется для выделения части текста или документа для стилизации.',
        '<p>': '<p> - Определяет абзац текста.',
        '<body>': '<body> - Используется для размещения всего содержимого, которое отображается на веб-странице.',
        '<header>': '<header> - Определяет шапку сайта.',
        '<footer>': '<footer> - Определяет подвал сайта.'
    };

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;

    const gameGrid = document.getElementById('gameGrid');
    const restartBtn = document.getElementById('restartBtn');
    const tagNotification = document.getElementById('tagNotification');

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCard(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.symbol = card.symbol;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = '?';

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = card.symbol;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);

        cardElement.addEventListener('click', () => {
            if (lockBoard) return;
            if (cardElement === firstCard) return;
            if (cardElement.classList.contains('matched')) return;

            cardElement.classList.add('flipped');

            if (!firstCard) {
                firstCard = cardElement;
                return;
            }

            secondCard = cardElement;
            lockBoard = true;

            checkForMatch();
        });

        return cardElement;
    }

    function showNotification(text) {
        console.log('showNotification called with text:', text);
        if (!tagNotification) {
            console.error('tagNotification element not found');
            return;
        }
        tagNotification.textContent = text;
        tagNotification.classList.add('show');
        setTimeout(() => {
            tagNotification.classList.remove('show');
        }, 3000);
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

        if (isMatch) {
            matchedPairs++;
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');

            firstCard.classList.add('flipped');
            secondCard.classList.add('flipped');

            showNotification(tagExplanations[firstCard.dataset.symbol] || '');

            resetBoard();
            if (matchedPairs === cardsArray.length / 2) {
                setTimeout(() => {
                    alert('Поздравляем! Вы нашли все пары!');
                }, 500);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function startGame() {
        matchedPairs = 0;
        gameGrid.innerHTML = '';
        const shuffledCards = shuffle(cardsArray.slice());
        shuffledCards.forEach(card => {
            const cardElement = createCard(card);
            gameGrid.appendChild(cardElement);
        });
    }

    restartBtn.addEventListener('click', startGame);

    window.startGame = startGame; 

    startGame();
});
