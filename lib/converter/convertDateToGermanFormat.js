module.exports = (date)=>{

    let year            = date.slice(0,4),
        month           = date.slice(5,7),
        day             = date.slice(8,10),
        germanFormat    = `${day}.${month}.${year}`;

    return germanFormat;

};