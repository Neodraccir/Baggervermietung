import Datepicker from "/datePicker/Datepicker.js";
import DateRangePicker from "/datePicker/DateRangePicker.js";
import de from "/datePicker/i18n/locales/de.js";
import { addGlobalVar } from "/sc/generalFunctions/addGlobalVar.js";
import { changeDateFormatInto } from "/sc/generalFunctions/changeDateFormatInto.js";
import { placeAndTimeRequest } from "/sc/handlers/placeAndTimeRequest.js";
import { handleLocalStorage } from "/sc/handlers/handleLocalStorage.js";
import { checkForForbiddenDates } from "/sc/handlers/checkForForbiddenDates.js";

function handleCalendar(window) {
  let today = new Date().toISOString().slice(0, 10),
    startObject = document.querySelector("#dateRangeStart"),
    endObject = document.querySelector("#dateRangeEnd"),
    dateRangeStart = startObject.value,
    dateRangeEnd = endObject.value,
    dateRange = [startObject, endObject];
  startObject.addEventListener("keypress", (e) => {
    e.preventDefault();
  });
  endObject.addEventListener("keypress", (e) => {
    e.preventDefault();
  });

  startObject.autocomplete = "qewdfce";
  startObject.readOnly = true;
  endObject.autocomplete = "jfvnerpiuv";
  endObject.readOnly = true;

  dateRangeStart = today;
  dateRangeEnd = today;
  Object.assign(Datepicker.locales, de);
  const rangepicker = new DateRangePicker(document.querySelector("#form"), {
    language: "de",
    disableTouchKeyboard: true,
    allowOneSidedRange: false,
    fomrat: "dd.mm.yyyy",
    inputs: [
      document.querySelector("#dateRangeStart"),
      document.querySelector("#dateRangeEnd"),
    ],
  });
  addGlobalVar({ lockedDatesArray: [] });

  var setLockedDates = addGlobalVar({
    setLockedDates: async () => {
      try {
        const lockedDates = await fetch("/getLockedDates"),
          data = await lockedDates.json(),
          lockedArray = [];
          console.log("locked...")
          console.log(data);
        data?.forEach((date) => {
          lockedArray.push(changeDateFormatInto.german(date));
        });

        rangepicker.setOptions({
          datesDisabled: lockedArray,
          minDate: changeDateFormatInto.german(today),
        });
        logThis("Locked Dates:");
        logThis(lockedArray);
        lockedDatesArray = lockedArray;
      } catch (err) {
        console.log(err);
      }
    },
  });

  setLockedDates();

  dateRange.forEach((input) =>
    input.addEventListener("changeDate", (e) => {
      handleLocalStorage.calendar();
      placeAndTimeRequest();
      console.log("++++++++++++++++++++++++++++++++++++++++++")
      checkForForbiddenDates(rangepicker);
    })
  );

  //handle closing of calender, when clicking outisde
  //the pure original did not handle this always rightly on mobile

  let calendarIsActive = ()=>document.querySelector(".datepicker.active")
    ? true
    : false;

  rangepicker.datepickers.forEach((picker) => {
    picker.show();
    picker.hide();
  });
  document.addEventListener("click", (event) => {
    if (calendarIsActive()) {
      let pickerClicked = [false, false],
        inputFields = [
          document.querySelector("#dateRangeStart"),
          document.querySelector("#dateRangeEnd"),
        ];
      document
        .querySelectorAll("div.datepicker-dropdown > div")
        .forEach((picker, index) => {
          event.path.forEach((place) => {
            if (place == picker) {
              pickerClicked[index] = true;
            }
            if (place == inputFields[index]) {
              pickerClicked[index] = true;
            }
          });
        });
      pickerClicked.forEach((pickerClick, index) => {
        if (pickerClick == false) {
          rangepicker.datepickers[index].hide();
        }
      });
    }
  });
  addGlobalVar({rangepickerObject: rangepicker})
}

export { handleCalendar };
