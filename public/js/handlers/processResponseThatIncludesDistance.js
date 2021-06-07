import {checkNoPlaceFoundError} from '/sc/handlers/checkNoPlaceFoundError.js';
import {handleLocalStorage} from '/sc/handlers/handleLocalStorage.js';

function processResponseThatIncludesDistance(){

    globalThis = window;

    if(!isNaN(distance)){

        distDiv.innerHTML      = dist+"km";
        distInput.value        = dist;


        if(deliveryOn.checked == true){
            prizeDiv.innerHTML     = prize+"€";
            prizeInput.value       = prize;
            plusDelivery.style.display = "block";
            plusDelivery.innerHTML     = `inkl. ${deliveryCost}€ Lieferung`;
        };

        if(deliveryOn.checked == false){
            prizeDiv.innerHTML     = rentalCost+"€";
            prizeInput.value       = rentalCost;
            plusDelivery.style.display = "none";
        };

        checkNoPlaceFoundError();
        setTimeout(()=>{
            logThis("#cnPEE: dist "+dist)
            if(distance>maxDistance){
                logThis("#cnPEE: Place too far off for delivery")
                isInclDelivery.checked = false;
                deliveryLocked         = true;
                prize = rentalCost;
                prizeDiv.innerHTML     = rentalCost+"€";
                prizeInput.value       = rentalCost;
                plusDelivery.style.display  = "none";
                deliverySwitch.innerHTML = "Ort zu weit entfernt"
                deliverySwitch.style.fontSize = "calc(var(--line-height) * 0.8)";
                deliverySwitch.style.width = "200px";
                handleLocalStorage.storeSwitchState(deliverySwitch) 

            }},
            0
        );


        if((distance<maxDistance)){
            deliveryLocked      = false;
            deliverySwitch.innerHTML = "Lieferung";
            deliverySwitch.style.fontSize = "var(--line-height)";
            handleLocalStorage.storeSwitchState(deliverySwitch) 
    
        };
    };
};

export {processResponseThatIncludesDistance}