//basic dependencies
const   express             = require('express'),
        app                 = express(),
        port                = process.env.port || 1111,
        fs                  = require('fs'),
//        {google}            = require('googleapis'),
//        calendar            = google.calendar('v3'),
//      getGlobalStrings    = require(`${__dirname}/lib/global/getGlobalStrings.js`)(globalThis); //includes variable "rentalCost" & "deliveryCost"


//load controllers
        requireController            = controller => require(`${__dirname}/controllers/${controller}.js`),
        setServerUp                  = requireController('setServerUp'),
        setPublicDirectories         = requireController('setPublicDirectories'),
        sendPriceAndDistanceToClient = requireController('sendPriceAndDistanceToClient'),
        getIndexPage                 = requireController('getIndexPage'),
        notifyOwnerAndRenderSentPage = requireController('notifyOwnerAndRenderSentPage'),
        requestTMPOrder              = requireController('requestTMPOrder'), 
        getLockedDates               = requireController('getLockedDates'),
        getGMapsKey                  = requireController('getGMapsKey'),
 
//update prizesList
        createUpdatedPrizesList      = require(`${__dirname}/lib/global/createUpdatedPrizesList.js`),
        trashCollector               = require(`${__dirname}/lib/trashCollector.js`);

createUpdatedPrizesList();

//execute controllers
setServerUp(app); 
setPublicDirectories(app);
getIndexPage(app);
sendPriceAndDistanceToClient(app);  
notifyOwnerAndRenderSentPage(app); 
requestTMPOrder(app);
getLockedDates(app);
getGMapsKey(app);
trashCollector(); 

  

   
app.listen(port);   
  
 