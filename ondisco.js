const Discord = require("discord.js")
const bot = new Discord.Client
const commands = require("./src/commands/commands")
const config = require("./config.json")
const express = require("express")
const port = process.env.PORT || 3539
const token = config.token || process.env.TOKEN
const prefix = config.prefix || process.env.PREFIX
let presenceUpdate = false

bot.on("ready", () => (console.clear(), console.log(`Bot Online, com ${bot.users.cache.size} usuários, ${bot.channels.cache.size} canais e ${bot.guilds.cache.size} servidores.`)))


bot.on("presenceUpdate", () => bot.user.setActivity("Digite !dhelp para mais informações."))

bot.on("voiceStateUpdate", () => {
    presenceUpdate = !presenceUpdate
    presenceOptions = { "activity": {"name": "Digite !dhelp para mais informações.","type": "PLAYING",},"status": "online"}
    
    if (presenceUpdate) presenceOptions = {"activity": { "name": " e tocando um sonzinho", "type": "LISTENING",},"status": "idle"}
    
    return bot.user.setPresence(presenceOptions)
})

bot.on("guildDelete", guild => console.info(`O bot foi removido do servidor: ${guild.name} \nid: ${guild.id}`))


bot.on('message', async message => {
    const embed = (new Discord.MessageEmbed()).setColor("#B955D4")

    if (message.content === "<@!617522102895116358>" || message.content === "<@617522102895116358>") {
        embed
            .setTitle(`Olá ${message.author.username}! \nMeu nome é Ondisco logo a baixo tem minha descrição:`)
            .setDescription("**prefixo:** **``!d``** \n **função do Ondisco:** **``Divertir os usuários do Discord tocando músicas nos canais de voz``** \n **Criador do Ondisco:** **``Marcio#1506``** \n[Copyright (C) 2000 Aladdin Enterprises](https://github.com/marcio1002/bot-Ondisco/blob/master/LICENCE.md)")
        await message.channel.send(embed).delete({ timeout: 25000 })
    }
    if (message.author.bot || message.channel.type === "dm" || !message.content.startsWith(prefix)) return
    const
        mentionUser = message.mentions.users.first()
        memberMentions = message.guild.member(mentionUser)
        args = message.content.slice(prefix.length).trim().split(/ +/g)
        command = args.shift().toLowerCase()

    let messageProps = {
        embed,
        message,
        args,
        bot,
        mentionUser,
        memberMentions,
        voiceChannel: message.member.voice.channel,
    }
    commands.findCommand(command, messageProps)
})

express().listen(port)
bot.login(token)
