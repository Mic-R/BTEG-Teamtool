const modal = require("../modals/AbsenceSetDND");

module.exports = {
  data: {
    name: "AbsenceSetDND",
  },
  async execute(interaction) {
    await interaction.showModal(modal.data);
  },
};
