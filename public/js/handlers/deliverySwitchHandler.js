import {checkNoPlaceFoundError} from '/sc/handlers/checkNoPlaceFoundError.js';
import {handleLocalStorage} from '/sc/handlers/handleLocalStorage.js';
import {placeAndTimeRequest} from '/sc/handlers/placeAndTimeRequest.js';

function invertValue(s){
    if(s.checked == true )  {s.checked = false; return s.checked};
    if(s.checked == false)  {s.checked = true; return s.checked };
}

function deliverySwitchHandlerFunction(){

    checkNoPlaceFoundError();
    if(!deliveryLocked){
        invertValue(deliveryOn);
        handleLocalStorage.storeSwitchState(deliveryOn)
        return;

    }
    if(deliveryLocked){
        deliverySwitch.checked = false;
        handleLocalStorage.storeSwitchState(deliveryOn) 
        return;
    }
} 
function deliverySwitchHandler(){

    deliveryLabel.onclick = ()=>{deliverySwitchHandlerFunction();placeAndTimeRequest()};

};

export {deliverySwitchHandler, deliverySwitchHandlerFunction};