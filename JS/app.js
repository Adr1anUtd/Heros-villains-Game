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
var advantages; //Si el usuario elige una ventaja

/**
 * Funciones de evento
 */
function checkForm(event){
    if(nickname.value.trim()==="" || nickname.value.length<0){
        event.preventDefault();
        error.innerText="Nickname no valido!"
        return false;
    }else if(selectDificulty.value==""){
        event.preventDefault();
        error.innerText="Selecciona una dificultad!"
        return false;
    }else if(totalCards.value==""){
        event.preventDefault();
        error.innerText="Selecciona la cantidad de cartas!"
        return false;
    }
    saveUser(nickname, avatar, selectDificulty, totalCards, advantages);
    UserData();
    return true;
}

//Se guardan datos de usuario actual
function saveUser(nickname, avatar, selectDificulty, totalCards, advantages){
    sessionStorage.setItem('nick', nickname.value);
    sessionStorage.setItem('avatar', avatar.src);
    sessionStorage.setItem('dificulty', selectDificulty.value);
    sessionStorage.setItem('totalcards', totalCards.value);
    sessionStorage.setItem('advantages', advantages.value);
}

function getUser(){
    userNick=sessionStorage.getItem('nick');
    useravatar=sessionStorage.getItem('avatar');
    userdificulty=sessionStorage.getItem('dificulty');
    usercards=sessionStorage.getItem('totalcards');
    useradvantages=sessionStorage.getItem('advantages');
}
/**
 * Se verifica y se crean datos de usuario si no existen en el storage
 */
function UserData(){
    let userData={
        "nickname": nickname.value,
        "date": Date.now()
    }
    let usersHistory=localStorage.getItem('users');
    let users;
    if(usersHistory==null){
        users=[];
    }else{
        users=JSON.parse(usersHistory);
        for(let user of users){
            if(user.nickname==nickname.value) return;
        }
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return users;
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
    advantages=document.getElementById('advantages');

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