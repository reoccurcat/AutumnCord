// noinspection JSCheckFunctionSignatures

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const axios = require('axios')
module.exports = {
    name: "onesecmail",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName('onesecmail')
		.setDescription("Get and manage a temporary email address")
        .addSubcommand(subcommand =>
            subcommand
                .setName('generate')
                .setDescription('Generate a temporary email address'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Check the inbox of a temporary email')
                .addStringOption(option => option.setName('addr').setDescription('Your temporary email address').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('read')
                .setDescription('Read an email in your inbox')
                .addStringOption(option => option.setName('addr').setDescription('Your temporary email address').setRequired(true))
                .addStringOption(option => option.setName('id').setDescription('The email\'s ID').setRequired(true))),
	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'generate') {
            let test = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox')
            let embed = new MessageEmbed()
                .setColor('#5a1da1')
                .setAuthor({name:`1SecMail`, iconURL:'https://autumncord.xyz/assets/images/mail.png'})
                .setTitle('Email generated!')
                .setDescription(`Your tempoary email address is \`${test.data[0]}\`!`)
            await interaction.reply({embeds: [embed]})
        } else

        if (interaction.options.getSubcommand() === 'check') {
            let customId1 = Math.floor(Math.random() * 10000)
            let customId2 = Math.floor(Math.random() * 10000)
            let customId3 = Math.floor(Math.random() * 10000)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(String(customId1))
                        .setLabel('<--')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId(String(customId2))
                        .setLabel('-->')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId(String(customId3))
                        .setLabel('end interaction')
                        .setStyle('SECONDARY'),
                );
            const disabledRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('dis1')
                        .setLabel('<--')
                        .setStyle('PRIMARY')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('dis2')
                        .setLabel('-->')
                        .setStyle('PRIMARY')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('dis3')
                        .setLabel('end interaction')
                        .setStyle('SECONDARY')
                        .setDisabled(true),
                );
            let string = interaction.options.getString('addr');
            let newstring = string.split("@")
            let test = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${newstring[0]}&domain=${newstring[1]}`)
            test = test.data
            const amnt = test.length
            let date = test[0].date + " +0100"
            date = parseInt((new Date(date).getTime() / 1000).toFixed(0))
            let embed = new MessageEmbed()
                .setColor('#5a1da1')
                .setAuthor({name: `1SecMail (1/${amnt})`, iconURL: 'https://autumncord.xyz/assets/images/mail.png'})
                .setDescription(`from: \`${test[0].from}\`\nsubject: **${test[0].subject}**\nsent <t:${date}:R>`)
                .setFooter({text: `email ID: ${test[0].id}`})
            if (amnt > 1) {
                await interaction.reply({
                    content: `viewing emails for inbox \`${string}\``,
                    embeds: [embed],
                    components: [row]
                });
                const filter = i => i.customId === String(customId1) || i.customId === String(customId2) || i.customId === String(customId3) && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({filter, time: 60000});
                let page = 1
                collector.on('collect', async i => {
                    await i.deferUpdate()
                    if (i.customId === String(customId3)) {
                        await interaction.editReply({components: [disabledRow]})
                    } else if (i.customId === String(customId1)) {
                        page += 1
                    } else if (i.customId === String(customId2)) {
                        page -= 1
                    }
                    if (page < 1) {
                        page = amnt
                    } else if (page > amnt) {
                        page = 1
                    }
                    let date = test[parseInt(page - 1)].date + " +0100"
                    date = parseInt((new Date(date).getTime() / 1000).toFixed(0))
                    let embed = new MessageEmbed()
                        .setColor('#5a1da1')
                        .setAuthor({
                            name: `1SecMail (${page}/${amnt})`,
                            iconURL: 'https://autumncord.xyz/assets/images/mail.png'
                        })
                        .setDescription(`from: \`${test[parseInt(page - 1)].from}\`\nsubject: **${test[parseInt(page - 1)].subject}**\nsent <t:${date}:R>`)
                        .setFooter({text: `email ID: ${test[parseInt(page - 1)].id}`})
                    await interaction.editReply({content: `viewing emails for inbox \`${string}\``, embeds: [embed]})
                });
                collector.on('end', collected => {
                    console.log(`Collected ${collected.size} items`)
                    interaction.editReply({components: [disabledRow]})
                });
            } else if (amnt === 1) {
                await interaction.reply({content: `viewing emails for inbox \`${string}\``, embeds: [embed]})
            } else {
                await interaction.reply(`No emails have been sent to \`${string}\` yet.`)
            }
        } else if (interaction.options.getSubcommand() === 'read') {
            let string1 = interaction.options.getString('addr');
            let newstring = string1.split("@")
            let string2 = interaction.options.getString('id');
            let test = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${newstring[0]}&domain=${newstring[1]}&id=${string2}`)
            test = test.data
            let date = test.date + " +0100"
            date = parseInt((new Date(date).getTime() / 1000).toFixed(0))
            let body
            // noinspection JSUnresolvedVariable
            if (test.textBody !== "\n") {
                // noinspection JSUnresolvedVariable
                body = test.textBody
            } else {
                body = "email has no content"
            }
            let embed = new MessageEmbed()
                .setColor('#5a1da1')
                .setAuthor({name: `1SecMail`, iconURL: 'https://autumncord.xyz/assets/images/mail.png'})
                .setDescription(`from: \`${test.from}\`\nsubject: **${test.subject}**\nsent <t:${date}:R>\n\`\`\`html\n${body}\n\`\`\``)
            await interaction.reply({content: `viewing email \`${string2}\` for inbox \`${string1}\``, embeds: [embed]})
        }
	},
};