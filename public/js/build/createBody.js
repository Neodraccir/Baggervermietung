import {ElementWithAttributes} from '/sc/generalFunctions/ElementWithAttributesConstructor.js';
import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {buildForm} from '/sc/build/buildForm.js';
import {importScriptIntoTag} from '/sc/generalFunctions/importScriptIntoTag.js';
import {addScriptTag} from '/sc/generalFunctions/addScriptTag.js';
import {placeAutocompleteBody} from '/sc/build/placeAutocompleteBody.js';
import {createLoader} from '/sc/build/loader.js'




function createBody(window){

    globalThis = window;

    /* event that determines if page loaded */
    let makeMainVisible = function(){
        document.getElementsByTagName("main")[0].style.visibility = "visible";
        document.getElementById("loader").style.visibility = "hidden";

    };
    document.addEventListener("loadedForm", makeMainVisible);
    document.loadedForm = new CustomEvent("loadedForm", {loaded:true});


    var body        = addGlobalVar({body:      document.body}), 
        loader      = createLoader(),
        main        = addGlobalVar({main:      document.createElement('main')}),
        header      = addGlobalVar({header:    document.createElement('header')}),
        headline1   = addGlobalVar({headline1: document.createElement('h1')}),
        headline2   = addGlobalVar({headline2: document.createElement('h2')});


    body.append(header);
    header.append(headline1);
    header.append(headline2);
    headline1.innerHTML = 'Bagger mimieten';
    headline2.innerHTML = 'Bitte füllen Sie vor dem Anruf kurz das Formular aus';
    body.append(main);
    main.style.visibility = "hidden";
    document.getElementById("loader").style.visibility = "visible";
    buildForm(main);
    placeAutocompleteBody(main);
    var scriptModule =       addScriptTag.module(true, body);
    scriptModule.innerHTML = importScriptIntoTag('createScript', {arg: 'window'}); 



    
};
 
export {createBody};  
  