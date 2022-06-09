let config = process.env

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity(`v${config.BOT_VERSION} | autumncord.xyz`);
	},
};