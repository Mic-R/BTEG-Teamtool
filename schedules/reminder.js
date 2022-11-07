const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (client) {
  let date = Date.now();
  let data = await prisma.reminder.findMany();
  data.forEach((reminder) => {
    if (reminder.time < date) {
      try {
        let channel = client.channels.cache.get(reminder.channel);
        channel.send({
          content: `<@${reminder.user}>`,
          embeds: [
            {
              title: "⏰ | Hey! You've got a pending reminder",
              description: "Here is what you wanted to do:",
              color: 3553599,
              fields: [
                {
                  name: "Message:",
                  value: `${reminder.message}`,
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
        prisma.reminder
          .delete({
            where: {
              id: reminder.id,
            },
          })
          .then(() => console.debug("Deleted reminder: " + reminder.id));
      } catch (e) {
        prisma.reminder
          .delete({
            where: {
              id: reminder.id,
            },
          })
          .then(() => console.debug("Deleted reminder: " + reminder.id))
          .catch((e) => console.error(e));
      }
    }
  });
};
