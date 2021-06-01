module.exports = (startDate, endDate)=>{


    function checkAndCorrectSummerTime(date){
        if(date.toString().endsWith("GMT+0200 (Central European Summer Time)")){
            let splitDate = date.toString().split(" "),
                newDate;
            splitDate[5]  = "GMT+0100 (Central European Standard Time)";
            newDate       = splitDate.join(" ");
            return new Date(newDate);
        }

        return date;
    }

    startDate = checkAndCorrectSummerTime(new Date(startDate));
    endDate   = checkAndCorrectSummerTime(new Date(endDate));




    let startDays = startDate/(1000 * 3600 * 24),
        endDays   = endDate/(1000 * 3600 * 24),
        amountOfDays = Math.floor(endDays-startDays+1);

  
    return amountOfDays;
    
}