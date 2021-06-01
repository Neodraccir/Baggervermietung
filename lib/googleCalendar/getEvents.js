const   appRoot     = require('app-root-path'),
        [calendarId,calendar,auth]
                    = require(`${appRoot}/lib/googleCalendar/calendarAuthArray.js`);

module.exports = async function(dateTimeStart, dateTimeEnd){

    try{
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: "Europe/Berlin"
            }),
            items = response['data']['items'];

        return items
    }catch(err){
        console.error(`Error at getEvents() --> ${err}`)
        return 0;
    }

}