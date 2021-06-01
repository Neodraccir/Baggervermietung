module.exports= (
    {
     firstName: firstName,
     lastName : lastName,
     phoneNr   : phoneNr,
     company   : company,
     place     : place
})=>{

    console.log("create vCard...")
    console.log(arguments[0])

    let vCard =`BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${firstName} ${lastName}
N;CHARSET=UTF-8:${lastName};${firstName};
UID;CHARSET=UTF-8:69531f4a-c34d-4a1e-8922-bd38a9476a53
TEL;TYPE=CELL:${phoneNr}
LABEL;CHARSET=UTF-8;TYPE=:Anfragensteller für Bagger
ADR;CHARSET=UTF-8;TYPE=WORK:${place}${company?`\nORG;CHARSET=UTF-8:${company}`:""}
REV:2019-01-04T20:18:50.127Z
END:VCARD`;

    return vCard

};