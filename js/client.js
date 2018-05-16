var gameDeck = [];

function generateDeck () {
    let deck = [];
    let possible = ['fas fa-feather', 'fas fa-dove', 'fas fa-fighter-jet', 'fas fa-rocket', 'fas fa-kiwi-bird', 'fas fa-paper-plane', 'fas fa-space-shuttle', 'fas fa-plane'];
    //double all entries in the array
    possible = possible.concat(possible);
    
    while (possible.length) {//shuffle deck
        const randomIndex = Math.floor(Math.random() * possible.length);
        deck.push(possible[randomIndex]);
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
        
    gameDeck = generateDeck();
    for (let card of allCards) {
        card.getElementsByTagName('i')[0].className = gameDeck[getNodeIndex(card)];
        card.classList = 'card';
    }
}

startGame();

document.getElementById('deck').addEventListener('click', function (e) {
    const target = e.target;
    if (target.nodeName === 'LI' && !target.classList.contains('match')) {
        const flippedCards = document.getElementsByClassName('flip');
        
        target.classList.add('flip');
        
        if (flippedCards.length >= 2) {
            const firstCard = flippedCards[0];
            const secondCard = flippedCards[1]
            const firstCardSymbol = gameDeck[getNodeIndex(firstCard)];
            const secondCardSymbol = gameDeck[getNodeIndex(secondCard)];

            if (firstCardSymbol === secondCardSymbol) {
                firstCard.classList.add('match');
                secondCard.classList.add('match');
            }
            
            setTimeout(function () {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 600);
        }
    }
});

document.body.addEventListener('animationend', function (e) {
    const animationName = e.animationName;
    const target = e.target;
    console.log(animationName);
    if (animationName === 'non-match') {
        target.classList.remove('non-match');
    } else if (animationName === 'flip') {
        target.classList.add('not-match');
    }
});

document.getElementById('new-game').addEventListener('click', startGame);