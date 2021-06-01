module.exports = (globalVar)=>{

    let appRoot             = require('app-root-path'),
        golbalStrings       = require(`${appRoot}/lib/global/globalStrings.json`),
        deliveryPrizes      = require(`${appRoot}/lib/global/prizesListUpdated.json`).deliveryPrizes,
        rentalPrizes        = require(`${appRoot}/lib/global/prizesListUpdated.json`).rentalPrizes;


    Object.assign(globalVar, golbalStrings);
    globalVar.deliveryPrizes = deliveryPrizes;
    globalVar.rentalPrizes   = rentalPrizes;
}