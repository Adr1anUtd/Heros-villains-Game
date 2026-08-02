/**
 * Player data display & game functionality
 */
//variables
var avatarGame=document.getElementById('avatar-game');
var displayNick=document.getElementById('game-user');
var displayDificulty=document.getElementById('game-dificulty');
var gametries=document.getElementById('game-tries');

//Funciones de juego
function getUserAvatar(){
    avatarGame.src= useravatar;
}

function getUserNick(userNick){
    displayNick.value= userNick;
}

function getDificulty(userdificulty){
    if(userdificulty.value = "1"){
        displayDificulty.value = "Baja"
        gametries.value=15;
    }else if(userdificulty.value = "2"){
        displayDificulty.value="Media"
        gametries.value=10;
    }else{
        displayDificulty.value="Alta"
        gametries.value=5;
    }
    return;
}


//Obtenemos datos de usuario actual
getUser();
//Obtenemos avatar 
getUserAvatar();
//Obtenemos userNick
getUserNick(userNick);
//Obtenemos dificultad elegida por el usuario
getDificulty(userdificulty);
