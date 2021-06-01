import {placeAndTimeRequest} from '/sc/handlers/placeAndTimeRequest.js';


var sendRequestIfUserStoppedTyping = function(){

    let originalValue = pacInput.value,
        copyValue     = originalValue;

    if(originalValue.length > 6){
        setTimeout(function(){
            originalValue = pacInput.value;
            if(originalValue === copyValue){
                localStorage.setItem("place", pacInput.value);
                placeAndTimeRequest();
            }
        },2000)
    }           

};

export {sendRequestIfUserStoppedTyping}