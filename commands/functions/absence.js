const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (interaction) {
  const channel = interaction.options.channel || interaction.channel;
  interaction.reply({ content: "Generating a new embed...", ephemeral: true });
  channel
    .send({
      content: "",
      tts: false,
      components: [
        {
          type: 1,
          components: [
            {
              style: 2,
              emoji: {
                id: `1009396982399373348`,
                name: `onlinestatus`,
                animated: false,
              },
              custom_id: `AbsenceSetAvailable`,
              disabled: false,
              type: 2,
            },
            {
              style: 2,
              emoji: {
                id: `1009396978683219979`,
                name: `idlestatus`,
                animated: false,
              },
              custom_id: `AbsenceSetIdle`,
              disabled: false,
              type: 2,
            },
            {
              style: 2,
              emoji: {
                id: `1009396980704874528`,
                name: `dndstatus`,
                animated: false,
              },
              custom_id: `AbsenceSetDND`,
              disabled: false,
              type: 2,
            },
            {
              style: 2,
              emoji: {
                id: `1009140759523495936`,
                name: `offline`,
                animated: false,
              },
              custom_id: `AbsenceSetOffline`,
              disabled: false,
              type: 2,
            },
          ],
        },
      ],
      embeds: [
        {
          type: "rich",
          title: `💤 | Refreshing this embed`,
          description: `Please allow up to 30 seconds for this process to finish`,
          color: 0x00ffff,
          footer: {
            text: `BTE Teamtool`,
            icon_url: `https://bte-germany.de/logo.gif`,
          },
        },
      ],
    })
    .then(async (r) => {
      prisma.absencePanel
        .create({
          data: {
            id: r.id,
            channel: r.channel.id,
          },
        })
        .then(() => {
          interaction.editReply({ content: "Done!", ephemeral: true });
        });
    });
};
