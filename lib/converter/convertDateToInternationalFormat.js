module.exports = (date)=>{

    let year                = date.slice(6,10),
        month               = date.slice(3,5),
        day                 = date.slice(0,2),
        internationalFormat = `${year}-${month}-${day}`;

    return internationalFormat;

};