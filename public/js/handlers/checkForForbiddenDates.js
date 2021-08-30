import { changeDateFormatInto } from "/sc/generalFunctions/changeDateFormatInto.js";

function createForbiddenDateMessage() {
  let msg = document.createElement("div");
  msg.innerText =
    "Bitte wählen Sie einen anderen Start- und Endpunkt.\nEinzelne Daten sind bereits reserviert.";
  msg.style.backgroundColor = "black";
  msg.style.color = "white";
  msg.style.borderRadius = "14px";
  msg.style.padding = "10px";
  msg.style.fontSize = "25px";
  msg.style.position = "absolute";
  msg.style.textAlign = "center";
  msg.style.zIndex = "30";
  msg.style.top = "50%";
  msg.style.left = "50%";
  msg.id = "FailureMessage";
  document.body.appendChild(msg);
  function smoothOut() {
    let start = Date.now();
    let timer = setInterval(function () {
      let timePassed = Date.now() - start;
      if (timePassed >= 5000) {
        clearInterval(timer);
        return;
      }
      function lowOpacity() {
        msg.style.opacity = `${
          (1 - (timePassed * 2 - timePassed) / 5000) * 100
        }%`;
      }
      lowOpacity();
    }, 20);
  }
  smoothOut();
  setTimeout(() => msg.remove(), 5000);
}

function checkForForbiddenDates(rangepicker) {

  let hasForbiddenDate = false,
    lockedDates = lockedDatesArray,
    [start, end] = rangepicker.getDates();
  //turn the dates Into Objects
  lockedDates = (() => {
    let lockedDatesAsObjects = [];
    lockedDates.forEach((date) => {
      lockedDatesAsObjects.push(changeDateFormatInto.object(date));
    });
    return lockedDatesAsObjects;
  })();
  start = changeDateFormatInto?.object(start?.toDateString());
  end = changeDateFormatInto?.object(end?.toDateString());

  //check if forbidden dates fall between start and end date
  lockedDates.forEach((lockedDate) => {
    if (lockedDate.year > start.year && lockedDate.year < end.year) {
      hasForbiddenDate = true;
    }
    if (lockedDate.year >= start.year) {
      if (lockedDate.year <= end.year) {
        if (lockedDate.month >= start.month) {
          if (lockedDate.month <= end.month) {
            if (
              lockedDate.month > start.month &&
              lockedDate.month < end.month
            ) {
              hasForbiddenDate = true;
            }
            if (
              lockedDate.month >= start.month &&
              lockedDate.month < end.month
            ) {
              if (lockedDate.day > start.day) {
                hasForbiddenDate = true;
              }
              if (
                lockedDate.month > start.month &&
                lockedDate.month < end.month
              ) {
                hasForbiddenDate = true;
              }
            }
            if (lockedDate.day > start.day) {
              if (lockedDate.day < end.day) {
                hasForbiddenDate = true;
              }
            }
          }
        }
      }
    }
  });
  if (hasForbiddenDate) {
    rangepicker.setDates({ clear: true }, { clear: true });
    createForbiddenDateMessage();
  }
}

export { checkForForbiddenDates };
