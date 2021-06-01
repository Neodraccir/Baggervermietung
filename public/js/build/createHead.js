import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';
import {addBasicMETAtagsTo} from '/sc/generalFunctions/addBasicMETAtagsTo.js';
import {addScriptTag} from '/sc/generalFunctions/addScriptTag.js';


const createHead = (window)=>{

    globalThis = window;
    
    var     head              = document.head,
            addStylesheet     = function(styleSheetPath){new ElementWithAttributes('link',[{attribute: 'rel', value: 'stylesheet'},{attribute: 'href', value: styleSheetPath}], head)},
            addStylesheets    = function(...paths){paths.forEach(element => {addStylesheet(element)});},
            title             = (()=>{let title = document.createElement('title'); document.head.append(title); title.innerHTML = 'Bagger mieten'})(),
    
            loadStylesheets   = addStylesheets('/s/style.css'),
            loadMapsAPI       = addScriptTag.src('https://maps.googleapis.com/maps/api/js?key=AIzaSyBRu3jjN3YU3QlrL00bdpzjs5av5oCOUxc&callback=initMap&libraries=places&v=weekly', true, head);


    addBasicMETAtagsTo(head);

}
    
export {createHead}

