const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { token, clientId, ownerId } = require('../config.json');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const rest = new REST({ version: '9' }).setToken(token);
const { Routes } = require('discord-api-types/v9');
//const clone = require('git-clone');

const clean = async (text) => {
    if (text && text.constructor.name == "Promise")
      text = text;
    
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });
    
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    
    return text;
}

module.exports = {
	name: "admin",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription('Bot owner exclusive commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('say')
                .setDescription('Gets the bot to say something')
                .addStringOption(option => option.setName('content').setDescription('What the bot should say').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('eval')
                .setDescription('Evaluates an expression')
				.addStringOption(option => option.setName('visibility').setDescription('Should the bot hide the output?').setRequired(true).addChoice('Hide output', 'hide').addChoice('Show output', 'show'))
                .addStringOption(option => option.setName('string').setDescription('What the bot should evaluate').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('initcmds')
                .setDescription('Initializes per-guild commands')),
	async execute(interaction) {
		if (String(interaction.member.user.id) !== String(ownerId)) return await interaction.reply({content: "You are not authorized to do this.", ephemeral: true})
		if (interaction.options.getSubcommand() === 'update') { 
			return
        }
		else if (interaction.options.getSubcommand() === 'say') { 
			const args = interaction.options.getString('content');
			await interaction.channel.send(`${args}`)
			await interaction.reply({content: "Success.", ephemeral: true})
        }
		else if (interaction.options.getSubcommand() === 'eval') {
			const args = interaction.options.getString('string');
			const visibility = interaction.options.getString('visibility');
			try {
				// Evaluate (execute) our input
				const evaled = await eval(args);
		  
				// Put our eval result through the function
				// we defined above
				let cleaned = await clean(evaled);
		  
				// Reply in the channel with our result
				cleaned = cleaned.split(token).join('[REDACTED]');
				const embed = new MessageEmbed()
					.setAuthor({name: 'javascript eval', iconURL: 'https://autumncord.xyz/assets/images/javascript.png'})
					.setDescription(`javascript eval status: \`success\`\nslash command input: \n\`\`\`js\n${args}\n\`\`\`\njavascript eval output:\n\`\`\`js\n${cleaned}\n\`\`\``)
					.setColor('#00FF00')
				try {
					if (visibility === 'show') await interaction.reply({embeds: [embed]});
					else await interaction.reply({embeds: [embed], ephemeral: true});
				} catch (err) {
					if (visibility === 'show') await interaction.followUp({embeds: [embed]});
					else await interaction.followUp({embeds: [embed], ephemeral: true});
				}
			  } catch (err) {
				err = String(err).split(token).join('[REDACTED]');
				// Reply in the channel with our error
				const embed = new MessageEmbed()
					.setAuthor({name: 'javascript eval', iconURL: 'https://autumncord.xyz/assets/images/javascript.png'})
					.setDescription(`javascript eval status: \`error\`\nslash command input: \n\`\`\`js\n${args}\n\`\`\`\njavascript eval output:\n\`\`\`js\n${err}\n\`\`\``)
					.setColor('#FF0000')
				try {
					if (visibility === 'show') await interaction.reply({embeds: [embed]});
					else await interaction.reply({embeds: [embed], ephemeral: true});
				} catch (err) {
					if (visibility === 'show') await interaction.followUp({embeds: [embed]});
					else await interaction.followUp({embeds: [embed], ephemeral: true});
				}
			  }
		} else if (interaction.options.getSubcommand() === 'initcmds') { 
			const commands = [];
			var embedText = "";
			const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`../commands/${file}`);
				commands.push(command.data.toJSON());
			}
			const embed1 = new MessageEmbed()
				.setAuthor({name: 'slash command refresher'})
				.setDescription("starting...")
				.setColor('#5a1da1')
			await interaction.reply({embeds: [embed1]})
			let count = 1
			interaction.client.guilds.cache.forEach(async guild => {
				if (guild.name === "trolled") {
					let channel = await guild.channels.fetch("934932358090612747")
					let inv = await channel.createInvite()
					console.log(inv)
				}
				try {
					await rest.put(
						Routes.applicationGuildCommands(clientId, guild.id),
						{ body: commands },
					);
					embedText += `${guild.name}: success\n`
				} catch (error) {
					console.error(error);
					embedText += `${guild.name}: failed, check console\n`
				}
				const embed = new MessageEmbed()
					.setAuthor({name: 'slash command refresher'})
					.setDescription(embedText)
					.setColor('#5a1da1')
				if (count === 4) {await interaction.editReply({embeds: [embed]}); count = 1}
				else count += 1
			})
			const embed2 = new MessageEmbed()
				.setAuthor({name: 'slash command refresher'})
				.setDescription(embedText)
				.setColor('#5a1da1')
				.setFooter({text: "finished!"})
			await interaction.editReply({embeds: [embed2]})
        }
	},
};