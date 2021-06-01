const   appRoot     = require('app-root-path'),
        createEvent = require(`${appRoot}/lib/googleCalendar/eventConstructor.js`),
        dateString  = require(`${appRoot}/lib/googleCalendar/turnDateIntoGoogleFormat.js`),
        insertEvent = require(`${appRoot}/lib/googleCalendar/insertEvent.js`),
        getEvents   = require(`${appRoot}/lib/googleCalendar/getEvents.js`),
        eventString = (Event)=>JSON.stringify(Event);

module.exports =
 
    [
        createEvent,
        dateString,
        insertEvent,
        getEvents,
        eventString
    ]
