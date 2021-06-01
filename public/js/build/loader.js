import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';
import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js'

function createLoader(window){
  
    var globalThis = window,
        body       = document.body,
        loader = addGlobalVar({
            loader: new ElementWithAttributes('div', [
                        {attribute: 'id', value: 'loader'},
                        {attribute: 'class', value: 'loader'},
                        {attribute: 'style', value:    `position:absolute;
                                                        top: 1vh;
                                                        left: 1vh; 
                                                        visibility:visible;
                                                        `
                                                        },
                    ],body)
    }),

    innerOne = new ElementWithAttributes('div', 
        {attribute: 'class', value: 'inner one'},
        loader),

    innerTwo = new ElementWithAttributes('div', 
        {attribute: 'class', value: 'inner two'},
        loader),

    three = new ElementWithAttributes('div', 
        {attribute: 'class', value: 'inner three'},
        loader);



}

export {createLoader}