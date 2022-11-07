const { SlashCommandBuilder } = require("discord.js");
const execute = require("./functions/remind");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remind")
    .setDescription("Ping a user at a certain time")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("Please provide the time as follows: YYYY-MM-DD HH:MM")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option.setName("mention").setDescription("The user to ping")
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel that you want to be reminded in.")
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What do you want to do at that time?")
    ),
  async execute(interaction) {
    await execute(interaction);
  },
};
