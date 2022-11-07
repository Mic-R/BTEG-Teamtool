const { ButtonBuilder } = require("discord.js");
const modal = require("../modals/addRole")

module.exports = {
  data: new ButtonBuilder().setCustomId("AbsenceAddRole"),
  async execute(interaction) {
    interaction.showModal(modal.data);
  },
};
