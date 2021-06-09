import {formSubmitter} from '/sc/handlers/formSubmitter.js';
import {placeAndTimeRequest} from '/sc/handlers/placeAndTimeRequest.js';



function handleSubmitButton(){
    
    placeAndTimeRequest();
    formSubmitter();
}

export {formSubmitter}