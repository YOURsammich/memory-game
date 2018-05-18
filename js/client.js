const gameObject ={
    deck : [],
    flipOrder : [],
    moveCounter : 0,
    timeInt : null,
    time : 0
}

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

function startTimer () {
    if (gameObject.timeInt) clearInterval(gameObject.timeInt);
    
    gameObject.time = 0;
    gameObject.timeInt = setInterval(function () {
        let minute = Math.floor(gameObject.time / 60);
        let seconds = gameObject.time % 60;
        
        if (seconds < 10) seconds = '0' + seconds;
        
        ++gameObject.time
        
        document.getElementById('timer').textContent = minute  + ':' + seconds;
    }, 1000);
    document.getElementById('timer').textContent = '0:00';
}

function updateCounter () {
    const stars = document.getElementById('star-rating').children;
    const moveCounter = gameObject.moveCounter++;
    document.getElementById('move-count').textContent = moveCounter;
    
    if (moveCounter === 45) {
        stars[0].className = 'fa';
    } else if (moveCounter === 40) {
        stars[0].className = 'fas fa-star-half';
    } else if (moveCounter === 35) {
        stars[1].className = 'fa';
    } else if (moveCounter === 30) {
        stars[1].className = 'fas fa-star-half';
    } else if (moveCounter === 25) {
        stars[2].className = 'fa';
    } else if (moveCounter === 20) {
        stars[2].className = 'fas fa-star-half';
    }
}

function checkWin () {
    const allCards = document.getElementsByClassName('card');
    let won = true;
    for (let card of allCards) {
        if (!card.classList.contains('match')) {
            won = false;
        }
    }
    
    if (won) {
        clearInterval(gameObject.timeInt);
        document.getElementById('win-panel').style.display = 'flex';
        document.getElementById('final-time').textContent = document.getElementById('timer').textContent;
        document.getElementById('final-star-rating').innerHTML = document.getElementById('star-rating').innerHTML;
        document.getElementById('final-moves').textContent = document.getElementById('move-count').textContent + ' moves';
    }
}

function startGame () {
    const allCards = document.getElementsByClassName('card');
    const stars = document.getElementById('star-rating').children;
    
    //reset everything
    stars[0].className = stars[1].className = stars[2].className = 'fa fa-star';
    gameObject.deck = generateDeck();
    gameObject.flipOrder = [];
    gameObject.moveCounter = 0;
    updateCounter();
    for (let card of allCards) {
        card.getElementsByTagName('i')[0].className = gameObject.deck[getNodeIndex(card)];
        card.className = 'card';
    }
    
    document.getElementById('win-panel').style.display = 'none';
    startTimer();
}

startGame();
document.getElementById('reset').addEventListener('click', startGame);
document.getElementById('play-again').addEventListener('click', startGame);

function checkCards (firstCard, secondCard) {
    const firstCardSymbol = gameObject.deck[getNodeIndex(firstCard)];
    const secondCardSymbol = gameObject.deck[getNodeIndex(secondCard)];
    
    if (firstCardSymbol === secondCardSymbol) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
    } else {
        firstCard.classList.add('non-match');
        secondCard.classList.add('non-match');
    }
    
    setTimeout(function () {//don't remove flip 
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 600);
    updateCounter();
    checkWin();
}

document.getElementById('deck').addEventListener('click', function (e) {
    const target = e.target;
    if (target.nodeName === 'LI' && !target.classList.contains('match') && !target.classList.contains('non-match')) {
        const flipOrderIndex = gameObject.flipOrder.indexOf(target);
        if (flipOrderIndex === -1) {
            target.classList.add('flip');
            gameObject.flipOrder.push(target); 
        }
    }
});

document.body.addEventListener('animationend', function (e) {
    const animationName = e.animationName;
    const target = e.target;
    //Don't remove "non-match" class until the animation is over
    if (animationName === 'non-match') {
        target.classList.remove('non-match');
    } else if (animationName === 'flip') {
        // I use a "flipOrder" array because if the user clicks on the cards
        // quickly it could cause some cards to get stuck on "flip"
        for (let i = 2; i <= gameObject.flipOrder.length; i += 2) {
            checkCards(gameObject.flipOrder[i - 2], gameObject.flipOrder[i - 1]);
            gameObject.flipOrder = gameObject.flipOrder.slice(2);
        }  
    }
});