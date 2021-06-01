let appRoot = require('app-root-path'),
    prizesList = require(`${appRoot}/config/prizesList.json`);



function findElementsWithIndexUnequalToSubproperty(array, subpropertyString){


    let element = array?.find(e=>e?.[subpropertyString] !== array?.indexOf(e) && e !== undefined)
     return element
 
 }

function putAllElementsAtPositionEqualToSubproperty(array, subpropertyString){

    let reorderedArray = [];
        element = findElementsWithIndexUnequalToSubproperty(array, subpropertyString);
        index   = array?.indexOf(element);
    
  

     while(element  !== undefined){

            reorderedArray[element?.[subpropertyString]] = element;
            array[array?.indexOf(element)] = undefined;

            //refresh the element and the index
            element = findElementsWithIndexUnequalToSubproperty(array, subpropertyString);
            index   = reorderedArray.indexOf(element);
    }

    return reorderedArray

} 


function reorderDeliveryDiscountsList(discountList){

    let reorderedDiscountsList = reorderedDiscountsList = putAllElementsAtPositionEqualToSubproperty(discountList, "minDays");


    return reorderedDiscountsList

}


module.exports = {

    getDeliveryPrizesList : function(){

        let reorderedDeliverPrizesList = prizesList?.deliveryPrizes;

        for(i=0; i<reorderedDeliverPrizesList.length; i++){

            if(reorderedDeliverPrizesList?.[i]?.discounts){
                reorderedDeliverPrizesList[i].discounts = putAllElementsAtPositionEqualToSubproperty(reorderedDeliverPrizesList[i].discounts, "minDays")
            };
        };


        reorderedDeliverPrizesList = putAllElementsAtPositionEqualToSubproperty(prizesList?.deliveryPrizes, "max_km")
  
        return reorderedDeliverPrizesList

    },


    getRentalPrizesList : function(){

        let reorderedRentalPrizesList = putAllElementsAtPositionEqualToSubproperty(prizesList?.rentalPrizes, "minDays");

        return reorderedRentalPrizesList;

    }

}