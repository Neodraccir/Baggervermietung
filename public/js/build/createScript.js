import { checkForUserID } from "/sc/generalFunctions/checkForUserID.js";
import { checkNoPlaceFoundError } from "/sc/handlers/checkNoPlaceFoundError.js";
import { handlePlaces } from "/sc/handlers/handlePlaces.js";
import { handleCalendar } from "/sc/handlers/handleCalendar.js";
import { handleDelivery } from "/sc/handlers/handleDelivery.js";
import { initMap } from "/sc/dependencies/placeAutocomplete.js";
import { handleSwitches } from "/sc/handlers/handleSwitches.js";
import { handleLocalStorage } from "/sc/handlers/handleLocalStorage.js";
import { handleCheckboxes } from "/sc/handlers/handleCheckboxes.js";
import { loadGlobalVariables } from "/sc/build/loadGlobalVariables.js";
import { checkForForbiddenDates } from "/sc/handlers/checkForForbiddenDates.js";

var createScript = function (window) {
  checkForUserID();

  window = arguments[0];
  globalThis = window;
  loadGlobalVariables();
  handlePlaces(window);
  handleCalendar(window);
  handleDelivery(window);
  handleSwitches();
  button.addEventListener("mouseover" && "click", (event) => {
    checkNoPlaceFoundError();
  });
  initMap(window);
  handleLocalStorage(window);
  handleCheckboxes();
  checkForForbiddenDates(rangepickerObject);
};

export { createScript };
