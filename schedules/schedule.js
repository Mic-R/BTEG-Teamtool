const reminder = require("./reminder");

module.exports = function (client) {
  setInterval(async () => {
    reminder(client);
  }, 5000);
};
