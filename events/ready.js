const { botVersion } = require('../globalconfig.json');
const axios = require('axios')

global.resdata = ""

function lol() {
	axios
		.post('https://httpbin.org/post', {
			todo: 'Buy the milk'
		})
		.then(res => {
			console.log(res.data)
			const resdata = res
		})
		.catch(error => {
			console.error(error)
		})
}

module.exports = {
	name: 'ready',
//	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity(`v${botVersion} | autumncord.xyz`); 
		lol()
		console.log(`test:\n${global.resdata}`)
	},
};