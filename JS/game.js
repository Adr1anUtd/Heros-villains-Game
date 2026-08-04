/**
 * Player data display & game functionality
 */
//variables
var avatarGame=document.getElementById('avatar-game');
var displayNick=document.getElementById('game-user');
var displayDificulty=document.getElementById('game-dificulty');
var gametries=document.getElementById('game-tries');
var cardsContainer=document.getElementById('cardscontainer');

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

var characters={
    "heros": ["ace","chopper","hancock","jinbe","law","luffy","sanji","shanks","usopp","vivi","yamato","zoro"],
    "villains": ["akainu","arlong","buggy","crocodile","doflamingo","enel","kaido","lucci","moria","queen","rocksdxebec","teach"]
}
var cardType=["heros", "villains"];
function renderGame(){
    usercards=Number(usercards)
    hero_count=0;
    villain_count=0;
    cardsContainer.style.gridTemplateColumns=`repeat(${usercards}, 1fr)`
    for (let i = 0; i < usercards*usercards; i++) {
        let index_1=Math.floor(Math.random(cardType)*cardType.length);
        let cardtype=cardType[index_1];
        let index= Math.floor(Math.random(characters[cardtype])*characters[cardtype].length);
        let card=characters[cardtype][index];
        cardsContainer.innerHTML+=`<div class="card">
                    <img src="./media/back card design.png" alt="" class="cardback" data-id="${cardtype}">
                    <img src="./media/${cardtype}/${card}.jpg" alt="" class="cardfront">
                    </div>`
        characters[cardtype].splice(index, 1); //eliminamos card elegida para que no se repita
    }
}

function flipcard(event){
    cardclicked=event.target;
    cardclicked.style.zIndex="1";
    console.log(cardclicked.dataset.id);
    setTimeout(()=>{cardclicked.style.zIndex="3"}, 3000);
}

//Obtenemos datos de usuario actual
getUser();
//Obtenemos avatar 
getUserAvatar();
//Obtenemos userNick
getUserNick(userNick);
//Obtenemos dificultad elegida por el usuario
getDificulty(userdificulty);
//Renderizamos juego segun cantidad de cartas
renderGame();

/**
 * Eventos
 */
var cards=document.getElementsByClassName('card');
for(let item of cards){
    item.addEventListener('click', flipcard);
}
