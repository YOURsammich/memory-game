const gameObject = {};

function generateDeck () {
    let deck = [];
    let possible = ['1', '2', '3', '4', '5', '6', '7', '8'];
    //double all entries in the array
    possible = possible.concat(possible);
    
    while (possible.length) {
        const randomIndex = Math.floor(Math.random() * possible.length);
        deck.push({
            symbol : possible[randomIndex],
            matched : false
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
    gameObject.deck = generateDeck();
}

document.getElementById('deck').addEventListener('click', function (e) {
    const target = e.target;
    
    if (target.nodeName === 'LI') {
        const cardInfo = deck[getNodeIndex(target)];
        console.log(cardInfo);
    }
});

