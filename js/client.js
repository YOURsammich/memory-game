var gameDeck = [];
var flipOrder = [];

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
    flipOrder = [];
    for (let card of allCards) {
        card.getElementsByTagName('i')[0].className = gameDeck[getNodeIndex(card)];
        card.className = 'card';
    }
}

startGame();
document.getElementById('new-game').addEventListener('click', startGame);

function checkCards (firstCard, secondCard) {
    const firstCardSymbol = gameDeck[getNodeIndex(firstCard)];
    const secondCardSymbol = gameDeck[getNodeIndex(secondCard)];
    
    if (firstCardSymbol === secondCardSymbol) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
    } else {
        firstCard.classList.add('non-match');
        secondCard.classList.add('non-match');
    }
    
    setTimeout(function () {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 600);
}

function fakeClick (cards) {console.log(cards);
    const flippedCards = document.getElementsByClassName('flip');
    const card = cards[0];
    const cardEl = document.getElementsByClassName('card')[card];
    cardEl.classList.add('flip');
    flipOrder.push(cardEl);
    for (let i = 2; i <= flipOrder.length; i += 2) {
        if (flipOrder[i - 2]) {
            
        }
        checkCards(flipOrder[i - 2], flipOrder[i - 1]);
        flipOrder = flipOrder.slice(2);
    }
    
    setTimeout(function () {
        var randomNum = Math.floor(Math.random() * 16);
        fakeClick([randomNum])
    }, 50)
}

setTimeout(function () {
    //fakeClick([2]);
}, 50);

document.getElementById('deck').addEventListener('click', function (e) {
    const target = e.target;
    if (target.nodeName === 'LI' && !target.classList.contains('match')) {
        const flipOrderIndex = flipOrder.indexOf(target);
        if (flipOrderIndex !== -1) {//card already in flipOrder
            flipOrder.splice(flipOrderIndex, 1);
            target.classList.remove('flip');
        } else {
            target.classList.add('flip');
            flipOrder.push(target);

            // I use a "flipOrder" array because if the user clicks on the cards
            // quickly it could cause some cards to get stuck on "flip"
            for (let i = 2; i <= flipOrder.length; i += 2) {
                checkCards(flipOrder[i - 2], flipOrder[i - 1]);
                flipOrder = flipOrder.slice(2);
            }   
        }
    }
});

document.body.addEventListener('animationend', function (e) {
    const animationName = e.animationName;
    const target = e.target;
    //Don't remove "non-match" class until the animation is over
    if (animationName === 'non-match') {
        target.classList.remove('non-match');
    }
});