import {addGlobalVar} from '/sc/generalFunctions/addGlobalVar.js';
import {postDataToServer} from '/sc/handlers/postDataToServer.js';

function postPlaceReq(xhr){

    var placeData = addGlobalVar({placeData : `{
            "firstName"         : "${firstName.value}",
            "lastName"          : "${lastName.value}",
            "place"             : "${localStorage.getItem("place")}",
            "dateStart"         : "${dateRangeStart.value}",
            "dateEnd"           : "${dateRangeEnd.value}",
            "isInclDelivery"    : "${deliveryOn.checked}",
            "isEnterprise"      : "${enterpriseOn.checked}",
            "company"           : "${localStorage.getItem("company")||"No"}",
            "user_id"           : "${localStorage.user_id}",
            "order_id"          : "${localStorage.order_id}",
            "place"             : "${localStorage.getItem("place")}",
            "msg"               : "${localStorage.getItem("ms")}",
            "phoneNr"           : "${localStorage.getItem("phoneNr")}"
            }`});
    logThis('requested Place: '+JSON.parse(placeData).place);

    postDataToServer(xhr, '/placeReq', placeData)

}

export {postPlaceReq}