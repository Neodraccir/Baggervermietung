import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {processResponseThatLacksDistance} from '/sc/handlers/processResponseThatLacksDistance.js';
import {processResponseThatIncludesDistance} from '/sc/handlers/processResponseThatIncludesDistance.js';

function processResponse(xhr){

    var response = JSON.parse(xhr.responseText),
        body     = document.getElementsByTagName("body")[0];

    addGlobalVar({  response:       JSON.parse(xhr.responseText),
                    dist:           response?.dist,
                    prize:          response?.fullCost,
                    deliveryCost:   response?.deliveryCost,
                    rentalCost:     response?.rentalCost,
                    maxDistance:    response?.maxDistance,
                    distance:       Number(response?.dist),
                    user_id:        response?.user_id,
                    order_id:       response?.order_id
                });


        localStorage.setItem("order_id", order_id);
        localStorage.setItem("user_id", user_id);
  
        logThis("Got this response from Server:");
        logThis(response);
        logThis(`processRequest():\n-->dist = ${dist} \n-->prize = ${prize}`);

        processResponseThatLacksDistance(window);
        processResponseThatIncludesDistance(window);

        if(document.getElementsByTagName("main")[0].style.visibility !== "hidden"){
            loader.style.visibility = "hidden"
        };

     if(localStorage.getItem("checkoutMode") === "true"){
        if(arguments[0].onreadystatechange.name  === "processRequest"){
            formSubmitter();
        };

    }


    if(arguments[0].onreadystatechange.name  === "processTMPOrder"){
        body.dispatchEvent(readyForTable);
    };
        }

export {processResponse}