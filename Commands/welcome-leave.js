const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { JsonDatabase } = require("five.db");

const db = new JsonDatabase({ databasePath: `./Database/Database`});

module.exports.execute = async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "To use this command, you need to have manage channels authority.", ephemeral: true})
    
    if (interaction.options.getSubcommand() === `set`) {

    const kanal2 = interaction.options.getChannel('channel')
   db.set(`hgbb2_${interaction.guild.id}`, kanal2.id)
   const embed = new EmbedBuilder()
   .setDescription("> Picture Welcome Bye Bye Channel Set Up Successfully!")
   .setColor("#2b2d31")
   interaction.reply({embeds: [embed]})
    }
    if (interaction.options.getSubcommand() === `reset`) {
        db.delete(`hgbb2_${interaction.guild.id}`)
        const embed = new EmbedBuilder()
        .setDescription("> Picture Welcome Bye Bye Channel Reset Up Successfully!")
        .setColor("#2b2d31")
        interaction.reply({embeds: [embed]})
    }

}
module.exports.config = {
    name:"join-leave",
    description: 'Set to Join Leave system.',
    type:1,
    options: [
        {
            name:"set",
            description:"setting operations",
            type:1,
            options:[
                {
                    name:"channel",
                    description:"Set to Join Leave channel.",
                    type:7,
                    required:true,
                    channel_types:[0]}]            
        },
        {
            name:"reset",
            description:"setting operations",
            type:1,
        },
       
    ],
}
