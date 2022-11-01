const Discord = require("discord.js");
require("dotenv").config();
const schedule = require("./schedules/schedule")
const fs = require("node:fs");
const path = require("node:path");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.info("Ready! Logged in as " + client.user.username);
  schedule(client);
});

client.commands = new Discord.Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the commands name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(
      `The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.on(Discord.Events.InteractionCreate, async (interaction) => {
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.TOKEN);
