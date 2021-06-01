const   appRoot  = require('app-root-path'),
        dayNames = require(`${appRoot}/lib/converter/insertNameVariantsIntoArrays.js`);

module.exports = function convertWeekdayStringToNumber(weekdayString){

    let dayNumber = -1;

    [
    "sunday",
    "monday", 
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
    ].forEach(
        (element, index) => {

            if(dayNames[element].indexOf(weekdayString)>-1){

                console.log(`Convert weekday "${element}" into number "${index}"`);

                     dayNumber = index
            }
        }
    )



    return dayNumber     

} 