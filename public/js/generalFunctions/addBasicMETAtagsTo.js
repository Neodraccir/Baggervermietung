import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';

function addBasicMETAtagsTo(head){

    const   addMetaToHead     = function(arrayOrObject){new ElementWithAttributes('META', arrayOrObject, head)},
            charset           = addMetaToHead(
                {
                    attribute:  'charset',
                    value:      'UTF-8'
                }),
            viewpoint         = addMetaToHead([
                {
                    attribute:  'name',
                    value:      'viewport'
                },
                {
                    attribute:  'content',
                    value:      'width=device-width, height=device-height,  initial-scale=0.5, maximum-scale=0, user-scalable=no'
                },
                ]),
            httpEquiv         = addMetaToHead([
                {
                    attribute:  'http-equiv',
                    value:      'X-UA-Compatible'
                },
                {
                    attribute:  'content',
                    value:      'ied=edge'
                }
                ])

}


export{addBasicMETAtagsTo}