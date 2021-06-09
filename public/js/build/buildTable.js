import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js'
import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {reorderItemsInDOM} from '/sc/generalFunctions/reorderItemsInDOM.js';
import {postFinalTMPOrder} from '/sc/handlers/postFinalTMPOrder.js';
import {manipulateAndDeactivateButton} from '/sc/handlers/manipulateAndDeactivateButton.js';


function buildTable(){

    if(document.getElementsByTagName("table").length < 1){
        body.table       = addGlobalVar({table: new ElementWithAttributes('table',
                                                {attribute: "id", value:"table"}, body)
                                                });
        var valueName   = {
                distance:       ["Distanz", "km"],
                fullCost:       ["Preis (Gesamt)", "€"],
                deliveryCost:   ["Lieferkosten", "€"],
                rentalCost:     ["Mietkosten", "€"],
                maxDistance:    ["Maximale Lieferstrecke", "km", "hidden"],
                isInclDelivery: ["Lieferung inklusive?", "Boolean"],
                isEnterprise:   ["Geschäftlich?", "Boolean"],
                user_id:        ["Benutzer-ID", "hidden"],
                order_id:       ["Bestellungs-ID", "hidden"],
                amountOfDays:   ["Mietdauer", "Tage"],
                dateStart:      ["Startdatum"],
                dateEnd:        ["Enddatum"],
                travelTime:     ["Fahrtzeit", "hidden"],
            };

            function buildBasicTableRows(e){

                table[e] = new ElementWithAttributes('tr',
                {attribute:'id', value: 'tr_'+e}, table
                );

                table[e].td1 = new ElementWithAttributes('td',
                {attribute:'id', value: 'td1_'+e}, table[e]
                );

                table[e].td2 = new ElementWithAttributes('td',
                {attribute:'id', value: 'td2_'+e}, table[e]
                );

                table[e].td1.innerHTML= valueName[e][0];

            };

            function addButtons(){

                table.buttons = new ElementWithAttributes('tr',
                {attribute:'id', value: 'tr_buttons'}, table
                );

        table.buttons.left =  new ElementWithAttributes('td',
            {attribute:'id', value: 'button_left'}, table.buttons
            );

            table.buttons.right =  new ElementWithAttributes('td',
            {attribute:'id', value: 'sendButton'}, table.buttons
            );


            var editButton = new ElementWithAttributes('button',[
                    {attribute: "id", value: "editButton"},
                    {attribute: "value", value: "Korrigieren"},
                ],document.getElementById("table").buttons.left);
            editButton.innerHTML = "Nochmal zurück?";
            editButton.onclick = recreateForm;


            var sendButton = new ElementWithAttributes('button',[
                    {attribute: "id", value: "sendButton"},
                    {attribute: "value", value: "Senden"},
                ],document.getElementById("table").buttons.right);
            sendButton.innerHTML = "Anfrage absenden";
            sendButton.onclick = postFinalTMPOrder;

            }


        Object.keys(response).forEach((e)=>{


            let tableRow                    = valueName?.[e],
                lastInTableRow              = ()=>tableRow?.[tableRow.length-1],
                secondInTableRowIs          = (string)=>tableRow[1]===string,
                isNotAHiddenValue           = ()=>(lastInTableRow() !== undefined && lastInTableRow() !== "hidden")?true:false,
                tableRowLength              = ()=>tableRow?.length;


            if(isNotAHiddenValue()){

                buildBasicTableRows(e);

                let answerField                 = table[e].td2,
                    rawAnswer                   = ()=>answerField.innerHTML = response[e],
                    addToAnswer                 = (string)=>answerField.innerHTML = `${response[e]} ${string}`;

                if(secondInTableRowIs("Boolean")){
                    let answer;
                    if(response[e] == "true"){answer = "Ja"}
                    if(response[e] == "false"){answer = "Nein"}
                    answerField.innerHTML = answer; 

                }else if(tableRowLength() > 1){
                    addToAnswer(tableRow[1]);
                };

                if(tableRowLength() === 1){
                    rawAnswer();
                };
            }

        })

        reorderItemsInDOM("table",[6,7,8,5,4,0,2,3,1], body);
        addButtons();
        manipulateAndDeactivateButton(document.getElementById("sendButton"), localStorage.getItem("orderRequestMessageStatus"));
    }

}

export {buildTable}