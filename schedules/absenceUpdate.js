const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const emotes = require("../emotes.json")

module.exports = async function (client) {
    let data = {}
    let users = await prisma.absenceUser.findMany();
    users.forEach((user) => {
        let emote;
        let timestamp = (user.until) ? (`<t:${user.until}:R>`):("");
        switch(user.status) {
            case 0:
                emote = emotes.online
                break;
            case 1:
                emote = emotes.idle
                break;
            case 2:
                emote = emotes.dnd
                break;
            case 3:
                emote = emotes.offline
                break;
        }
        if(!data[user.roleID]){
            data[user.roleID] = []
            data[user.roleID].push(`${emote} | <@${user.id}> ${timestamp}`)
        }else{
            data[user.roleID].push(`${emote} | <@${user.id}> ${timestamp}`)
        }
    });
    let roles = await prisma.absenceRole.findMany();
    let fields = [];
    roles.forEach((role) => {
        if(!data[role.id]){
            console.warn(`Nobody has the role ${role.id} mofo`);
        }else{
            data[role.id] = data[role.id].join("\n");
        }
        let rolename = client.guilds.cache.get(role.guild).roles.cache.get(role.id).name;
        fields.push({
            "name": `${role.emote} ${rolename}`,
            "value": data[role.id],
            "inline": true
        });
    });
    let panels = await prisma.absencePanel.findMany();
    panels.forEach((panel) => {
        client.channels.cache.get(panel.channel).messages.fetch(panel.id).then((msg) => {
            let content = {
                "content": null,
                "embeds": [
                    {
                        "title": "Team Anwesenheit",
                        "color": 16777215,
                        "fields": fields
                    }
                ],
                "attachments": []
            };
            msg.edit(content);
        })
    })
};
