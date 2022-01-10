const { prefix } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
    type: "text",
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;
		if (!args.length) {
            const helpEmbed = new MessageEmbed()
                .setColor('#5a1da1')
                .setTitle('Help')
                .setDescription(`Here's a list of all of my commands:\n\n\`${commands.map(command => command.name).join('`, `')}\``)
//                .setFooter({name: "You can send '${prefix}help [command name]' to get info on a specific command!"})
			return message.channel.send({embeds: [helpEmbed]})
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
		if (!command) {
			return message.reply('that\'s not a valid command!');
		}
        let commandstring = ""
        if (command.aliases) commandstring += `**Aliases:** \`${command.aliases.join('`, `')}\`\n`
        if (command.description) commandstring += `**Description:** ${command.description}\n`
        if (command.usage) commandstring += `**Usage:** ${prefix}${command.name} ${command.usage}\`\n`
        if (command.type === "slash") commandstring += `**Command Type:** Slash Command\n`
        else commandstring += `**Command Type:** Text Command\n`
        const helpEmbed = new MessageEmbed()
            .setColor('#5a1da1')
            .setTitle(`Command Info: ${command.name}`)
            .setDescription(commandstring)
		message.channel.send({embeds: [helpEmbed]});
	},
};