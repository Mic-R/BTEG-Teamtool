const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (client) {
    let date = Date.now();
    let data = await prisma.reminder.findMany();
    data.forEach((reminder) => {
        if (reminder.time < date && reminder.pending) {
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
                    .update({
                        where: {
                            id: reminder.id,
                        },
                        data: {
                            pending: false
                        }
                    })
                    .then(() => console.debug("Deleted reminder: " + reminder.id));
            } catch (e) {
                prisma.reminder
                    .update({
                        where: {
                            id: reminder.id,
                        },
                        data: {
                            pending: false
                        }
                    })
                    .then(() => console.debug("Deleted reminder: " + reminder.id))
                    .catch((e) => console.error(e));
            }
        }
    });
}