const { SlashCommandBuilder } = require("discord.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    const time = Date.parse(
      `${interaction.options.get("time").value}:00 UTC+1`
    );
    const user = interaction.options.mention
      ? interaction.options.mention.id
      : interaction.user.id;
    const channel = interaction.options.channel
      ? interaction.options.channel.id
      : interaction.channelId;
    const message = interaction.options.get("message")
      ? interaction.options.get("message").value
      : "BING BONG";

    //time error message
    if (!time) {
      await interaction.reply({
        content: null,
        embeds: [
          {
            title:
              "❌ | The time you provided is invalid. Please provide it in the follow way: YYYY-MM-DD HH:MM",
            description: "Here is what you have written:",
            color: null,
            fields: [
              {
                name: "User to ping:",
                value: `<@${user}>`,
                inline: true,
              },
              {
                name: "Time",
                value: interaction.options.get("time").value,
                inline: true,
              },
              {
                name: "Channel",
                value: `<#${channel}>`,
                inline: true,
              },
              {
                name: "Message",
                value: `${message}`,
                inline: true,
              },
            ],
            footer: {
              text: "BTE Teamtool",
              icon_url: "https://bte-germany.de/logo.gif",
            },
          },
        ],
        attachments: [],
      });
      return;
    }

    //add do database
    prisma.reminder
      .create({
        data: {
          id: interaction.id,
          time: time,
          user: user,
          channel: channel,
          message: message,
        },
      })
      .then(async () => {
        await interaction.reply({
          content: null,
          embeds: [
            {
              title: "✅ | Successfully added your reminder to the database!",
              description: "Here is what you have written:",
              color: null,
              fields: [
                {
                  name: "User to ping:",
                  value: `<@${user}>`,
                  inline: true,
                },
                {
                  name: "Time",
                  value: interaction.options.get("time").value,
                  inline: true,
                },
                {
                  name: "Channel",
                  value: `<#${channel}>`,
                  inline: true,
                },
                {
                  name: "Message",
                  value: `${message}`,
                  inline: true,
                },
              ],
              footer: {
                text: "BTE Teamtool",
                icon_url: "https://bte-germany.de/logo.gif",
              },
            },
          ],
          attachments: [],
        });
      })
      .catch(async (e) => {
        await interaction.reply({
          content: null,
          embeds: [
            {
              title:
                "❌ | Could not add your reminder to the database. Please try again later!",
              description: "Here is what you have written:",
              color: null,
              fields: [
                {
                  name: "User to ping:",
                  value: `<@${user}>`,
                  inline: true,
                },
                {
                  name: "Time",
                  value: interaction.options.get("time").value,
                  inline: true,
                },
                {
                  name: "Channel",
                  value: `<#${channel}>`,
                  inline: true,
                },
                {
                  name: "Message",
                  value: `${message}`,
                  inline: true,
                },
              ],
              footer: {
                text: "BTE Teamtool",
                icon_url: "https://bte-germany.de/logo.gif",
              },
            },
            {
              title: "❌ | Please provide this error",
              description: e.toString(),
              color: null,
              footer: {
                text: "BTE Teamtool",
                icon_url: "https://bte-germany.de/logo.gif",
              },
            },
          ],
          attachments: [],
        });
      });
  },
};
