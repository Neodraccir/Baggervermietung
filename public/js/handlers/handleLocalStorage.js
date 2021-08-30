import { placeAndTimeRequest } from "/sc/handlers/placeAndTimeRequest.js";
import { enterpriseSwitchHandlerFunction } from "/sc/handlers/enterpriseSwitchHandler.js";
import { deliverySwitchHandlerFunction } from "/sc/handlers/deliverySwitchHandler.js";

var inputCollection = document.getElementsByTagName("input"),
  textAreas = document.getElementsByTagName("textArea"),
  isADateInput = (i) =>
    inputCollection[i] === inputCollection["dateRangeEnd"] ||
    inputCollection[i] === inputCollection["dateRangeStart"],
  isASwitch = (i) =>
    inputCollection[i].name === "inclDelivery" ||
    inputCollection[i].name === "isEnterprise",
  isExtraBucket = (i) => inputCollection[i].className === "extraBucket",
  storeInputDataFrom = function (collection) {
    for (let i = 0; i < collection.length; i++) {
      if (!isADateInput(i) && !isASwitch(i)) {
        collection[i].addEventListener("input", function () {
          for (let i = 0; i < collection.length; i++) {
            localStorage.setItem(collection[i].name, collection[i].value);
          }
        });
      }
      if (isExtraBucket(i)) {
        let name = inputCollection[i]?.name,
          storedValue = localStorage.getItem(name) == "true" ? true : false,
          bucket = document.querySelector(`.extraBucket[name='${name}']`);
        bucket.checked = storedValue;
        logThis(storedValue)
        if(storedValue){
          bucket.parentElement.classList.add("selected");
          bucket.parentElement.classList.remove("unselected");
          bucket.parentElement.querySelector("span").innerText += " (ausgewählt)";
        }
        bucket.parentElement.addEventListener("click", () => {
          window.localStorage.setItem(name, bucket.checked);
          let checkedExtraBuckets = 0;
          document.querySelectorAll(".extraBucket").forEach((bucket) => {
            if (bucket.checked) checkedExtraBuckets++;
          });
          window.localStorage.setItem("extraBuckets", checkedExtraBuckets);
        });
      }
      collection[i].value = localStorage.getItem(collection[i].name);
      collection[i].parentElement
    }
  },
  loadSwitchState = function (theSwitch, switchHandlerFunction) {
    let storedValueInverted =
      localStorage.getItem(theSwitch.name) == "true" ? false : true;
    theSwitch.checked = storedValueInverted;
    switchHandlerFunction();
  },
  handleLocalStorage = function () {
    storeInputDataFrom(inputCollection);
    storeInputDataFrom(textAreas);
    loadSwitchState(deliveryOn, deliverySwitchHandlerFunction);
    loadSwitchState(enterpriseOn, enterpriseSwitchHandlerFunction);

    if (localStorage.getItem("place") !== null) {
      placeAndTimeRequest();
    }
  };
dateRangeStart.value = localStorage.getItem("dateRangeStart");
dateRangeEnd.value = localStorage.getItem("dateRangeEnd");

handleLocalStorage.calendar = function () {
  localStorage.setItem("dateRangeStart", dateRangeStart.value);
  localStorage.setItem("dateRangeEnd", dateRangeEnd.value);
};

handleLocalStorage.storeSwitchState = function (theSwitch) {
  localStorage.setItem(theSwitch.name, theSwitch.checked);
};

export { handleLocalStorage };
