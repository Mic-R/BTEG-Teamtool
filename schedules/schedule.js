const reminder = require("./reminder");
const absenceUpdate = require("./absenceUpdate")
const absenceStatusUpdate = require("./absenceStatusUpdate")

module.exports = function (client) {
  setInterval(async () => {
    await reminder(client);
    await absenceStatusUpdate();
    await absenceUpdate(client);
  }, 5000);
};
