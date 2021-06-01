function manipulateAndDeactivateButton(sendButton, orderRequestMessageStatus){


                    if(orderRequestMessageStatus != undefined){
                    sendButton.disabled = true;
                    }

                    if (orderRequestMessageStatus === "sent"){
                        sendButton.innerHTML = "Anfrage abgesendet"
                    }

                    if (orderRequestMessageStatus === "failed"){
                        sendButton.innerHTML = "Senden fehlgeschlagen"
                    }
}

export {manipulateAndDeactivateButton}
