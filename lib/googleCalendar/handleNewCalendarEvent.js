const { resolve } = require('app-root-path');

const   appRoot = require('app-root-path'),
        [createEvent, dateString, insertEvent, getEvents, eventString]
            = require(`${appRoot}/lib/googleCalendar/calendarMethods.js`),
        createEventIfNotYetTaken = require(`${appRoot}/lib/googleCalendar/createEventIfNotYetTaken.js`);

module.exports = async function(summary, description, start, end){
 
    try{
        let endDate = new Date(end);
        endDate.setDate(endDate.getDate()+1);
        end = JSON.stringify(endDate).slice(1,11);
        let eventObject = createEvent(summary, start, end, description);
        return createEventIfNotYetTaken(start, end, eventObject);

    }catch(err){
        console.error(err)
    }


}
 
  
