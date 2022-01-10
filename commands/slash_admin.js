const { SlashCommandBuilder } = require('@discordjs/builders');
//const { token } = require('../config.json');
//const clone = require('git-clone');

module.exports = {
	name: "admin",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription('Bot owner exclusive commands (do not work yet)')
        .addSubcommand(subcommand =>
            subcommand
                .setName('update')
                .setDescription('Updates the bot')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'update') { 
			return
        }
	},
};