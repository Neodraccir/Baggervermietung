import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';

var     addScriptTag         ={};

addScriptTag.module = function(defer = false, parent){return new ElementWithAttributes('script',[
    {
        attribute: 'type',
        value:     'module'
    },
    {
        attribute: 'defer',
        value:      defer?true:false
    }
    ],parent)};


addScriptTag.src = function(src, defer, parent){new ElementWithAttributes('script',[
    {
        attribute: 'src',
        value:     src
    },
    {
        attribute: 'defer',
        value:      defer?true:false
    }
    ],parent)};
          


export {addScriptTag}