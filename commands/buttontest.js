const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('primary')
            .setLabel('Primary')
            .setStyle('PRIMARY'),
    );

const embed = new MessageEmbed()
    .setColor('#5a1da1')
    .setTitle('Here is an embed!')
    .setURL('https://rc.reoccur.tech')
    .setDescription('The link goes to the bot website lol');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buttontest')
		.setDescription('Test command for button'),
	async execute(interaction) {
		await interaction.reply({ content: 'Here is a button!', components: [row], embeds: [embed] });
	},
};