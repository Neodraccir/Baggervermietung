module.exports = (from, to, api_key)=>{

console.log('#DC: module called: Distance Calculator')

var querystring = require('querystring')

from = querystring.stringify({query:from});
to   = querystring.stringify({query:to});


var request     = require('request');
var url         = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${from}&destinations=${to}&key=${api_key}`;

console.log(`#DC: Defining Origin: ${from}`)
console.log(`#DC: Defining Destination: ${to}`)
console.log(`#DC: Asking for Route from: ${url}`)

function requestRoute(){ 

    console.log('#DC: Using "requestRoute()"')
    
    return new Promise((resolve, reject)=>{
    
        request({
        url: url,
        json: true
        },
        function(error, response, body){
        
        if (!error && response.statusCode === 200 || response.statusCode === 400){
            if(body.error_message){
                console.log('#DC: Request Error: '+body.error_message)
            };
            resolve(body);
        }else{
        console.log(`#DC: response.statusCode: ${response.statusCode}`)
        console.log('#DC: "request()" --> Promise not resolved')
        }}) 

    })

}

async function getDistance(){

   let theRoute = await requestRoute();



    console.log(theRoute);

    if(!theRoute.error_message && await theRoute.rows[0].elements[0].distance){
        let theDistance = await theRoute.rows[0].elements[0].distance.value;
        let theTime     = await theRoute.rows[0].elements[0].duration.text;
        console.log('#DC: theDistance = '+theDistance);
        console.log('#DC: module ends');
        return [await theDistance, await theTime];

    }else if(await theRoute.rows[0].elements[0].status !== "OK"){
 
        console.log('#DC: Place not found!');
        console.log('#DC: status '+theRoute.rows[0].elements[0].status);
        return '?'

    }else{
        console.log(`#DC: ${theRoute.error_message}`);
        console.log('#DC: module ends');
        return theRoute.error_message;

    }
} 

return getDistance();


};




 