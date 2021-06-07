import {createHead}   from '/sc/build/createHead.js';
import {createBody}   from '/sc/build/createBody.js';
import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';



const buildDOM = async function (window){

    let gMapsKey = await fetch('/getGMapsKey');

    window = globalThis;
    if(gMapsKey.ok){
        window.apiKey = await gMapsKey.json();
        window.apiKey = window.apiKey.api_key;

    }else{
        alert("HTTP-Errbor:"+gMapsKey.status);
    }
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