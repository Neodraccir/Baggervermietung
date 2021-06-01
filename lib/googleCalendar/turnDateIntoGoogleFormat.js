const   appRoot             = require('app-root-path'),          
        timeoffset          = (require(`${appRoot}/lib/googleCalendar/getTimeoffset.js`))(),
        startTimeString     = `:00.000${timeoffset}`,
        endTimeString       = `:59.999${timeoffset}`,
        dayTimeStringStart  = (dateString, timeString)=>`${dateString?.slice(0,10)}T${timeString+startTimeString}`,
        dayTimeStringEnd    = (dateString, timeString)=> `${dateString?.slice(0,10)}T${timeString+endTimeString}`,
        dayStartString      = (dateString)=>`${dateString?.slice(0,10)}T00:00${startTimeString}`,
        dayEndString        = (dateString)=>`${dateString?.slice(0,10)}T23:59${endTimeString}`,
        dateString          = function(dateString, timeString, isEnd){
            switch (arguments.length){
                case 0:
                    return "";
                break;

                case 1:
                    return dayStartString(dateString);
                break;

                case 2:
                    if(timeString !== "isEnd"){
                        return dayTimeStringStart(dateString, timeString);
                    };
                    if(timeString === "isEnd"){
                        return dayEndString(dateString)
                    };
                break;

                case 3:
                    return dayTimeStringEnd(dateString, timeString);
                break;
            };
        };

module.exports = dateString;
