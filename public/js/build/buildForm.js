import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';
import {labelCreator} from '/sc/generalFunctions/labelCreator.js';
import {inputCreator} from '/sc/build/inputCreator.js';
import {reorderItemsInDOM} from '/sc/generalFunctions/reorderItemsInDOM.js';


var     formContent  = {},
        form         = {},

        buildForm   = async function(parent){

                            try{

                                formContent = await fetch('/formContent');
                                formContent = await formContent.json();


                                form = new ElementWithAttributes('form', [
                                        {attribute: 'id',       value: 'form'},
                                        {attribute: 'action',   value:  formContent.form.action},
                                        {attribute: 'method',   value:  formContent.form.method}
                                    ], parent);
                                    
                                labelCreator(formContent.labels, form);
                                inputCreator(formContent.labels, form);

                                form.submitButton = new ElementWithAttributes('input',[
                                    {attribute: 'id', value: 'button'},
                                    {attribute: 'type', value: 'button'},
                                    {attribute: 'onclick', value: 'handleSubmitButton()'},
                                    {attribute: 'value', value: formContent.submitButton}
                                ],form);

               
                                var distanceDiv = new ElementWithAttributes('div', [
                                    {attribute: 'id', value: 'dist'},
                                    {attribute: 'class', value: 'theDistance'}
                                ],form.distance_label);
                                distanceDiv.innerHTML = 'bitte Ort angeben';
                                form.distance.style = "display: none"

                                var priceDiv = new ElementWithAttributes('div', [
                                    {attribute: 'id', value: 'thePrice'},
                                    {attribute: 'class', value: 'thePrice'}
                                ], form.price_label);
                                priceDiv.innerHTML = '?€';
                                form.price.style = "display: none";

                                var deliverDiv = new ElementWithAttributes('div', 
                                {attribute: 'id', value: 'plusDelivery'},
                                form.price_label)
                                deliverDiv.innerHTML = '+Lieferung'

                                reorderItemsInDOM("price_label", [0,2,3,1], form);
                                reorderItemsInDOM("distance_label",[0,2,1], form);

                                document.dispatchEvent(document.loadedForm);

                            }

                            catch(err){
                                logThis(err)
                            }
        };



export{buildForm};