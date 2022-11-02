const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


module.exports = async function (interaction){
interaction.reply("Generating a new embed...", {ephemeral: true});
interaction.channel.send("Lol");
}