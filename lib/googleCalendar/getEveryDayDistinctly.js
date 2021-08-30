module.exports =  function(dateRanges){

    let distinctDaysArray = [];
    dateRanges.forEach((dateRange)=>{
        let start = new Date(dateRange[0]),
        end = new Date(dateRange[1]),
        amountOfDays = ((end.getTime()-start.getTime())/86400000)+1,
        daysProcessed = 0;

        while(daysProcessed < amountOfDays){
            let processedDay = new Date(JSON.stringify(start).slice(1, 11));
            processedDay.setDate(start.getDate() + daysProcessed);
            distinctDaysArray.push(JSON.stringify(processedDay).slice(1, 11))
            daysProcessed++
        }

    });

    return distinctDaysArray

}