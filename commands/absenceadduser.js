const { SlashCommandBuilder } = require("discord.js");
const execute = require("./functions/absenceadduser");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("absenceadduser")
    .setDescription("Add absence user")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to add").setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to list this user under.")
        .setRequired(true)
    ),
  async execute(interaction) {
    execute(interaction);
  },
};
