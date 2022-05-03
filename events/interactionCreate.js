module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		try {
			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction. Interaction ID: ${interaction.id}\n`);
		}
		catch(err) {
			console.log(`${interaction.user.tag} in the bot's DMs triggered an interaction. Interaction ID: ${interaction.id}\n`);
		}
	},
};