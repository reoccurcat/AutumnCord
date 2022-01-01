const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('finthechat')
        .setDescription('Get people to pay respects to something.')
        .addStringOption(option => option.setName('input').setDescription('What people should pay respects to')),
	async execute(interaction) {
        let customId = Math.floor(Math.random() * 10000)
        const alreadyreacted = [] 
        const string = interaction.options.getString('input');
        let respects = 0
        const embed = new MessageEmbed()
            .setColor('#5a1da1')
            .setAuthor({name:'F in the Chat'})
            .setDescription(`<@${interaction.user.id}> would like you to pay respects to:\n> ${string}`)
            .setFooter({name:'Press the F button to pay respects.'})
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(String(customId))
                .setLabel('F')
                .setStyle('PRIMARY'),
        );
        const disabledRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('f')
                .setLabel('F')
                .setStyle('SECONDARY')
                .setDisabled(true),
        );
        await interaction.reply({ components: [row], embeds: [embed] });
        const filter = i => i.customId === String(customId);
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
        collector.on('collect', async i => {
            if (i.customId === String(customId)) {
                if (!alreadyreacted.includes(String(i.user.id))) {
                    await i.reply(`${i.user.username} has paid their respects.`);
                    respects += 1
                    alreadyreacted.push(String(i.user.id))
                } else {
                    await i.reply({ content: 'You have already paid respects.', ephemeral: true });
                }
            }
        });
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`),
            interaction.editReply({ embeds: [embed], components: [disabledRow] })
            if (respects == 1) {
                interaction.followUp(`${respects} person has paid their respects.`)
            } else {
            interaction.followUp(`${respects} people have paid their respects.`)
        }});

    }
};