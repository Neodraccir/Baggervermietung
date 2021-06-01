import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';

function inputCreator (inputsObject, form){

    let values             = Object.values(inputsObject),
        keys               = Object.keys(inputsObject);


    values.forEach((element, index)=>{

        let inputElement       = form[keys[index]],
            spanElement        = form[keys[index]+"_span"],
            parent             = document?.querySelectorAll(`[for=${keys[index]}]`)?.[0],
            returnStringOr     = (potentialString, alternative)=> typeof potentialString === 'string'?potentialString:alternative,
            newInputElement    = function (required = true,  textarea = false){



                                    let spanElement = new ElementWithAttributes('span',
                                    {attribute:'class', value: keys[index]},parent?parent:form);
                        
                                    spanElement.innerHTML = returnStringOr(element,Object.values(element)[0]);

                                    let attributesAndValuesArray = [
                                                                        {attribute: 'id', value: keys[index]},
                                                                        {attribute: 'name', value: keys[index]},
                                                                        {attribute: 'type', value: 'text'},
                                                                        {attribute: 'required', value: required?'true':'false'}
                                                                    ],

                                        thisReturnsDuplicateAttributeIfExisting = (currentObject)=>{
                                            for (let i = 0; i<attributesAndValuesArray.length; i++){
                                                if (attributesAndValuesArray[i].attribute === currentObject.attribute){
                                                    return attributesAndValuesArray[i];
            
                                                }else return false
                                            }
                                        },

                                        
                                        checkForExtraAttributes = (function(arg){
                                            if (arg.length >= 3){
                                                for(let i = 2; i < arg.length; i++){
                                                    if(arg[i]?.attribute && arg[i]?.value){
                                                        let duplicate = thisReturnsDuplicateAttributeIfExisting(arg[i]);
                                                        if(duplicate){
                                                            attributesAndValuesArray[attributesAndValuesArray.indexOf(duplicate)] = arg[i];
                                                        }else{
                                                            attributesAndValuesArray.push(arg[i]);
                                                        }
                                                    }
                                                    if(arg[i]?.attribute && !arg[i]?.value){
                                                        logThis(`Object ${arg[i]} has no 'value' property`)
                                                    }
                                                    if(!arg[i]?.attribute && arg[i]?.value){
                                                        logThis(`Object ${arg[i]} has no 'attribute' property`)
                                                    }
                                                    if(!arg[i]?.attribute && !arg[i]?.value){
                                                        logThis(`Object ${arg[i]} has no 'value' and no 'attribute' property`)
                                                    }
                                                }
                                            };
                                        })(arguments)        
                 
                                        inputElement = new ElementWithAttributes(textarea?'textarea':'input',attributesAndValuesArray,parent?parent:form);
                                    return inputElement;
                                },


            newSwitchElement    = ()=>{
                                    let newCheckboxSwitch = new ElementWithAttributes('input',[
                                            {attribute: 'name', value: element.switch[0]},
                                            {attribute: 'type', value: 'checkbox'}
                                        ],parent?parent:form);
                                    let newSpanForSwitch = new ElementWithAttributes('span',
                                            {attribute: 'class', value: 'slider round'}
                                        , parent?parent:form);
                                    let aboveButtonDiv = new ElementWithAttributes('div',[
                                            {attribute: 'class', value: 'aboveButton'},
                                            {attribute: 'id', value: Object.keys(element.switch[1])[0]}
                                        ],parent?parent:form);
                                    aboveButtonDiv.innerHTML = Object.values(element.switch[1])[0];
                                    let belowButtonDiv = new ElementWithAttributes('div',[
                                            {attribute: 'class', value: 'belowButton'},
                                            {attribute: 'id', value: Object.keys(element.switch[2])[0]}
                                        ],parent?parent:form);
                                    belowButtonDiv.innerHTML = Object.values(element.switch[2])[0];

                                    return [newCheckboxSwitch, newSpanForSwitch, aboveButtonDiv, belowButtonDiv];

                                    };                    
                                    
            
        if(typeof element === 'string'){
            newInputElement();
        }

        if(typeof element === 'object'){

            switch(Object.keys(element)[0]){
                case "switch": newSwitchElement(); 
                break;

                case "textarea": newInputElement(false, 'textarea'); 
                break;

                case "pac-input": newInputElement(true, false, {attribute: 'id',            value: 'pac-input'},
                                                               {attribute:'placholder',     value:'Ort angeben'},
                                                               {attribute: 'autocomplete',  value:'kabumska'},
                                                               {attribute: 'type',          value: 'pac-Input'}
                                                 );
                break;

                default : newInputElement(false);
                break;

            }

        }

        })

    }

export {inputCreator}