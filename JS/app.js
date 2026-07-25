/**
 * JS pagina principal
 */

//Variables
var nickname; //nick creado por el usuario
var error; //mensaje de error si se rellena mal el formulario
var selectDificulty; //dificultad seleccionada por el jugador
var totalCards;
var submitForm; 

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
    return;
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

    /**
     * Carga de eventos
     */
    submitForm.addEventListener('submit', checkForm);
}

document.addEventListener('DOMContentLoaded', DOMloaded);