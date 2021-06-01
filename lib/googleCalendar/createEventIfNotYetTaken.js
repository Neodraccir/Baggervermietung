const   appRoot = require('app-root-path'),
        [createEvent, dateString, insertEvent, getEvents, eventString]
                = require(`${appRoot}/lib/googleCalendar/calendarMethods.js`);

module.exports  = async function (start, end, event){
    
    const insertEventIfDateNotTaken = (eventList)=>{
        return new Promise((resolve, reject)=>{

            if(eventList.length === 0){
                insertEvent(eventString(event))
                console.log(`Created "${event.summary}"`);
                resolve("Success")
            };
    
            if(eventList.length > 0){
                console.log(`Date Conflict: There exists already an Event at the chosen date.`)
                resolve("Date already exists!")
            };   
    

        })
    }

    try{

        let eventList = await getEvents(dateString(start), dateString(end));

        console.log(dateString(start))
        console.log(dateString(end))

        let eventCreation = await insertEventIfDateNotTaken(eventList);
        console.log(eventCreation)
        return eventCreation
 

    }catch(err){
        console.error(err)
    }


}