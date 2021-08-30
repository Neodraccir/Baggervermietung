let appRoot = require("app-root-path"),
  getDeliveryCost = require(`${appRoot}/lib/prizesHandler/getDeliveryCost.js`),
  getRentalCost = require(`${appRoot}/lib/prizesHandler/getRentalCost.js`);

module.exports = function ({
  distance,
  dateStart,
  dateEnd,
  inclDelivery,
  isBusiness,
  extraBuckets,
}) {
  console.log("#PrC: loading module -> priceCalc.js");
  console.log("#PrC: Calculating price for:");
  console.log(arguments[0]);
  if (isBusiness === "true") {
    isBusiness = true;
  }
  if (isBusiness === "false") {
    isBusiness = false;
  }

  let amountOfDays = require(`${appRoot}/lib/prizesHandler/getAmountOfDays.js`)(
      dateStart,
      dateEnd
    ),
    rentalCost = getRentalCost(
      {
        startDate: dateStart,
        endDate: dateEnd,
      },
      isBusiness,
      extraBuckets
    );

  if (inclDelivery && !isNaN(distance) && distance !== 0) {
    let deliveryCost = getDeliveryCost(distance, amountOfDays);

    console.log(`#PrC: fullCost: ${Math.floor(deliveryCost + rentalCost)}`);

    return {
      fullCost: Math.floor(deliveryCost + rentalCost),
      deliveryCost: deliveryCost,
      rentalCost: rentalCost,
    };
  }

  console.log(`#PrC: fullCost: ${rentalCost}`);

  return {
    fullCost: rentalCost,
    deliveryCost: 0,
    rentalCost: rentalCost,
  };
};
