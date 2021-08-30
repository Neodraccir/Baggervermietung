const appRoot = require("app-root-path");

module.exports = (app) => {
  app.get("/getLockedDates", async function (req, res) {
    try {
      const getDates = require(`${appRoot}/lib/googleCalendar/listEventsFor370Days.js`),
        getEveryDayDistinctly = require(`${appRoot}/lib/googleCalendar/getEveryDayDistinctly.js`),
        lockedDates = await getDates();
      shortenSecondDate = (lockedDates) => {
        lockedDates.forEach((date) => {
          let secondDate = new Date(date[1]);
          secondDate.setDate(secondDate.getDate() - 1);
          let revisedDate = JSON.stringify(secondDate).slice(1, 11);
          date[1] = revisedDate;
        });
      };
      shortenSecondDate(lockedDates);

      console.log("locked Dates:");
      console.log(getEveryDayDistinctly(lockedDates));
      res.json(getEveryDayDistinctly(lockedDates));
    } catch (err) {
      console.error(err);
    }
  });
};
