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
                    value:      'viewpoint'
                },
                {
                    attribute:  'content',
                    value:      'width=display-width, height=display-height,  initial-scale=1, maximum-scale=1, user-scalable=0'
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