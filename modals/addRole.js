const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
} = require("discord.js");
const execute = require("./functions/addRole");

module.exports = {
  data: new ModalBuilder()
    .setTitle("Add role to absence list")
    .setCustomId("AbsenceRoleAdd")
    .addComponents(
      new ActionRowBuilder().addComponents([
        new TextInputBuilder()
          .setCustomId("AbsenceRole")
          .setRequired(true)
          .setLabel("The ID of the role you want to add.")
          .setStyle(1),
      ])
    )
    .addComponents(
      new ActionRowBuilder().addComponents([
        new TextInputBuilder()
          .setCustomId("AbsenceEmoji")
          .setRequired(false)
          .setLabel("The Emoji you want to add")
          .setStyle(1),
      ])
    ),
  async execute(interaction) {
    execute(interaction);
  },
};
