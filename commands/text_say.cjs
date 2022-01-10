module.exports = {
	name: 'say',
    type: "text",
	description: 'Get the bot to say something!',
    ownerOnly: true,
	execute(message, args) {
		message.channel.send({ content: args.slice().join(' ').toString() });
	},
};
