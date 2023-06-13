const { EmbedBuilder } = require('discord.js')

module.exports.execute = async(client, interaction) => {
    
    const embed = new EmbedBuilder()
.setDescription(`Welcomer Bot = \`${client.ws.ping}\` `)
interaction.reply({embeds: [embed] ,ephemeral:true})
},

module.exports.config = {
    name: "ping",
    description: "Shows the bot delay.",
    options: []
}
