const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
} = require("discord.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (interaction) {
  let roleID = await interaction.fields.fields.get("AbsenceRole").value;
  let role = await interaction.guild.roles.cache.get(roleID.toString());
  let emote = (await interaction.fields.fields.get("AbsenceEmoji").value) || "";
  if (!role) {
    return interaction.reply({
      content: "",
      embeds: [
        {
          title: "❌ | The role could not be found",
          color: null,
          footer: {
            text: "BTE Teamtool",
            icon_url: "https://bte-germany.de/logo.gif",
          },
        },
      ],
      attachments: [],
      ephemeral: true,
    });
  }
  let prevcheck = await prisma.absenceRole.findFirst({
    where: { id: roleID.toString() },
  });
  if (prevcheck) {
    prisma.absenceRole.delete({ where: { id: roleID.toString() } }).then(() => {
      return interaction.reply({
        content: "",
        embeds: [
          {
            title: "✅ | Removed the role from the database.",
            color: null,
            footer: {
              text: "BTE Teamtool",
              icon_url: "https://bte-germany.de/logo.gif",
            },
          },
        ],
        attachments: [],
        ephemeral: true,
      });
    });
    return;
  }
  prisma.absenceRole
    .create({
      data: {
        id: roleID.toString(),
        emote: emote,
        guild: interaction.guild.id,
      },
    })
    .then(() => {
      return interaction.reply({
        content: "",
        embeds: [
          {
            title: "✅ | Added the role to the database",
            color: null,
            footer: {
              text: "BTE Teamtool",
              icon_url: "https://bte-germany.de/logo.gif",
            },
          },
        ],
        attachments: [],
        ephemeral: true,
      });
    });
};
