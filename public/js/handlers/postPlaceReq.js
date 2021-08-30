import { addGlobalVar } from "/sc/generalFunctions/addGlobalVar.js";
import { postDataToServer } from "/sc/handlers/postDataToServer.js";
import { changeDateFormatInto } from "/sc/generalFunctions/changeDateFormatInto.js";

function postPlaceReq(xhr) {
  var placeData = addGlobalVar({
    placeData: `{
            "firstName"         : "${firstName.value}",
            "lastName"          : "${lastName.value}",
            "dateStart"         : "${changeDateFormatInto.universal(
              dateRangeStart.value
            )}",
            "dateEnd"           : "${changeDateFormatInto.universal(
              dateRangeEnd.value
            )}",
            "place"             : "${localStorage.getItem("place")}",
            "isInclDelivery"    : "${deliveryOn.checked}",
            "isEnterprise"      : "${enterpriseOn.checked}",
            "company"           : "${localStorage.getItem("company") || "No"}",
            "user_id"           : "${localStorage.user_id}",
            "order_id"          : "${localStorage.order_id}",
            "place"             : "${localStorage.getItem("place")}",
            "msg"               : "${localStorage.getItem("msg")}",
            "phoneNr"           : "${localStorage.getItem("phoneNr")}",
            "extraBuckets"     : "${localStorage.getItem("extraBuckets")}"
            }`,
  });
  logThis("requested Place: " + JSON.parse(placeData).place);

  postDataToServer(xhr, "/placeReq", placeData);
}

export { postPlaceReq };
