module.exports =({
        firstName       : firstName,
        lastName        : lastName,
        isEnterprise    : isEnterprise,
        isInclDelivery  : isInclDelivery,
        company         : company,
        dateStart       : dateStart,
        dateEnd         : dateEnd,
        place           : place,
        distance        : distance,
        travelTime      : travelTime,
        fullCost        : fullCost,
        deliveryCost    : deliveryCost,
        rentalCost      : rentalCost,
        phoneNr         : phoneNr,
        msg             : msg
    }) =>{
 
   let botMessage = `
                <u>${firstName} ${lastName} will den Bagger</u>
                ${(isEnterprise == "on")?`\n<i>(Firma: ${company})</i>`:""}
                \nvom<b> ${dateStart}</b>\n\nbis zum<b> ${dateEnd}</b>\n
                \n<b>Transfer:</b> ${(isInclDelivery == "true")?"Lieferung":"Selbstabholung"}
                \n<b>Baustelle:</b> <code>${place}</code>
                \n<b>Kalkulierte Distanz:</b> ${distance} (ca: ${travelTime})
                \n<b>Preis:</b> ${fullCost}€
                \n<b>Lieferkosten:</b> ${deliveryCost}€
                \n<b>Mietkosten:</b> ${rentalCost}€
                \n<b>Telefonnummer:</b> ${phoneNr}
                ${(msg != "")?`\n\nUnd schreibt dazu folgendes:\n <i>${msg}</i>`:""}
                \n\n
<b>Möchtest du den Termin in den Kalendar eintragen?</b>
                `; 

    return botMessage
 
}; 

