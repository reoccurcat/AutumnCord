const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Get the bot's ping"),
	async execute(interaction) {
		const ogtime = new Date().getTime()
        await interaction.reply('Hold on, pinging now...');
		const pingEmbed = new MessageEmbed()
			.setColor('#5a1da1')
			.setTitle('Ping')
			.setDescription(`🌐 API Latency is ${Math.round(interaction.client.ws.ping)}ms\n🖥️ Bot Latency is ~${new Date().getTime() - ogtime}ms`)
        await interaction.editReply({content: '🏓 Pong!', embeds: [pingEmbed]});
	},
};