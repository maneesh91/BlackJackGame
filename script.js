//
// BlackJack
//Maneesh Kumar
// 

let suits = ['Hearts','Clubs', 'Diamonds', 'Spades'];

let values =['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six','Five','Four', 'Three', 'Two'];

var textArea = document.getElementById('text-area');
var newGameButton = document.getElementById('new-game-button');
var hitButton = document.getElementById('hit-button');
var stayButton = document.getElementById('stay-button');

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playercards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';

newGameButton.addEventListener('click', function(){
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    deck = createDeck();
    shuffleDeck(deck);
    
    dealerCards = [getNextCard(), getNextCard()];
    playercards = [getNextCard(), getNextCard()];
    
    
    
    newGameButton.style.display = 'none';
    hitButton.style.display ='inline';
    stayButton.style.display =  'inline';
    
    showStatus();
})

hitButton.addEventListener('click', function(){
    playercards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', function(){
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

function createDeck(){
    let deck =[];
    for(let suitIndex = 0; suitIndex < suits.length; suitIndex++){
        for(let valueIndex = 0; valueIndex < values.length; valueIndex++ ){
            let card = {
                suit: suits[suitIndex],
                value:values[valueIndex]
            }
            deck.push( card );
        }
    }
    return deck;
}



function shuffleDeck(deck){
    for(let i = 0; i< deck.length; i++){
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}



function getNextCard(){
    return deck.shift();
}

function getCardString(card){
    return card.value + " of " + card.suit;
}

function getCardNumericValue(card){
    switch(card.value){
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScores(cardArray){
    let score = 0;
    let hasAce = false;
    for(let i = 0; i < cardArray.length; i++){
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if(card.value === 'Ace'){
            hasAce = true;
        }
    }
    if(hasAce && score + 10 <= 20){
        return dealerScore + 10;
    }
    console.log(score);
    return score;
}

function checkForEndOfGame(){
    updateScore();
    
    if(gameOver){
        while(dealerScore < playerScore
             && playerScore <= 21
             && dealerScore < 21){
            dealerCards.push(getNextCard());
            updateScore();
        }
    }
    
    if(playerScore > 21){
        playerWon = false;
        gameOver = true;
    }
    else if(dealerScore > 21){
        playerWon = true;
        gameOver = true;
        
    }
    else if(gameOver){
        if(playerScore > dealerScore){
            playerWon = true;
        }
        else{
            playerScore = false;
        }
        
         
    }
    
   
}

function updateScore(){
   
   dealerScore = getScores(dealerCards);
    playerScore = getScores(playercards);
}

function showStatus(){
    if(!gameStarted){
        textArea.innerText = "Welcome to Blackjack";
        return;
    }
    
    let dealerCardString = '';
    for(let i = 0; i < dealerCards.length; i++){
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }
    
    let playerCardString = '';
    for(let i = 0; i < playercards.length; i++){
        playerCardString += getCardString(playercards[i])+ '\n';
    }
    
    updateScore();
    
    textArea.innerText = 
        'Dealer has: \n' +
        dealerCardString + 
        '(Score:' +  dealerScore + ')\n\n'+
        
        'Player has: \n' +
        playerCardString + 
        '(Score:'+ playerScore +')\n\n';
    
    if(gameOver){
        if(playerWon){
            textArea.innerText += "You Win!";
        }
        else{
            textArea.innerText += "Dealer Wins";
        }
        
        newGameButton.style.display ='inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }       
}

