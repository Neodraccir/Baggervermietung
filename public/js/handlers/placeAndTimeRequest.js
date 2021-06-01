import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {processResponse} from '/sc/handlers/processResponse.js';
import {postPlaceReq} from '/sc/handlers/postPlaceReq.js';

//TODOS:
//Preis muss richtig anzeigt werden
//fullcost oder rentalcost je nach delivery cost
//außerdem "/sent" ersetzen durch durch DOM Manipulation
//daten müssen beim absenden abschließend auf dem Server geprüft, gespeicher und zurück in den Client DOM gesendet werden,
// dann muss dieser nochmal bestätigen, dann wird erst vom Server auf bot bei Telegram
// dann muss bei Telegram noch bestäigt werden
// status bleibt auf Seite sichtbar

function placeAndTimeRequest(){


    var xhr                 = addGlobalVar({xhr : new XMLHttpRequest()}),
        processRequest      = addGlobalVar({processRequest : function(e){
            if(xhr.readyState === 4 && xhr.status === 200){processResponse(xhr)}        
        }});

    postPlaceReq(xhr);

    xhr.onreadystatechange = processRequest;
          
}



export {placeAndTimeRequest}

