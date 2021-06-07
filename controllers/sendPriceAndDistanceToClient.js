module.exports =(app)=>{

    const   appRoot         = require('app-root-path'),
            convertDate     = require(`${appRoot}/lib/converter/convertDateToGermanFormat.js`),
            fsp             = require(`fs`).promises,
            writeTMPrequest = async function(userID, requestData){
                try{
                    await fsp.writeFile(`${appRoot}/db//tmp/${userID}.json`, requestData, {flags: 'w'});
                    console.log(`writing >> ${requestData}`)
                    console.log(`#SPADTC: ${userID}.json was sucessfully created in: "{root}/db/tmp/"`);
                }
                catch(err){
                    console.log(err)
                }
            };

    app.post('/placeReq', (req, res)=>{

        console.log(`#SPADTC: Recieved POST request "/placeReq"`)
        console.log(`#SPADTC: module -> sendPriceAndDistanceToCLient.js`)


    
     
        let mapsAPIDATA     = require(`${appRoot}/config/mapsAPIData.json`),
            origin          = mapsAPIDATA.origin,
            api_key         = mapsAPIDATA.api_key2,

            firstName       = req.body.firstName,
            lastName        = req.body.lastName,

            placeReq        = req.body.place,
            dateStart       = req.body.dateStart,
            dateEnd         = req.body.dateEnd,
            inclDelivery    = req.body.isInclDelivery, 
            isBusiness      = req.body.isEnterprise,
            company         = req.body.company,
            place           = req.body.place,
            msg             = req.body.msg,
            phoneNr         = req.body.phoneNr,

            user_id         = req.body.user_id,
            order_id        = req.body.order_id,

            distanceCalc = require(`${appRoot}/lib/distanceCalc.js`),
            priceCalc    = require(`${appRoot}/lib/prizesHandler/priceCalc.js`),
            amountOfDays = require(`${appRoot}/lib/prizesHandler/getAmountOfDays.js`)(dateStart, dateEnd);
  
        distanceCalc(origin,placeReq,api_key)
        .then((dist)=>{


    
            let distance = Math.round(dist?.[0]/1000)
                prize    = priceCalc({
                                distance: distance,
                                dateStart: dateStart,
                                dateEnd: dateEnd,
                                inclDelivery: inclDelivery,
                                isBusiness: isBusiness
                }),
                travelTime = dist[1],
                getGlobalStrings = require(`${appRoot}/lib/global/getGlobalStrings.js`)(globalThis), //includes variable "rentalCost" & "deliveryCost"
                maxDistance = Math.floor(deliveryPrizes.length-1);
            
            if(distance>maxDistance){inclDelivery = false};
            if(isNaN(prize.deliveryCost)){prize.fullCost = prize.rentalCost};

            let response    = `{"dist":"${distance}","fullCost":"${prize.fullCost}","deliveryCost":"${prize.deliveryCost}","rentalCost":"${prize.rentalCost}", "maxDistance":"${maxDistance}", "isInclDelivery":"${inclDelivery}", "isEnterprise":"${isBusiness}","company":"${company}","user_id":"${user_id}","order_id":"${order_id}", "amountOfDays":"${amountOfDays}", "dateStart":"${convertDate(dateStart)}", "dateEnd":"${convertDate(dateEnd)}", "travelTime":"${travelTime}", "place":"${place}", "msg":"${msg}", "phoneNr":"${phoneNr}" }`,
                tmpRequest  = `{"order_id":"${order_id}","user_id":"${user_id}","lastName":"${lastName}","firstName":"${firstName}","distance":"${distance}","fullCost":"${prize.fullCost}","deliveryCost":"${prize.deliveryCost}","rentalCost":"${prize.rentalCost}", "maxDistance":"${maxDistance}", "isInclDelivery":"${inclDelivery}", "isEnterprise":"${isBusiness}","company":"${company}", "amountOfDays":"${amountOfDays}", "dateStart":"${convertDate(dateStart)}", "dateEnd":"${convertDate(dateEnd)}", "travelTime":"${travelTime}","place":"${place}", "msg":"${msg}", "phoneNr":"${phoneNr}" }`;
            writeTMPrequest(user_id, tmpRequest);
            console.log(`#SPADTC: Traveltime: ${travelTime}`);
            console.log(`#SPADTC: sending >>> ${response}`);
            res.send(response);
            console.log("#SPADTC: sent data to client");
        }) 
        .catch((e)=>{
            console.log(e);
        }) 

        
    });

}
  