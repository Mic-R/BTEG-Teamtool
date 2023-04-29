const modal = require("../modals/AbsenceSetOffline");

module.exports = {
  data: {
    name: "AbsenceSetOffline",
  },
  async execute(interaction) {
    await interaction.showModal(modal.data);
  },
};
