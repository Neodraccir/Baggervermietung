import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {formSubmitter} from '/sc/handlers/formSubmitter.js';
import {handleSubmitButton} from '/sc/handlers/handleSubmitButton.js';



var loadGlobalVariables = function(){
       
    addGlobalVar({
        dateStart    : '0',
        dateEnd      : '0',
        inclDelivery : true,
        distance     : 'not_yet',
        companyName  : '0',
        firstName:          document.getElementById("first_name"),
        lastName:           document.getElementById("last_name"),
        enterpriseOn:       document.getElementsByName("isEnterprise")[0],
        enterpriseSwitch:   document.getElementsByName("isEnterprise")[0],
        enterpriseLabel:    document.querySelector('[for=switch1]'),
        button:             document.querySelectorAll("form>#button")[0],
        plusDelivery:       document.getElementById('plusDelivery'),
        deliveryOn:         document.getElementsByName("inclDelivery")[0],
        isInclDelivery:     document.getElementsByName("inclDelivery")[0],
        deliverySwitch:     document.getElementById("deliveryTurnedOn"),
        deliveryLabel:      document.querySelector('[for=switch2]'),
        deliveryLocked:     false,
        prizeDiv:           document.getElementById("thePrice"),                        
        prizeInput:         document.getElementById('price'),
        distDiv:            document.getElementById('dist'),
        distInput:          document.getElementById('distance'),
        form:               document.getElementById('form'),
        formSubmitter:      formSubmitter,
        handleSubmitButton: handleSubmitButton,
        readyForTable:      new CustomEvent('readyForTable')

    });
    
};

export {loadGlobalVariables}