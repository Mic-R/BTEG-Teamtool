const changeStatus = require("./functions/changeStatus");

module.exports = {
  data: {
    name: "AbsenceSetAvailable",
  },
  async execute(interaction) {
    changeStatus(interaction, 0);
  },
};
