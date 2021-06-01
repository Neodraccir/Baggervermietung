module.exports = ()=>{

    let offsetHours         = Math.floor(new Date().getTimezoneOffset()/60),
        valueSign           = (value)=>(Number(value)>0)?"-":"+",
        absValue            = (value)=>Math.abs(value),
        getHours            = (fullHourValue)=>{
            let onlyHours = JSON.stringify(fullHourValue).split(".")[0];
            if(onlyHours.length === 1){
                onlyHours = "0"+onlyHours;
            }
            return onlyHours;
        },
        getMinutes          = (hours)=>{
            let partHour = JSON.stringify(hours).split(".")[1],
                result;
            if(!partHour){
                result = "00"
                }
            if(partHour?.length === 1){
                partHour = partHour+"0"
                result = Math.floor(0.6*Number(partHour))
                }
            if(result.length === 1){
                result = "0"+result;
                }
            if(result?.length > 2){
                result.slice(0,2)
                }
            return result;
            
        },
        getCorrectFormat    = (value)=>{
            absV = absValue(value);
            let h = getHours(absV),
                m = getMinutes(absV),
                correctFormat = `${valueSign(value)}${h}:${m}`;
            
            return correctFormat;
        }

return getCorrectFormat(offsetHours)
}