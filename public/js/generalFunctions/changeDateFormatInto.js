function lookForGermanDate(date) {
  return /(?<day>\d\d).(?<month>\d\d).(?<year>\d\d\d\d)/sy.exec(date);
}
function lookForUniversalDate(date) {
  return /(?<year>\d\d\d\d)-(?<month>\d\d)-(?<day>\d\d)/sy.exec(date);
}

function lookForStringDate(date) {
  let stringDate =
    /[\w]*\s(?<month>\w\w\w)\s(?<day>\d\d)\s(?<year>\d\d\d\d)/y.exec(date);
    console.log(stringDate)
  switch (stringDate?.groups?.month) {
    case "Jan":
      stringDate.groups.month = "01";
      break;
    case "Feb":
      stringDate.groups.month = "02";
      break;
    case "Mar":
      stringDate.groups.month = "03";
      break;
    case "Apr":
      stringDate.groups.month = "04";
      break;
    case "May":
      stringDate.groups.month = "05";
      break;
    case "Jun":
      stringDate.groups.month = "06";
      break;
    case "Jul":
      stringDate.groups.month = "07";
      break;
    case "Aug":
      stringDate.groups.month = "08";
      break;
    case "Sep":
      stringDate.groups.month = "09";
      break;
    case "Oct":
      stringDate.groups.month = "10";
      break;
    case "Nov":
      stringDate.groups.month = "11";
      break;
    case "Dez":
      stringDate.groups.month = "12";
      break;
  }
  return stringDate;
}

const changeDateFormatInto = {
  german: function (date) {
    let dateObj = lookForUniversalDate(date);
    return `${dateObj?.groups?.day}.${dateObj?.groups?.month}.${dateObj?.groups?.year}`;
  },
  universal: function (date) {
    let dateObj = lookForGermanDate(date);
    return `${dateObj?.groups?.year}-${dateObj?.groups?.month}-${dateObj?.groups?.day}`;
  },
  object: function (date) {
    function makeItAnObject(objToBe) {
      return {
        year: Number(objToBe?.groups?.year),
        month: Number(objToBe?.groups?.month),
        day: Number(objToBe?.groups?.day),
      };
    }

    let objToBe = lookForUniversalDate(date);
    if (objToBe == null) {
      objToBe = lookForGermanDate(date);
    }

    if (objToBe == null) {
      objToBe = lookForStringDate(date);
    }

    return makeItAnObject(objToBe);
  },
};
export { changeDateFormatInto };
