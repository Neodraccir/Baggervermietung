module.exports = (distance, amountOfDays)=>{

//dependencies and variables
    let appRoot                       = require('app-root-path'),
        returnArrayObjectOrNextEntry  = require(`${appRoot}/lib/arrayManipulation/returnArrayObjectOrNextEntry.js`),
        getGlobalStrings              = require(`${appRoot}/lib/global/getGlobalStrings.js`)(globalThis); //includes variable "rentalCost" & "deliveryCost"

   distance = Math.round(distance);

//functions
    function getDeliveryPriceFor(distance, timespan){
      
        console.log("#GDC: loading module -> getDeliveryCost.js")


              let priceObject    = determinePriceConditionsFor(distance),
                  discountObject = determineDiscountConditionsFor(priceObject, timespan);

              if(priceObject === distanceTooLarge){
                return distanceTooLarge
              }
 
                

                if(discountObject === noDiscountPossible){ 
                  console.log("#GDC: Deliverycost without discount: "+priceObject?.price);
                  console.log(priceObject);
                  return priceObject?.price;
                }

                if(discountObject?.price !== undefined){
                  console.log("#GDC: Deliverycost with discount: "+discountObject?.price);
                  console.log(discountObject);
                  return discountObject?.price;
              }

              console.log("#GDC: Deliverycost: "+priceObject?.price);
                return priceObject?.price;

            }



    function determinePriceConditionsFor(distance){
          let priceObejct = returnArrayObjectOrNextEntry(distance, deliveryPrizes);
          return priceObejct;
        }



    function determineDiscountConditionsFor(priceObject, timespan){

          if(!priceObject?.discounts){return noDiscountPossible};

          let discountObject = returnArrayObjectOrNextEntry(timespan, priceObject?.discounts, true);

          return discountObject;
        }
        

//executed code   

      return getDeliveryPriceFor(distance,amountOfDays);


}