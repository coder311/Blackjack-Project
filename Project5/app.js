let  blackjackGame={
    'you':{'scoreSpan':'#yourResults', 'div':'#yourbox','score':0},
    'dealer':{'scoreSpan':'#dealerResults','div':'#dealerbox','score':0},
    'card':['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'K':10,'Q':10,'A':[1,11]},
    'wins':0,
    'loss':0,
    'draw':0,
    'isStand':false,
    'turnsover':false,

};


const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];
const hitSound=new Audio('sounds/swish.m4a');
const winSound=new Audio('sounds/cash.mp3');
const lossSound=new Audio('sounds/aww.mp3');

document.querySelector('#hit').addEventListener('click',Hit);

document.querySelector('#deal').addEventListener('click',Deal);

document.querySelector('#stand').addEventListener('click',DealerLogic);

function Hit(){
    if(blackjackGame['isStand']===false){
        // alert("hey")
        let card=blackjackGame['card'][randCard()];
        showCard(YOU,card);
        // console.log();
        updateScore(card,YOU);
        showScore(YOU);
    }
}

function randCard(){
    let randIndex=Math.floor(Math.random()*13);
    return randIndex;
}


function showCard(activePlayer,card){
    if(activePlayer['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`images/${card}.png`;
    cardImage.style.width=`110px`;
    cardImage.style.height=`145px`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);

    hitSound.play();
    }
}

function updateScore(card,activePlayer){
    if(card==='A'){
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score']+=blackjackGame['cardsMap'][card];

    }
    console.log(activePlayer['score'])
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent="BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color='red';

    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    // document.querySelector(activePlayer['scoreSpan']).style.color='white';
    }
}

function Deal(){

    if(blackjackGame['turnsover']===true){
        blackjackGame['isStand']=false;
        // showResult(computeWinner());
        let yourImages= document.querySelector('#yourbox').querySelectorAll('img');
        // console.log(yourImages[0].remove());
        for(let i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }

        let dealerImages= document.querySelector('#dealerbox').querySelectorAll('img');
        // console.log(yourImages[0].remove());
        for(let i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
        
        YOU['score']=0;
        DEALER['score']=0;
        document.querySelector('#yourResults').textContent='0';
        document.querySelector('#yourResults').style.color='white';

        document.querySelector('#dealerResults').textContent='0';
        document.querySelector('#dealerResults').style.color='white';

        document.querySelector('#Results').textContent="Let's Play";
        document.querySelector('#Results').style.color='black';
        
        blackjackGame['turnsover']=false;
    }
}

function computeWinner(){
    let winner;

    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || DEALER['score']>21){
            // console.log('You won!');
            winner=YOU;
            blackjackGame['wins']++;
        }
        else if(DEALER['score']>YOU['score']){
            // console.log('You Loss!');
            winner=DEALER;
            blackjackGame['loss']++;
        }
        else if(DEALER['score']===YOU['score']){
            // console.log('You drew!')
            blackjackGame['draw']++;
        }
    }else if(YOU['score']>21 && DEALER['score']>21){
        // console.log("You drew!");
        blackjackGame['draw']++;
    }
    else if(YOU['score']>21 && DEALER['score']<=21){
        winner=DEALER;
        blackjackGame['loss']++;
        // console.log('You loss!');
    }
    // console.log(winner);
    return winner;

}

function showResult(winner){
    if(blackjackGame['turnsover']===true){
        let msg,msgcolor;
        if(winner===YOU){
            document.querySelector('#win').textContent=blackjackGame['wins'];
            msg="You won!";
            msgcolor='green';
            winSound.play();
        }
        else if(winner===DEALER){
            document.querySelector('#loss').textContent=blackjackGame['loss'];
            msg="You loss!";
            msgcolor='red';
            lossSound.play();
        }
        else{
            document.querySelector('#draw').textContent=blackjackGame['draw'];
            msg="You drew!";
            msgcolor='black';
        }

        document.querySelector('#Results').textContent=msg;
        document.querySelector('#Results').style.color=msgcolor;
    }
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function DealerLogic(){
    blackjackGame['isStand']=true;
    while(DEALER['score']<16 && blackjackGame['isStand']===true){
        
        let card=blackjackGame['card'][randCard()];
        showCard(DEALER,card);
        // console.log();
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000)
    }
    
    blackjackGame['turnsover']=true;
    showResult(computeWinner());
        


}