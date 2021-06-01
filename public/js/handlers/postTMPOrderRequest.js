import {postDataToServer} from '/sc/handlers/postDataToServer.js';
import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {processResponse} from '/sc/handlers/processResponse.js';




function postTMPOrderRequest(){

    var xhr_tmp = addGlobalVar({xhr_tmp: new XMLHttpRequest()}),
        processTMPOrder = addGlobalVar({processTMPOrder : function(){
            if(xhr_tmp.readyState === 4 && xhr_tmp.status === 200){
                        processResponse(xhr_tmp)
                    }        
                }});

    postDataToServer(xhr_tmp, '/requestTMPOrder', `{"user_id": "${localStorage.getItem("user_id")}"}`);
    xhr_tmp.onreadystatechange = processTMPOrder;

}

export {postTMPOrderRequest}