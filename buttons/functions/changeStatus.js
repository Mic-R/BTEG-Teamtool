const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (interaction, num) {
  prisma.absenceUser
    .update({
      where: {
        id: interaction.user.id,
      },
      data: {
        status: num,
        until: "",
      },
    })
    .then(() => {
      interaction.reply({
        content: null,
        embeds: [
          {
            title: "✅ | Successfully changed your status!",
            color: 3553599,
            footer: {
              text: "BTE Teamtool",
              icon_url: "https://bte-germany.de/logo.gif",
            },
          },
        ],
        attachments: [],
        ephemeral: true,
      });
    })
    .catch((e) => {
      interaction.reply({
        content: null,
        embeds: [
          {
            title: "❌ | You seem not to be registered yet!",
            color: 3553599,
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
        ephemeral: true,
      });
    });
};
