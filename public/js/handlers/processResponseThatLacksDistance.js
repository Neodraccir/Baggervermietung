function processResponseThatLacksDistance(){


    if(isNaN(distance)){



        logThis('dist = '+dist);
        logThis('deliveryCost? '+deliverySwitch.checked)
        distDiv.innerHTML  = '?km';
        prize = rentalCost;
        prizeDiv.innerHTML = rentalCost+"€";
        prizeInput.value   = rentalCost;

        if(deliverySwitch.checked == true){
            prizeInput.value            = undefined;
            plusDelivery.style.display  = "block";
            plusDelivery.innerHTML      = "+Lieferung";
        }


        if(deliverySwitch.checked == false){
            plusDelivery.style.display  = "none";
        }


        
    }


}

export {processResponseThatLacksDistance}