import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {sendRequestIfUserStoppedTyping} from '/sc/handlers/sendRequestIfUserStoppedTyping.js';


function handlePlaces(window){

    var pacInput = addGlobalVar({
        pacInput : document.getElementById("pac-input")
        });


    pacInput.addEventListener('input',sendRequestIfUserStoppedTyping);

}

export{handlePlaces}