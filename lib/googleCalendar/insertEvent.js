const   appRoot     = require('app-root-path'),
        [calendarId,calendar,auth]
                    = require(`${appRoot}/lib/googleCalendar/calendarAuthArray.js`);
        


module.exports = async function(event){  

        try{
            let response = await calendar.events.insert({
                auth: auth,
                calendarId: calendarId,
                resource: event
            });
            if(response['status'] == 200 && response['statusText'] === 'OK'){
                return 1;
            }else{
                return 0
            }
        }catch(err){
            console.error(`Error at insertEvent() --> ${err}`)
        }

}