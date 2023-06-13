const { EmbedBuilder } = require('discord.js')

module.exports.execute = async(client, interaction) => {
    
    const embed = new EmbedBuilder()
.setDescription(`PreAI = \`${client.ws.ping}\` `)
interaction.reply({embeds: [embed] ,ephemeral:true})
},

module.exports.config = {
    name: "ping",
    description: "Bot'un gecikmesini gösterir.",
    options: []
}