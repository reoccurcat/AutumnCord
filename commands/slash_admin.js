const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, ownerId, guildId } = require('../config.json');
const fs = require('fs');
const rest = new REST({ version: '9' }).setToken(token);
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
		.setDescription('Bot owner exclusive commands (do not work yet)')
        .addSubcommand(subcommand =>
            subcommand
                .setName('say')
                .setDescription('Gets the bot to say something')
                .addStringOption(option => option.setName('content').setDescription('What the bot should say').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('reloadglobal')
                .setDescription('Reloads global commands'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('reloadguild')
                .setDescription('Reloads guild commands')
                .addStringOption(option => option.setName('guild').setDescription('What guild the bot should refresh commands for').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('eval')
                .setDescription('Evaluates an expression')
                .addStringOption(option => option.setName('string').setDescription('What the bot should evaluate').setRequired(true))),
	async execute(interaction) {
		if (interaction.member.user.id === ownerId) return await interaction.reply({content: "You are not authorized to do this.", ephemeral: true})
		if (interaction.options.getSubcommand() === 'update') { 
			return
        }
		else if (interaction.options.getSubcommand() === 'say') { 
			const args = interaction.options.getString('content');
			await interaction.channel.send(args)
			await interaction.reply({content: "Success.", ephemeral: true})
        }
		else if (interaction.options.getSubcommand() === 'eval') {
			try {
				// Evaluate (execute) our input
				const args = interaction.options.getString('string');
				const evaled = eval(args);
		  
				// Put our eval result through the function
				// we defined above
				let cleaned = await clean(evaled);
		  
				// Reply in the channel with our result
				cleaned = cleaned.split(token).join('[REDACTED]');
				await interaction.reply({content: `\`\`\`js\n${cleaned}\n\`\`\``, ephemeral: true});
			  } catch (err) {
				err = String(err).split(token).join('[REDACTED]');
				// Reply in the channel with our error
				await interaction.reply({content: `\`ERROR\` \`\`\`xl\n${err}\n\`\`\``, ephemeral: true});
			  }
		}
		else if (interaction.options.getSubcommand() === 'reloadglobal') { 
			await interaction.reply('Started refreshing application (/) commands.')	
			const commands = [];
			const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.mjs'));
			for (const file of commandFiles) {
				if (file.includes("slash")) {
					var command = require(`./commands/${file}`);
					commands.push(command.data.toJSON());
				}
			}		
			(async () => {
				await rest.put(
					Routes.applicationCommands(clientId),
					{ body: commands },
				);
			})();
			await interaction.editReply('Successfully reloaded application (/) commands.');
        }
	},
};