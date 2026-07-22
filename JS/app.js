/**
 * JS pagina principal
 */

//Variables
var nickname;
var error;
var submitForm;

/**
 * Funciones de evento
 */
function checkForm(event){
    if(nickname.value.trim()==="" || nickname.value.length<0){
        error.innerText="Nickname no valido!"
    }else{
        console.log("form rellenado correctamente");
    }
}

/**
 * Carga del DOM
 */
function DOMloaded(){
    //Llamamos variables
    nickname=document.getElementById('nickname');
    error=document.getElementById('error');
    submitForm=document.getElementById('form');

    /**
     * Carga de eventos
     */
    submitForm.addEventListener('submit', checkForm);
}

document.addEventListener('DOMContentLoaded', DOMloaded);