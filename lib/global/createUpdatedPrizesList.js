module.exports = ()=>{

    const  fsp               = require('fs').promises;
    var    appRoot           = require('app-root-path'),
           reorderPrizesList = require(`${appRoot}/lib/global/reorderPrizesList.js`),
           updatedPrizesList = {};
    
    updatedPrizesList.deliveryPrizes = reorderPrizesList.getDeliveryPrizesList();
    updatedPrizesList.rentalPrizes   = reorderPrizesList.getRentalPrizesList();


    fsp.writeFile(`${appRoot}/lib/global/prizesListUpdated.json`, JSON.stringify(updatedPrizesList))
     .then(console.log("Updated Prizes List succesfully"))
     .catch((err)=>{if (err) throw err;})


}