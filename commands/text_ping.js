const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
    type: "text",
	description: 'Ping!',
	execute(message) {
		const pingEmbed = new MessageEmbed()
			.setColor('#5a1da1')
			.setTitle('Ping')
			.setDescription(` 🏓 Pong!\n 🖥 API Latency is ${Math.round(message.client.ws.ping)}ms`)
		message.reply({ embeds: [pingEmbed] });
	},
};
