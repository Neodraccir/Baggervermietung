module.exports = function findNextArrayEntry(num, arr, reverseSearch){




    let appRoot           = require('app-root-path')
        oneLessThan       = (n)=>n-1,
        oneMoreThan       = (n)=>n+1,
        emptyEntry        = null || undefined,
        getGlobalStrings  = require(`${appRoot}/lib/global/getGlobalStrings.js`),
        startValue        = Number(oneMoreThan(num));
    
    getGlobalStrings(globalThis);


    if(reverseSearch === true){
      oneLessThan    = (n)=>n+1;
      oneMoreThan    = (n)=>n-1;
      startValue = Number(oneMoreThan(num))
    };

    if(startValue === arr.length-1){
      return arr?.[startValue]
    }


    //looping through the Array to find the next entry that is not undefined and returning it
    for (let index = startValue; arr?.[oneLessThan(index)] === null; reverseSearch? index-- : index++){



        if(arr?.[index] !== null){
          
          return arr[Number(index)] 
        };


        if(!reverseSearch && index>arr.length){
          return indexBiggerThanArrayLength;
        };


        if(reverseSearch && index<0){
          return indexUnderZero;
        };
      };


  };