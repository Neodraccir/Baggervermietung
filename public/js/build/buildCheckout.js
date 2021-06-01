import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {buildTable} from '/sc/build/buildTable.js';
import {postTMPOrderRequest} from '/sc/handlers/postTMPOrderRequest.js';
import {buildAfterSentMessageBox} from '/sc/handlers/buildAfterSentMessageBox.js'



function buildCheckout(){

    let orderRequestMessageStatus = localStorage.getItem("orderRequestMessageStatus");

    addGlobalVar({recreateForm: function(){
        localStorage.setItem("checkoutMode", "false");
        table?.remove();
        form.style.display = "grid";
        localStorage.removeItem("orderRequestMessageStatus")

    }})


    const body = document.getElementsByTagName("body")[0];
    body.addEventListener('readyForTable', function tableBuilder(){
        buildTable()
        body.removeEventListener('readyForTable', tableBuilder);
    })

    form.style.display = "none";
    headline2.innerHTML = "Bitte prüfen Sie Ihre Daten";

    postTMPOrderRequest();

    if(orderRequestMessageStatus){
        buildAfterSentMessageBox(orderRequestMessageStatus)
    }


}


export {buildCheckout}


