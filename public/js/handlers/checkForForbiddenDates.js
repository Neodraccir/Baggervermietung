import { changeDateFormatInto } from "/sc/generalFunctions/changeDateFormatInto.js";

function checkForForbiddenDates(rangepicker) {
  let hasForbiddenDate = false, 
    lockedDates = lockedDatesArray,
    [start, end] = rangepicker.getDates();

    //turn the dates Into Objects
    lockedDates = (()=>{
        let lockedDatesAsObjects = [];
        lockedDates.forEach((date)=>{
            lockedDatesAsObjects.push(changeDateFormatInto.object(date))
        })
        return lockedDatesAsObjects
    })()
    start = changeDateFormatInto.object(start.toDateString());
    end = changeDateFormatInto.object(end.toDateString());

    //check if forbidden dates fall between start and end date
    lockedDates.forEach((lockedDate)=>{
        if(lockedDate.year > start.year && lockedDate.year < end.year){
            hasForbiddenDate = true;
        }
        if(lockedDate.year >= start.year){
            if(lockedDate.year <= end.year){
                if(lockedDate.month >= start.month){
                    if(lockedDate.month <= end.month){
                        if(lockedDate.month > start.month && lockedDate.month < end.month){
                            hasForbiddenDate = true;
                        }
                        if(lockedDate.month >= start.month && lockedDate.month < end.month){
                            if(lockedDate.day > start.day){
                                hasForbiddenDate = true;
                            }
                        }
                        if(lockedDate.day > start.day){
                            if(lockedDate.day < end.day){
                                hasForbiddenDate = true;
                            }
                        }
                    }
                }
            }
        }
    })
    if(hasForbiddenDate){
      rangepicker.setDates({clear:true},{clear:true})
    }
}

export { checkForForbiddenDates };
