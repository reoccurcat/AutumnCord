const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const pingEmbed = new MessageEmbed()
			.setColor('#5a1da1')
			.setTitle('Ping')
			.setAuthor({name:interaction.client.user.username, iconURL:interaction.client.user.avatarURL()})
			.setDescription(` 🏓 Pong!\n 🖥 API Latency is ${Math.round(interaction.client.ws.ping)}ms`)
			.setFooter({name:`Requested by ${interaction.user.username}`, iconURL:interaction.user.avatarURL({ dynamic: true })})
		await interaction.reply({ embeds: [pingEmbed] });
	},
};
