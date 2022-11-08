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
            data[role.id] = {
                string: data[role.id].join("\n"),
                length: data[role.id].length
            }
        }
        let rolename = client.guilds.cache.get(role.guild).roles.cache.get(role.id).name;
        fields.push({
            "name": `${role.emote} ${rolename} \`${users.filter(item => item.status === 0 && item.roleID === role.id).length.toString()}/${data[role.id].length}\``,
            "value": data[role.id].string,
            "inline": true
        });
    });
    let panels = await prisma.absencePanel.findMany();
    fields.push(
        {
            "name": "__Status__",
            "value": `${emotes.online} Aktiv \`${users.filter(item => item.status === 0).length.toString()}/${users.length}\`\n
            ${emotes.idle} Auf Abruf/Ping verfügbar \`${users.filter(item => item.status === 1).length.toString()}/${users.length}\`\n
            ${emotes.dnd} Eingeschränkt verfügbar \`${users.filter(item => item.status === 2).length.toString()}/${users.length}\`\n
            ${emotes.offline} Zurzeit nicht verfügbar \`${users.filter(item => item.status === 3).length.toString()}/${users.length}\``
        }
    )
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
