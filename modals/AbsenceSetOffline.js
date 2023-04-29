const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
} = require("discord.js");
const execute = require("./functions/changeStatus");

module.exports = {
  data: new ModalBuilder()
    .setTitle("Change your status.")
    .setCustomId("AbsenceSetOffline")
    .addComponents(
      new ActionRowBuilder().addComponents([
        new TextInputBuilder()
          .setCustomId("until")
          .setRequired(true)
          .setLabel("'YYYY-MM-DD'")
          .setStyle(1),
      ])
    ),
  async execute(interaction) {
    await execute(interaction, 3);
  },
};
