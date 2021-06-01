function checkNoPlaceFoundError(){
    logThis("#cnPFE: called: checkNoPlaceFoundError()")
    logThis(`#cnPFE: deliveryOn.checked = ${deliveryOn.checked} && isNaN(distance) = ${isNaN(distance)}`)

    if(deliveryOn.checked == true && isNaN(distance)){
        button.style.color = "rgba(32, 27, 25, 0.78)";
        if (window.matchMedia("(hover:none)").matches){
            logThis("hover: none")
            button.style.fontSize = "calc(var(--line-height)*1.1)";
        }else{
            button.style.fontSize = "calc(var(--line-height)*0.8)";
        }
        button.value = "Bitte Adresse der Baustelle angeben";
        button.type = "";
    }else{
        button.style.color = "rgba(226, 216, 211, 0.925)";
        button.value = "Unverbindlich anfragen";
        button.type = "button"
        button.style.fontSize = "calc(var(--line-height)*1)";

    }

    }

    export {checkNoPlaceFoundError}