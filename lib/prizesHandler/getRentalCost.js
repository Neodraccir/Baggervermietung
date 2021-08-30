module.exports = (timeObject, isBusiness, extraBuckets) => {
  //dependencies and variables
  let appRoot = require("app-root-path"),
    getGlobalStrings = require(`${appRoot}/lib/global/getGlobalStrings.js`)(
      globalThis
    ), //includes variable "rentalCost" & "deliveryCost"
    returnArrayObjectOrNextEntry = require(`${appRoot}/lib/arrayManipulation/returnArrayObjectOrNextEntry.js`),
    convertWeekdayStringToNumber = require(`${appRoot}/lib/converter/convertWeekdayStringToNumber.js`),
    startDate = new Date(timeObject?.startDate),
    endDate = new Date(timeObject?.endDate),
    amountOfDays = require(`${appRoot}/lib/prizesHandler/getAmountOfDays.js`)(
      startDate,
      endDate
    ),
    extraBucketPrize = Number(
      require(`${appRoot}/config/prizesList.json`).extra.extraBuckets.replace(
        /%/,
        ""
      )
    ),
    markupPercentage =
      extraBuckets != null ? 1+((extraBucketPrize * extraBuckets) / 100) : 1;
  console.log(`#GRC: Loading getRentalCost() function...`);
  console.log(`#GRC: startDate: ${startDate}`);
  console.log(`#GRC: endDate: ${endDate}`);

  if (amountOfDays < 0) {
    return console.log("#GRC: ERROR: amountOfDays < 0");
  }

  //functions
  function determinePriceConditionsFor(timespan) {
    let priceObject = returnArrayObjectOrNextEntry(
      timespan,
      rentalPrizes,
      true
    );
    return priceObject;
  }

  function getWeekdaySpecialPrice(rentalPrizesObject) {
    let specialStartWeekday = convertWeekdayStringToNumber(
        rentalPrizesObject?.[fromTo]?.[0]
      ),
      specialEndWeekday = convertWeekdayStringToNumber(
        rentalPrizesObject?.[fromTo]?.[1]
      ),
      startDayMatches = startDate.getDay() === specialStartWeekday,
      endDayMatches = endDate.getDay() === specialEndWeekday,
      timeSpanMatches = amountOfDays === rentalPrizesObject?.minDays;

    if (startDayMatches && endDayMatches && timeSpanMatches) {
      if (isBusiness) {
        return rentalPrizesObject?.business;
      }

      return rentalPrizesObject?.private;
    } else {
      return doesNotMatchConditions;
    }
  }

  function getWeekdaySpecialPriceOrReturnFalse(rentalPrizesObject) {
    let prizesObject = rentalPrizesObject,
      weekdaySpecialPrice = getWeekdaySpecialPrice(prizesObject),
      minDays = rentalPrizesObject?.minDays;

    while (weekdaySpecialPrice) {
      if (weekdaySpecialPrice !== doesNotMatchConditions) {
        return weekdaySpecialPrice;
      }

      minDays--;
      if (minDays < 0) {
        return false;
      }
      prizesObject = determinePriceConditionsFor(minDays);

      if (prizesObject !== undefined && prizesObject?.[fromTo] === undefined) {
        return { correctPriceCondition: prizesObject };
      }
      weekdaySpecialPrice = getWeekdaySpecialPrice(prizesObject);
    }

    if (weekdaySpecialPrice) {
      return false;
    }
  }

  function calculatePrize(prize, minDays, amountOfDays) {
    return Math.floor((prize / minDays) * amountOfDays);
  }

  function getRentalPriceFor(timeObject, isBusiness) {
    var rentalPrize,
      rentalPrizesObject = determinePriceConditionsFor(amountOfDays),
      thereAreSpecialWeekdayPrices = rentalPrizesObject?.[fromTo] !== undefined;
    objectShouldBeJumpedOver = false;

    if (thereAreSpecialWeekdayPrices) {
      let specialWeekdayPrize =
        getWeekdaySpecialPriceOrReturnFalse(rentalPrizesObject);
      if (specialWeekdayPrize?.correctPriceCondition !== undefined) {
        rentalPrizesObject = specialWeekdayPrize?.correctPriceCondition;
        specialWeekdayPrize = false;
      }
      if (specialWeekdayPrize) {
        return specialWeekdayPrize;
      }
    }

    if (isBusiness) {
      rentalPrize = calculatePrize(
        rentalPrizesObject?.business,
        rentalPrizesObject?.minDays,
        amountOfDays
      );
    }

    if (!isBusiness) {
      rentalPrize = calculatePrize(
        rentalPrizesObject?.private,
        rentalPrizesObject?.minDays,
        amountOfDays
      );
    }

    console.log(`#GRC: chosen tariff: ${rentalPrizesObject?.tariffName}`);
    console.log(`#GRC:`);
    console.log(rentalPrizesObject);
    console.log(`#GRC: Amount of Days: ${amountOfDays}`);
    console.log(`#GRC: Is a business? ${isBusiness}`);
    console.log(`#GRC: Rental Prize ${rentalPrize}`);
    console.log(`#GRC: Adding Markup Percentage ${rentalPrize*markupPercentage}`);
    rentalPrize = rentalPrize*markupPercentage;

    return rentalPrize.toFixed(0);
  }

  //execution
  return getRentalPriceFor(timeObject, isBusiness);
};
