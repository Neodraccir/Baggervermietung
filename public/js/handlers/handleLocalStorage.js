import {placeAndTimeRequest}                from '/sc/handlers/placeAndTimeRequest.js';
import {enterpriseSwitchHandlerFunction}    from '/sc/handlers/enterpriseSwitchHandler.js';
import {deliverySwitchHandlerFunction}      from '/sc/handlers/deliverySwitchHandler.js';

var inputCollection     = document.getElementsByTagName("input"),
    textAreas           = document.getElementsByTagName("textArea"),
    isADateInput        = (i)=>inputCollection[i] === inputCollection["dateRangeEnd"] || inputCollection[i] === inputCollection["dateRangeStart"],
    isASwitch           = (i)=>inputCollection[i].name === "inclDelivery" || inputCollection[i].name === "isEnterprise",
    storeInputDataFrom  = function(collection){

        for (let i = 0; i<collection.length; i++){
            if(!isADateInput(i) && !isASwitch(i)){
                collection[i].addEventListener('input',function(){
                    for (let i = 0; i<collection.length; i++){
                        localStorage.setItem(collection[i].name, collection[i].value);
                    }
                });
            }
              collection[i].value = localStorage.getItem(collection[i].name)
        };

    },
   loadSwitchState    = function(theSwitch, switchHandlerFunction){

        let storedValueInverted = (localStorage.getItem(theSwitch.name) == "true")?false:true;
        theSwitch.checked = storedValueInverted;
        switchHandlerFunction();

    },
    handleLocalStorage  = function(){

        storeInputDataFrom(inputCollection);
        storeInputDataFrom(textAreas);
        loadSwitchState(deliveryOn, deliverySwitchHandlerFunction);
        loadSwitchState(enterpriseOn, enterpriseSwitchHandlerFunction);

        if(localStorage.getItem("place")!== null){
            placeAndTimeRequest();
        }

    };

handleLocalStorage.calendar = function(){
    localStorage.setItem("dateRangeStart", dateRangeStart.value);
    localStorage.setItem("dateRangeEnd", dateRangeEnd.value);
}; 

handleLocalStorage.storeSwitchState    = function(theSwitch){
    localStorage.setItem(theSwitch.name, theSwitch.checked);
};

export {handleLocalStorage}

