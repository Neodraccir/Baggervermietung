import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';
import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';



function buildAfterSentMessageBox(orderRequestMessageStatus){

    body.afterSentMessageBox = addGlobalVar({afterSentMessageBox:
            new ElementWithAttributes('div',
                {attribute: "id", value: "afterSentMessageBox"},
                body
            )
        }
    )

    body.afterSentMessageBox.x = new ElementWithAttributes('div',
    {attribute: "class", value:"X"},
    body.afterSentMessageBox
    )

    body.afterSentMessageBox.x.content = new ElementWithAttributes('div',
    {attribute: "class", value:"X"},
    body.afterSentMessageBox.x
    )

    body.afterSentMessageBox.sentBoxContent = new ElementWithAttributes('div',
    {attribute: "id", value:"sentBoxContent"},
    body.afterSentMessageBox
    )

    body.afterSentMessageBox.x.content.innerHTML = "X"

    body.afterSentMessageBox.x.onclick = ()=>body.afterSentMessageBox.style.visibility="hidden"

    if(orderRequestMessageStatus === "sent"){
        body.afterSentMessageBox.sentBoxContent.innerHTML = "Anfrage wurde erfoglreich versendet.\nJemand wird sich in Kürze bei Ihnen melden. "

    }

    if(orderRequestMessageStatus === "failed"){
        body.afterSentMessageBox.sentBoxContent.innerHTML = "Hoppla. Etwas ist beim Absenden schiefgelaufen.\nBitte rufen Sie uns einfach direkt unter der Nummer an: +49 1575 2760564"
    }

    
}

export{buildAfterSentMessageBox}


