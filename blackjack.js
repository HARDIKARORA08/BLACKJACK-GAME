let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result', 'div': '#your-box', 'score':0},
    'dealer' :{'scoreSpan':'#dealer-blackjack-result', 'div': '#dealer-box', 'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'isTurnsOver':false
};
const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];


const hitSound=new Audio('./black_sounds/swish.mp3');
const winSound =new Audio('./black_sounds/cash.mp3');
const loseSound= new Audio('./black_sounds/aww.mp3');

document.querySelector('#btnblue').addEventListener('click',blackjack_hit);
document.querySelector('#btnyellow').addEventListener('click',blackjackStand);
document.querySelector('#btnred').addEventListener('click',blackjackDeal);

function blackjack_hit(){
    if(blackjackGame['isStand']==false){
    let card=randomCard();
    console.log(card);
    showCard(card,YOU);
    updateScore(card,YOU);
    console.log(YOU['score']);
    showScore(YOU);
    }
}
function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`./black_images/${card}.png`;
    cardImage.style.width='100px';
    cardImage.style.height='150px';
    cardImage.style.padding='10px'
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}
// deal button
function blackjackDeal(){
    if(blackjackGame['isTurnsOver']==true){
        blackjackGame['isStand']=false;
    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
    for(i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }
    for(i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }
    
    document.querySelector('#your-blackjack-result').textContent= 0;
    document.querySelector('#dealer-blackjack-result').textContent= 0;
    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';
    document.querySelector('#blackjack-result').textContent="Lets Play";
    document.querySelector('#blackjack-result').style.color='black';
    YOU['score']=0;
    DEALER['score']=0;
    blackjackGame['isTurnsOver']=false;
}
}
//random card
function randomCard(){
    return blackjackGame['cards'][Math.floor(Math.random()*13)];
}
// updatescore
function updateScore(card,activePlayer){
    if(card === 'A'){
        if(activePlayer['score']+blackjackGame['cardMap'][card][1] <=21){
            activePlayer['score']+=blackjackGame['cardMap'][card][1];
        }
        else{
            activePlayer['score']+=blackjackGame['cardMap'][card][0];
        }
    }
    else{
    activePlayer['score']+=blackjackGame['cardMap'][card];
    }
}
function showScore(activePlayer){
    if(activePlayer['score']>21){
        
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';

    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}
// sleep function
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

// stand button
async function blackjackStand(){
    blackjackGame['isStand']=true;
    while(DEALER['score']<16 && blackjackGame['isStand']==true){
    let card=randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
     showScore(DEALER);
     await sleep(1000);
    }
   if(DEALER['score']>15){
       blackjackGame['isTurnsOver']=true;
       let winner=computeWinner();
       showResult(winner);
   }
 
}
// compuite winner
 function computeWinner(){
     let winner;
     if(YOU['score']<=21){
         if(YOU['score']>DEALER['score'] || DEALER['score']>21){
             document.querySelector('#Wins').textContent=blackjackGame['wins'];
             console.log("You Won");
             blackjackGame['wins']++;
             winner=YOU;
         }
         else if(YOU['score']<DEALER['score']){
            document.querySelector('#Losses').textContent=blackjackGame['losses'];
             console.log("You lost");
             blackjackGame['losses']++;
             winner=DEALER;
         }
         else if(YOU['score']==DEALER['score']){
            document.querySelector('#Draws').textContent=blackjackGame['draws'];
             console.log("Draw");
             blackjackGame['draws']++;
         }
        }
         else if(YOU['score']>21 && DEALER['score']<=21){
            document.querySelector('#Wins').textContent=blackjackGame['wins'];
             console.log("You lost");
             winner=DEALER;
             blackjackGame['losses']++;
         }
         else if(YOU['score']>21 && DEALER['score']>21){
            document.querySelector('#Draws').textContent=blackjackGame['draws'];
             console.log("Draw");
             blackjackGame['draws']++;
         }
         console.log('winner is ',winner);
         return winner;
     }

     // result
     function showResult(winner){
         let message,messageColor;
         if(blackjackGame['isTurnsOver']==true){
      if(winner==YOU){
            message="YOU WON!!"
            messageColor='green'
            winSound.play();
      }
      else if(winner==DEALER){
            message="YOU LOST!!"
            messageColor='red'
            loseSound.play();
      }
      else{
            message="DRAW!!"
            messageColor='black'
      }
      document.querySelector('#blackjack-result').textContent=message;
      document.querySelector('#blackjack-result').style.color=messageColor;
    }
     }
 