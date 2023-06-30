require('advanced-logs');
require("dotenv");

const { PermissionsBitField, EmbedBuilder, interaction } = require("discord.js")

const { JsonDatabase } = require("five.db");

const db = new JsonDatabase({ databasePath: `./Database/Database`});

console.setConfig({
    background: true,
    timestamp: false
}); 

const fs = require("fs");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");

const client = new Client({
    intents: Object.values(GatewayIntentBits),
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Reaction,
        Partials.User,
        Partials.ThreadMember
    ],
    allowedMentions: {
        parse: [
            "everyone",
            "roles",
            "users"
        ]
    },
});

client.slashCommands = new Collection();
client.registerdCommands = new Collection();

const config = require("./config");

const loadingCommands = () => {

    for(const command of fs.readdirSync("./Commands/").filter(file => file.endsWith(".js"))) {
        const cmd = require(`./Commands/${command}`);
    
        client.slashCommands.set(cmd.config.name, cmd)
        client.registerdCommands.set(cmd.config.name, cmd.config)
        console.success(`${cmd.config.name} komutu başarıyla aktif edildi.`)
    }
}

const loadingEvents = () => {
    for(const event of fs.readdirSync("./Functions").filter(file => file.endsWith(".js"))) {
        const evt = require(`./Functions/${event}`);

        if(evt.config.once) {
            client.once(evt.config.name, (...args) => {
                evt.execute(client, ...args)
            }); 
        } else {
            client.on(evt.config.name, (...args) => {
                evt.execute(client, ...args)
            }); 
        }
    }
}

const slashCommandsRegister = () => {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");

    client.once("ready", async() => {
        const rest = new REST({ version: "10" }).setToken(config.client.token);
      try {
        await rest.put(Routes.applicationCommands(config.client.id), {
          body: client.registerdCommands,
        }).then(() => {
            console.info(`Registered Command Count ${client.registerdCommands.size}`)
        });
      } catch (error) {
        throw error;
      }
    })};


loadingCommands();
loadingEvents();
slashCommandsRegister();

client.login(config.client.token).then(() => {
    console.success(`Welcomer Successfully connected.`);
}).catch((err) => {
    console.error(`Welcomer No connection. Err: ${err}`);
});

client.on("ready", () => {
  client.user.setActivity(`Hello! I'm ViaApp, I'm here to serve you.`);
});
//küfür engel

const canvafy = require("canvafy")
client.on('guildMemberAdd', async member => {
  const kanal = db.fetch(`hgbb2_${member.guild.id}`)
  if (!kanal) return;
  const welcome = await new canvafy.WelcomeLeave()
    .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
  .setBackground("image", "https://p4.wallpaperbetter.com/wallpaper/433/444/53/anime-landscape-anime-art-anime-scenery-waterfall-wallpaper-preview.jpg")
  .setTitle("Welcome!")
  .setDescription(member.user.tag + " Welcome Our Server. ")
  .setBorder("#ffffff")
  .setAvatarBorder("#2a2e35")
  .setOverlayOpacity(0.6)
  .build();

  member.guild.channels.cache.get(kanal).send({
    content: `**Welcome our server ${member}!**`,
    files: [{
      attachment: welcome,
      name: `welcome-${member.id}.png`
    }]
  });
});
client.on('guildMemberRemove', async member => {
  const kanal = db.fetch(`hgbb2_${member.guild.id}`)
  if (!kanal) return;
  const welcome = await new canvafy.WelcomeLeave()
  .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
  .setBackground("image", "https://p4.wallpaperbetter.com/wallpaper/433/444/53/anime-landscape-anime-art-anime-scenery-waterfall-wallpaper-preview.jpg")
  .setTitle("Good Bye!")
  .setDescription(member.user.tag + "Good Bye dude")
  .setBorder("#ffffff")
  .setAvatarBorder("#ff0000")
  .setOverlayOpacity(0.6)
  .build();

  member.guild.channels.cache.get(kanal).send({
    content: `**${member} Left our server.**`,
    files: [{
      attachment: welcome,
      name: `welcome-${member.id}.png`
    }]
  });
});

