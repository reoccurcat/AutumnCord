const { botVersion } = require('../globalconfig.json');

module.exports = {
	name: 'ready',
//	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);;
		client.user.setActivity(`v${botVersion} | autumncord.xyz`);
	},
};