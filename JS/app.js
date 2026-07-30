/**
 * JS pagina principal
 */

//Variables
var nickname; //nick creado por el usuario
var error; //mensaje de error si se rellena mal el formulario
var selectDificulty; //dificultad seleccionada por el jugador
var totalCards;
var submitForm; 
var avatar; //Avatar principal seleccionado por el usuario
var dragabbleItem; //Avatares que puede arrastrar y seleccionar el usuario
var avatarContainer; //Contenedor del avatar

/**
 * Funciones de evento
 */
function checkForm(event){
    if(nickname.value.trim()==="" || nickname.value.length<0){
        event.preventDefault();
        error.innerText="Nickname no valido!"
    }else if(totalCards.value==""){
        event.preventDefault();
        error.innerText="Selecciona la cantidad de cartas!"
    }
    saveUserData();
    return;
}

function saveUserData(){
    let userData={
        "nickname": nickname.value,
        "avatar": avatar.src,
    }
    localStorage.setItem('users', JSON.stringify(userData));
}

function dragItem(event){
    item=event.target;
}

function changeAvatar(){
    avatar.src=item.src;
}

/**
 * Carga del DOM
 */
function DOMloaded(){
    //Llamamos variables
    nickname=document.getElementById('nickname');
    error=document.getElementById('error');
    submitForm=document.getElementById('form');
    selectDificulty=document.getElementById('dificulty');
    totalCards=document.getElementById('totalcards');
    avatar=document.getElementById('avatar-selected');
    dragabbleItem=document.getElementsByClassName('avatar');
    avatarContainer=document.getElementById('main-avatar');

    /**
     * Carga de eventos
     */
    submitForm.addEventListener('submit', checkForm);

    /**
     * Drag & Drop Event
     */
    //DragStart
    for(let item of dragabbleItem){
        item.addEventListener('dragstart', dragItem);
    }
    //Dragover
    avatarContainer.addEventListener('dragover', (e)=> {e.preventDefault()});
    //Drop
    avatarContainer.addEventListener('drop', changeAvatar);
}

document.addEventListener('DOMContentLoaded', DOMloaded);