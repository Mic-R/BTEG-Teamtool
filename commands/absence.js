const { SlashCommandBuilder } = require("discord.js");
const execute = require("./functions/absence")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("absence")
        .setDescription("Creates a new absence panel"),
    async execute(interaction) {
        await execute(interaction);
    },
};
