const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageAttachment, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "image",
	type: "slash",
	data: new SlashCommandBuilder()
        .setName('image')
        .setDescription('Get images of animals and more')
        .addSubcommand(subcommand =>
            subcommand
                .setName('cat')
                .setDescription('Gets a cat picture')
                .addStringOption(option => option.setName('tag').setDescription('The tag of a cat to get; example: cute')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('dog')
                .setDescription('Gets a dog picture')
                .addStringOption(option => option.setName('breed').setDescription('The breed of a dog to get; example: husky'))),
	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'cat') { 
            await interaction.deferReply()
            const text = interaction.options.getString('tag');
            let customIdImage = Math.floor(Math.random() * 10000)
            let customIdDisable = Math.floor(Math.random() * 10000)
            let url
            var fetchedurl
            const filter = i => i.customId === String(customIdImage) || i.customId === String(customIdDisable) && i.user.id === interaction.user.id
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
            if (text !== null) {url = `https://cataas.com/cat/${text}`} else {url = 'https://cataas.com/cat'}
            await axios.get(url, { responseType: 'arraybuffer' }).then((data) => fetchedurl = data)
            let attachment = new MessageAttachment(fetchedurl.data, 'cat.png');
            let embed = new MessageEmbed()
                .setColor('#5a1da1')
                .setImage('attachment://cat.png')
            const catimage = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(String(customIdImage))
                        .setLabel('Another cat (image)')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId(String(customIdDisable))
                        .setLabel('End interaction')
                        .setStyle('SECONDARY'),
            );
            const catdisabled = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(String(customIdImage))
                        .setLabel('Another cat (image)')
                        .setStyle('SECONDARY')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId(String(customIdDisable))
                        .setLabel('End interaction')
                        .setStyle('SECONDARY')
                        .setDisabled(true)
            );
            await interaction.editReply({content: "Meow!", embeds: [embed], files: [attachment], components: [catimage]})
            collector.on('collect', async i => {
            i.deferUpdate();
            if (i.customId === String(customIdImage)) { 
                if (text !== null) {url = `https://cataas.com/cat/${text}`} else {url = 'https://cataas.com/cat'}
                fetchedurl = await (await axios.get(url, { responseType: 'arraybuffer' })).data
                attachment = new MessageAttachment(fetchedurl, 'cat.png');
                await interaction.editReply({embeds: [embed], files: [attachment], components: [catimage]})
            } else if (i.customId === String(customIdDisable)) {
                await interaction.editReply({embeds: [embed], files: [attachment], components: [catdisabled]})
            }
            });
            collector.on('end', async () => {
            await interaction.editReply({ embeds: [embed], components: [catdisabled] })
        });
    } else if (interaction.options.getSubcommand() === 'dog') { 
        await interaction.deferReply()
        const text = interaction.options.getString('breed');
        let customIdImage = Math.floor(Math.random() * 10000)
        let customIdDisable = Math.floor(Math.random() * 10000)
        let url 
        const filter = i => i.customId === String(customIdImage) || i.customId === String(customIdDisable) && i.user.id === interaction.user.id
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
        if (text !== null) {url = `https://dog.ceo/api/breed/${text}/images/random`} else {url = 'https://dog.ceo/api/breeds/image/random'}
        var fetchedurl
        await axios.get(url, { responseType: 'arraybuffer' }).then((data) => fetchedurl = JSON.parse(data.data))
        let attachment = new MessageAttachment(fetchedurl.message, 'dog.png');
        let embed = new MessageEmbed()
            .setColor('#5a1da1')
            .setImage('attachment://dog.png')
        const dogimage = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(String(customIdImage))
                    .setLabel('Another dog')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId(String(customIdDisable))
                    .setLabel('End interaction')
                    .setStyle('SECONDARY'),
        );
        const dogdisabled = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(String(customIdImage))
                    .setLabel('Another dog')
                    .setStyle('SECONDARY')
                    .setDisabled(true),
                new MessageButton()
                    .setCustomId(String(customIdDisable))
                    .setLabel('End interaction')
                    .setStyle('SECONDARY')
                    .setDisabled(true)
        );
        await interaction.editReply({content: "Woof!", embeds: [embed], files: [attachment], components: [dogimage]})
        collector.on('collect', async i => {
          i.deferUpdate();
          if (i.customId === String(customIdImage)) { 
            if (text !== null) {url = `https://dog.ceo/api/breed/${text}/images/random`} else {url = 'https://dog.ceo/api/breeds/image/random'}
            await axios.get(url, { responseType: 'arraybuffer' }).then((data) => fetchedurl = JSON.parse(data.data))
            attachment = new MessageAttachment(fetchedurl.message, 'dog.png');
            await interaction.editReply({embeds: [embed], files: [attachment], components: [dogimage]})
          } else if (i.customId === String(customIdDisable)) {
            await interaction.editReply({embeds: [embed], files: [attachment], components: [dogdisabled]})
          }
        });
        collector.on('end', async () => {
          await interaction.editReply({ embeds: [embed], components: [dogdisabled] })
      });
      }
    }
}