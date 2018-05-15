var gameObject = {
    deck : [],
    firstCard : null,
    secondCard : null
};

function generateDeck () {
    let deck = [];
    let possible = ['1', '2', '3', '4', '5', '6', '7', '8'];
    //double all entries in the array
    possible = possible.concat(possible);
    
    while (possible.length) {
        const randomIndex = Math.floor(Math.random() * possible.length);
        deck.push({
            symbol : possible[randomIndex]
        });
        possible.splice(randomIndex, 1);
    }
    
    return deck
}

function getNodeIndex (node) {
    const parent = node.parentElement;
    const children = parent.children;
    
    for (let i = 0; i < children.length; i++) {
        if (node === children[i]) return i;
    }
    
    return -1;
}

function startGame () {
    const allCards = document.getElementsByClassName('card');
        
    gameObject.deck = generateDeck();
    for (let card of allCards) {
        card.getElementsByTagName('i')[0].textContent = gameObject.deck[getNodeIndex(card)].symbol;
        card.classList = 'card';
    }
}

startGame();

document.getElementById('deck').addEventListener('click', function (e) {
    const target = e.target;
    if (target.nodeName === 'LI' && !target.classList.contains('match')) {
        const flippedCards = document.getElementsByClassName('flip');
        
        if (flippedCards.length === 2) {
            while (flippedCards.length) {
                flippedCards[0].classList = 'card';
            }
        }
        
        target.classList.add('flip');
        
        if (flippedCards.length === 2) {
            const firstCard = flippedCards[0];
            const secondCard = flippedCards[1]
            const firstCardData = gameObject.deck[getNodeIndex(flippedCards[0])];
            const secondCardData = gameObject.deck[getNodeIndex(flippedCards[1])];
            
            if (firstCardData.symbol === secondCardData.symbol) {
                firstCard.classList.add('match');
                secondCard.classList.add('match');
            } else {
                firstCard.className = 'card flip not-match';
                secondCard.className = 'card flip not-match';
                setTimeout(function () {
                    firstCard.className = 'card';
                    secondCard.className = 'card';
                }, 10000);
            }
        }
    }
});

document.getElementById('new-game').addEventListener('click', startGame);
