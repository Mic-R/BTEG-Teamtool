const Discord = require("discord.js");
require("dotenv").config();
const schedule = require("./schedules/schedule");
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

  client.application.commands.set([]);

  //command handling
  client.commands = new Discord.Collection();
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      client.application.commands
        .create(command.data.toJSON())
        .then(() => console.log("Registered /" + command.data.name));
    } else {
      console.warn(
        `The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }

  //buttons handling
  client.buttons = new Discord.Collection();
  const buttonFiles = fs
    .readdirSync(`./buttons/`)
    .filter((file) => file.endsWith(".js"));
  for (const file of buttonFiles) {
    const button = require(`./buttons/${file}`);
    if ("data" in button && "execute" in button) {
      client.buttons.set(button.data.data.custom_id, button);
    } else {
      console.warn(
        `The command at ${`./buttons/${file}`} is missing a required "data" or "execute" property.`
      );
    }
  }

  //modals handling
  client.modals = new Discord.Collection();
  const modalFiles = fs
    .readdirSync(`./modals/`)
    .filter((file) => file.endsWith(".js"));
  for (const file of modalFiles) {
    const modal = require(`./modals/${file}`);
    if ("data" in modal && "execute" in modal) {
      client.modals.set(modal.data.data.custom_id, modal);
    } else {
      console.warn(
        `The modal at ${`./modals/${file}`} is missing a required "data" or "execute" property.`
      );
    }
  }
});

client.on(Discord.Events.InteractionCreate, async (interaction) => {
  if (interaction.isCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
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
  }
  if (interaction.isButton()) {
    const button = client.buttons.get(interaction.customId);
    if (!button) {
      console.error(`No button matching ${interaction.customId} was found.`);
      return;
    }

    try {
      await button.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this button!",
        ephemeral: true,
      });
    }
  }
  if (interaction.isModalSubmit()) {
    const modal = client.modals.get(interaction.customId);
    if (!modal) {
      console.error(`No modal matching ${interaction.customId} was found.`);
      return;
    }

    try {
      await modal.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this modal!",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.TOKEN);
