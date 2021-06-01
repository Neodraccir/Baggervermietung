const appRoot = require('app-root-path');

module.exports = (app)=>{
    app.get('/getLockedDates', async function(req,res){
        try{
            const   getDates    = require(`${appRoot}/lib/googleCalendar/listEventsFor370Days.js`),
                    lockedDates = await getDates(),
                    shortenSecondDate = (lockedDates)=>{
                        lockedDates.forEach(element => {
                            let secondDate = new Date(element[1]);
                            secondDate.setDate(secondDate.getDate()-1);
                            let revisedDate = JSON.stringify(secondDate).slice(1,11)
                            element[1] = revisedDate;
                        });
                    };
            shortenSecondDate(lockedDates);
            res.json(lockedDates)
        }catch(err){
            console.error(err)
        }

    })
} 

