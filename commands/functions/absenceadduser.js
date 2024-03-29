const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (interaction) {
  let test = await prisma.absenceUser.findFirst({
    where: {
      id: interaction.options.get("user").user.id,
    },
  });
  if (test !== null) {
    prisma.absenceUser
      .update({
        where: {
          id: interaction.options.get("user").user.id,
        },
        data: {
          roleID: interaction.options.get("role").role.id,
        },
      })
      .then(async () => {
        await interaction.reply({
          content: null,
          embeds: [
            {
              title: "✅ | Successfully changed this user's role!",
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
      .catch(async (e) => {
        await interaction.reply({
          content: null,
          embeds: [
            {
              title:
                "❌ | Could not change this user's role. Please try again later!",
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
  } else {
    prisma.absenceUser
      .create({
        data: {
          id: interaction.options.get("user").user.id,
          status: 0,
          roleID: interaction.options.get("role").role.id,
        },
      })
      .then(async () => {
        await interaction.reply({
          content: null,
          embeds: [
            {
              title: "✅ | Successfully added this user to the database!",
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
      .catch(async (e) => {
        await interaction.reply({
          content: null,
          embeds: [
            {
              title:
                "❌ | Could not add this user to the database. Please try again later!",
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
        });
      });
  }
};
