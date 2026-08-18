/**
 * Player data display & game functionality
 */
//variables
var avatarGame=document.getElementById('avatar-game');
var displayNick=document.getElementById('game-user');
var displayDificulty=document.getElementById('game-dificulty');
var gametries=document.getElementById('game-tries');
var cardsContainer=document.getElementById('cardscontainer');
var gamePoints=document.getElementById('game-points');

//Funciones de juego
function getUserAvatar(){
    avatarGame.src= useravatar;
}

function getUserNick(userNick){
    displayNick.value= userNick;
}

function getDificulty(userdificulty){
    if(userdificulty == "1"){
        displayDificulty.value = "Baja"
        gametries.value=15;
    }else if(userdificulty == "2"){
        displayDificulty.value="Media"
        gametries.value=10;
    }else{
        displayDificulty.value="Alta"
        gametries.value=5;
    }
    return;
}

function showCardAdvantage(useradvantages, cardback){
    if(useradvantages=="1"){
        cardback.style.zIndex="1"
        setTimeout(()=>{cardback.style.zIndex="3"}, 800);
    }
}

function gametriesAdvantage(useradvantages){
    if(useradvantages=="2"){
        gametries.value=parseInt(gametries.value) + 3;
    }
}

var characters={
    "heros": ["ace","chopper","hancock","jinbe","law","luffy","sanji","shanks","usopp","vivi","yamato","zoro"],
    "villains": ["akainu","arlong","buggy","crocodile","doflamingo","enel","kaido","lucci","moria","queen","rocksdxebec","teach"]
}
function renderGame(){
    usercards=Number(usercards)
    cardsContainer.style.gridTemplateColumns=`repeat(${usercards}, 1fr)`

    var totalcells=usercards*usercards;
    var deck=[];
    var paircount;
    if(totalcells===16){
        paircount= 3;
        var specialslots=4;
        for(let i=0; i<specialslots/2; i++){
            deck.push({type: "special", card: "minusone"})
            deck.push({type: "special", card: "skull"})
        }
    }else{
        paircount= Math.floor(totalcells/4);
        var specialslots=totalcells%4;
        //Extra slots for special cards
        for(let i=0; i<specialslots; i++){
            deck.push({type: "special", card: "minustwo"})
        }
    }
    

    //Hero pairs
    for(let i=0; i<paircount; i++){
        var hero=characters.heros[Math.floor(Math.random()* characters.heros.length)];
        deck.push({ type: "heros", card: hero});
        deck.push({ type: "heros", card: hero});
    }

    //villain pair
    for(let i=0; i<paircount; i++){
        var villain=characters.villains[Math.floor(Math.random()* characters.villains.length)];
        deck.push({ type: "villains", card: villain});
        deck.push({ type: "villains", card: villain});
    }


    //Shuffle Deck
    for (let i = deck.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    cardsContainer.innerHTML="";
    for(let item of deck){
        cardsContainer.innerHTML+=`<div class="card">
                    <img src="./media/back card design.png" alt="" class="cardback" data-type="${item.type}" data-name="${item.card}">
                    <img src="./media/${item.type}/${item.card}.jpg" alt="" class="cardfront">
                    </div>`
    }
    //variable de todas las cartas anadidas para la ventaja de revelar las cartas
    var cardBacks=document.getElementsByClassName('cardback');
    for(cardback of cardBacks){
        showCardAdvantage(useradvantages, cardback);
    }
    gametriesAdvantage(useradvantages);
}

var firstCard=null;
var firstCardClicked=false;
gamePoints.value=0;
function flipcard(event){
    var cardClicked=event.target;
    var cardName=cardClicked.dataset.name;
    var cardType=cardClicked.dataset.type;

    //Valriables necesarias para hacer logica de juego completado
    usercards=Number(usercards)
    var totalcells=usercards*usercards;
    var paircount;
    if(totalcells===16){
        paircount= 3;
    }else{
        paircount= Math.floor(totalcells/4);
    }

    //carta de menos 2 para los tableros 3x3 y 5x5
    if(cardType=== "special" && cardName==="minustwo"){
        cardClicked.style.zIndex="1";
        setTimeout(()=>{firstCard.style.zIndex="3"}, 500)
        gametries.value=parseInt(gametries.value)-2;
        return;
    }

    if(!firstCardClicked){
        firstCard=cardClicked;
        firstCardClicked=true;
        firstCard.style.zIndex="1"; 
    }else{
        cardClicked.style.zIndex="1";
        if(firstCard.dataset.name==cardClicked.dataset.name){
            if(firstCard.dataset.type==='special'){
                if(firstCard.dataset.name==='minusone'){
                    gametries.value=parseInt(gametries.value)-1;
                }else if(firstCard.dataset.name==='skull'){
                    gametries.value=0;
                }
            }else{
                //Mantener las 2 cartas volteadas y sumar puntuacion
                gamePoints.value= parseInt(gamePoints.value) +1; 
                gametries.value=parseInt(gametries.value)+2;
            } 
        }else{
            setTimeout(()=>{firstCard.style.zIndex="3"}, 300)
            setTimeout(()=>{cardClicked.style.zIndex="3"}, 300)
        }
        firstCardClicked=false;
        //disminuimos los intentos a si falla al emparejar cartas 
        gametries.value=parseInt(gametries.value)-1;
        gameOver();
        gameCompleted(paircount);
    }
}

function gameCompleted(paircount){
    if(parseInt(gamePoints.value)===parseInt(paircount+paircount)){
        cardsContainer.innerHTML="";
        //Anadimos mensaje ganador y boton para volver a jugar
        winnerMessage=document.createElement('div');
        winnerMessage.id="winner-message";
        winnerMessage.textContent="Has completado el Juego!"
        buttonInput= document.createElement('input');
        buttonInput.type="button";
        buttonInput.value="volver a jugar";
        buttonInput.id="play-again";
        winnerMessage.appendChild(buttonInput);
        cardsContainer.appendChild(winnerMessage);

        //CSS 
        cardsContainer.style.backgroundColor="#9CA3AF"
        winnerMessage.style.display="flex"
        winnerMessage.style.flexDirection="column";
        winnerMessage.style.gap="20px"
        winnerMessage.style.alignItems="center"
        winnerMessage.style.justifyContent="center"
        
        cardsContainer.style.display="flex"
        cardsContainer.style.alignItems="center"
        cardsContainer.style.justifyContent="center"
        cardsContainer.style.width="590px"
        cardsContainer.style.height="510px"

        //Boton de jugar de nuevo crea un nuevo tablero
        var playAgainButton=document.getElementById('play-again');
        playAgainButton.addEventListener('click', restartGame);
    }
}

function gameOver(){
    if(gametries.value<=0){
        cardsContainer.innerHTML="";
        buttonInput= document.createElement('input');
        buttonInput.type="button";
        buttonInput.value="Intentar de nuevo";
        buttonInput.id="try-again";
        cardsContainer.appendChild(buttonInput);

        //CSS del cardContainer y button cuando hay gameover
        cardsContainer.style.backgroundColor="#9CA3AF"
        cardsContainer.style.display="flex"
        cardsContainer.style.alignItems="center"
        cardsContainer.style.justifyContent="center"
        cardsContainer.style.width="590px"
        cardsContainer.style.height="510px"

        var tryagain=document.getElementById('try-again');
        //boton de intentar de nuevo
        tryagain.addEventListener('click', restartGame);
    }
}

function resetCSS(){
    cardsContainer.style.position="relative";
    cardsContainer.style.display="grid";
    cardsContainer.style.justifyContent="space-between";
    cardsContainer.style.margin="5px";
    cardsContainer.style.gap="10px"
    cardsContainer.style.backgroundColor="#F4F1EC"
}

function bindCardsEvent(){
    var cards=document.getElementsByClassName('card');
    for(let item of cards){
        item.addEventListener('click', flipcard);
    }
}

function restartGame(){
    firstCard=null;
    firstCardClicked=false;
    gamePoints.value = 0;
    resetCSS();
    getDificulty(userdificulty);
    renderGame();
    bindCardsEvent();
}

//Obtenemos datos de usuario actual
getUser();
//Obtenemos avatar 
getUserAvatar();
//Obtenemos userNick
getUserNick(userNick);
//Obtenemos dificultad elegida por el usuario
getDificulty(userdificulty);
//Renderizamos juego
renderGame();

/**
 * Eventos
 */
bindCardsEvent(); 
