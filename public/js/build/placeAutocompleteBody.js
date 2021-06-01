import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';

async function placeAutocompleteBody(parent){

    try{

        var pacCard = new ElementWithAttributes('div', [
                {attribute: 'class', value: 'pac-card'},
                {attribute: 'id', value: 'pac-card'}
            ], parent),

            typeSelector = new ElementWithAttributes('div',[
                {attribute: 'id', value: 'type-selector'},
                {attribute: 'class', value: 'pac-controls'}
            ],pacCard),

            strictBoundsSelector = new ElementWithAttributes('div',[
                {attribute: 'id', value: 'strict-bounds-selector'},
                {attribute: 'class', value: 'pac-controls'}
            ],pacCard),

            mapDiv = new ElementWithAttributes('div',
                {attribute: 'id', value: 'map'}
                ,parent)

    }catch(err){
        logThis(err)
    }

}

export {placeAutocompleteBody}