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
			.setAuthor(interaction.client.user.username, interaction.client.user.avatarURL())
			.setDescription(` 🏓 Pong!\n 🖥 API Latency is ${Math.round(interaction.client.ws.ping)}ms`)
			.setFooter(`Requested by ${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
		await interaction.reply({ embeds: [pingEmbed] });
	},
};
