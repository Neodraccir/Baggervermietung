import {postDataToServer} from '/sc/handlers/postDataToServer.js';
import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {manipulateAndDeactivateButton} from '/sc/handlers/manipulateAndDeactivateButton.js';
import {buildAfterSentMessageBox} from '/sc/handlers/buildAfterSentMessageBox.js'




function postFinalTMPOrder(){

    var xhr_tmp = addGlobalVar({xhr_tmp: new XMLHttpRequest()}),
        finalizeTMPOrder = addGlobalVar({finalizeTMPOrder : function(){
            if(xhr_tmp.readyState === 4 && xhr_tmp.status === 200){

                logThis("Got this response:");
                logThis(xhr_tmp);
                
                let orderRequestMessageStatus = JSON.parse(xhr_tmp.responseText).orderRequestMessageStatus,
                    sendButton = document.getElementById("sendButton");

                localStorage.setItem("orderRequestMessageStatus", orderRequestMessageStatus);
                manipulateAndDeactivateButton(sendButton, orderRequestMessageStatus);
                if(document.getElementsByTagName("main")[0].style.visibility !== "hidden"){
                    loader.style.visibility = "hidden"
                };

                buildAfterSentMessageBox(orderRequestMessageStatus);

                    }        
                }});

    postDataToServer(xhr_tmp, '/finalTMPOrder', `{"user_id": "${localStorage.getItem("user_id")}"}`);
    xhr_tmp.onreadystatechange = finalizeTMPOrder;

} 

export {postFinalTMPOrder}




