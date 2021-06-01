const   appRoot     = require('app-root-path'),
        getEvents   = require(`${appRoot}/lib/googleCalendar/getEvents.js`);

module.exports = async function(){

    const eventArray = [];

    try{

    let today = new Date(),
        todayPlus370 = new Date();
    todayPlus370.setDate(todayPlus370.getDay()+378);
    let eventList       = await getEvents(today, todayPlus370),
        shortenDate     = (dateString)=>JSON.stringify(dateString).slice(1,11);
        
    eventList.forEach(element => {

        index = eventList.indexOf(element)
        let allDayEvent     = (startOrEnd)=>element?.[startOrEnd]?.date,
            partTimeEvent   = (startOrEnd)=>element?.[startOrEnd]?.dateTime;
        if(allDayEvent("start")){
            eventArray[index] = [allDayEvent("start"), allDayEvent("end")];
        };
        if(partTimeEvent("start")){
            let endDate = new Date(partTimeEvent("end"));
            endDate.setDate(endDate.getDate()+1)
            eventArray[index] = [shortenDate(partTimeEvent("start")), shortenDate(endDate)];

        };
    });
    return eventArray  

    }catch(err){
        console.error(err)
    }

}  
