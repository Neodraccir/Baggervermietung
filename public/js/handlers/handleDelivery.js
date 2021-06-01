
function handleDelivery(window){

    window.deliveryOn.addEventListener('change', function(window){
        if(distance>45){
            logThis(`Zu weit entfernt für Lieferung: ${distance}km`)
            deliveryOn.checked = false;
            document.getElementById("deliveryTurnedOn").innerHTML= "zu weit weg";
            document.getElementById("deliveryTurnedOn").style.width= "170%";

        }
        inclDelivery = deliveryOn.checked;
        placeAndTimeRequest(window, pacInput.value);
    });
}

export {handleDelivery}