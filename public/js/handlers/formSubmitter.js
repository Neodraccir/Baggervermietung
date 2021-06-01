import {buildCheckout} from '/sc/build/buildCheckout.js'
function formSubmitter(){
    let formCompletelyFilledOut     = true,
        priceSucessfullyCalculated  = true,
        thereAreNoContradictions    = true;

    form.querySelectorAll("[required=true").forEach(function(i){

        if(i.value == undefined || i.value == null || i.value == ""){
            logThis(`${i.name} was not filled out correctly`)
            formCompletelyFilledOut = false;
        };

        if(isNaN(prize)){
            logThis(`Prize("${prize}") is not a Number!`)
            priceSucessfullyCalculated = false;
        }

        if(isNaN(distance) && deliveryOn.checked){
            logThis(`You cannot have ${distance} as distance and delivery on? = ${deliveryOn.checked}`)
            thereAreNoContradictions = false;
        }

   
    })


    if(formCompletelyFilledOut && priceSucessfullyCalculated && thereAreNoContradictions){
        buildCheckout();
        setTimeout(()=>{localStorage.setItem("checkoutMode", "true")},1000);

    }

}

export {formSubmitter}