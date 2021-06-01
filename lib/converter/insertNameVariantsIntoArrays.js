var listsOfDayNames = {
    sunday     :[],
    monday     :[],
    tuesday    :[],
    wednesday  :[],
    thursday   :[],
    friday     :[],
    saturday   :[]
}



function insertNameVariantsIntoArrays([dayObjectName, alternative]){
        
    for (e=0; e<arguments.length; e++){


            for (i=0; i < arguments[e].length; i++){


                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].charAt(0).toUpperCase()+arguments[e][i].slice(1));
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].toUpperCase());
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].toLowerCase());
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].charAt(0).toUpperCase()+arguments[e][i].slice(1,4));
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].slice(0,4).toLowerCase());
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].slice(0,4).toUpperCase());
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].charAt(0).toUpperCase()+arguments[e][i].slice(1,3));
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].slice(0,3).toLowerCase());
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].slice(0,3).toUpperCase());
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].charAt(0).toUpperCase()+arguments[e][i].slice(1,2));
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].slice(0,2).toLowerCase());
                    listsOfDayNames[arguments[e][0]].push(arguments[e][i].slice(0,2).toUpperCase());

            }
    }

}



insertNameVariantsIntoArrays(
    ["sunday", "Sonntag"],
    ["monday", "Montag"],
    ["tuesday", "Dienstag"],
    ["wednesday", "Mittwoch"],
    ["thursday", "Donnerstag"],
    ["friday", "Freitag"],
    ["saturday", "Samstag"]
    );

module.exports = listsOfDayNames; 