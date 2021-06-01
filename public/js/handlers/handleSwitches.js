import {enterpriseSwitchHandler} from '/sc/handlers/enterpriseSwitchHandler.js';
import {deliverySwitchHandler} from '/sc/handlers/deliverySwitchHandler.js';



function handleSwitches(){

    deliveryOn.checked   = true;
    enterpriseOn.checked = false;

    enterpriseSwitchHandler();
    deliverySwitchHandler();


}



export {handleSwitches}