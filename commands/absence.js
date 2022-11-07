const { SlashCommandBuilder } = require("discord.js");
const execute = require("./functions/absence");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("absence")
    .setDescription("Creates a new absence panel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want your embed sent into.")
    ),
  async execute(interaction) {
    await execute(interaction);
  },
};
