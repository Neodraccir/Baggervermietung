import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';

function labelCreator (labelObject, parent){

    Object.keys(labelObject).forEach(label=>{



        let newLabel = new ElementWithAttributes('label',
                {attribute: 'for', value: label}
            ,parent);


        if(label.includes("switch")){
            newLabel.setAttribute('class', 'switch')
        }

        parent[label+"_label"] = newLabel
        })



    }

export {labelCreator}