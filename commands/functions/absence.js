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
              style: 3,
              label: `Change status`,
              custom_id: `AbsenceSetStatus`,
              disabled: false,
              type: 2,
            },
            {
              style: 1,
              label: `Register`,
              custom_id: `AbsenceRegister`,
              disabled: false,
              type: 2,
            },
            {
              style: 2,
              label: `Add role`,
              custom_id: `AbsenceAddRole`,
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
            channel: r.channel.id
          },
        })
        .then(() => {
          interaction.editReply({ content: "Done!", ephemeral: true });
        });
    });
};
