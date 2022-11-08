const modal = require("../modals/AbsenceSetIdle")

module.exports = {
    data: {
        name: "AbsenceSetIdle"
    },
    async execute(interaction){
        await interaction.showModal(modal.data)
    }
}