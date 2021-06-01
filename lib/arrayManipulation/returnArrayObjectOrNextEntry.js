module.exports = function returnArrayObjectOrNextEntry(num, arr, reverseSearch){


    let arrayObject,
        appRoot            = require('app-root-path'),
        findNextArrayEntry = require(`${appRoot}/lib/arrayManipulation/findNextArrayEntry.js`);

      

//checking if the array position already has an Entry otherwise searching through the array


    if(reverseSearch && num>arr.length){
      num = arr.length-1
    }

    if(arr?.[num]){

      arrayObject = arr?.[num];


    }else{

      arrayObject = findNextArrayEntry(num, arr, reverseSearch)
    }


    return arrayObject;

  }




