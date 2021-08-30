import {handleLocalStorage} from '/sc/handlers/handleLocalStorage.js';
import {placeAndTimeRequest} from '/sc/handlers/placeAndTimeRequest.js';


function enterpriseSwitchHandlerFunction(){

    let turnCompanyVisibilityTo = function (mode){
        document.querySelector("[for=company]").style = `display: ${mode}`;
        },
        turnCompanyRequirementTo = function (trueOrFalse){
            document.getElementById("company").setAttribute("required", trueOrFalse);
        };

    if(enterpriseSwitch.checked){
        enterpriseSwitch.checked = false;
        enterpriseSwitch.value = false;
        turnCompanyVisibilityTo("none");
        turnCompanyRequirementTo(false);
        handleLocalStorage.storeSwitchState(enterpriseSwitch)
        return;
    }

    if(!enterpriseSwitch.checked){
        enterpriseSwitch.checked = true;
        enterpriseSwitch.value = true;
        turnCompanyVisibilityTo("block");
        turnCompanyRequirementTo(true);
        handleLocalStorage.storeSwitchState(enterpriseSwitch)
        return;
    };

}
function enterpriseSwitchHandler(){
    enterpriseLabel.onclick = ()=>{enterpriseSwitchHandlerFunction();placeAndTimeRequest()};
};

export {enterpriseSwitchHandler, enterpriseSwitchHandlerFunction};