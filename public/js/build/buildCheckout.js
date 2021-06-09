import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {buildTable} from '/sc/build/buildTable.js';
import {postTMPOrderRequest} from '/sc/handlers/postTMPOrderRequest.js';
import {buildAfterSentMessageBox} from '/sc/handlers/buildAfterSentMessageBox.js'



function buildCheckout(){

    let orderRequestMessageStatus = localStorage.getItem("orderRequestMessageStatus");

    function deleteTableWaste(){
        let additionalTables = document.getElementsByTagName("table");
        let wasteTables = []
        for(let key in additionalTables){
            if(!Number.isNaN(key)){
              wasteTables.push(additionalTables[key])
            }
        }
        wasteTables.forEach((e)=>{
            if(e instanceof HTMLElement){e.remove()}
        })
    }

    addGlobalVar({recreateForm: function(){
        localStorage.setItem("checkoutMode", "false");
        setTimeout(deleteTableWaste(),1);
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


