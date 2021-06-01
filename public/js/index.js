import {createHead}   from '/sc/build/createHead.js';
import {createBody}   from '/sc/build/createBody.js';
import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';



const buildDOM = function (window){

    window = globalThis;
    window.logThis = (text)=>{
        if(localStorage.getItem("console.log") === "true"){
            console.log(text)
        };
    };

    addGlobalVar({logThis : logThis})
    createHead  (window);
    createBody  (window);

    setTimeout(()=>{document.getElementById(`pac-input`).autocomplete = `nonsense`},1000)

}
export {buildDOM}