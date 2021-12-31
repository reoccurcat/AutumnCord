module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		try {
			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		}
		catch(err) {
			console.log(`${interaction.user.tag} in the bot's DMs triggered an interaction.`);
		}
		console.log(`Interaction ID: ${interaction.id}\n`)
	},
};