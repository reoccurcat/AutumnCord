const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: "kick",
	type: "slash",
	data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Dummy kick command')
        .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)),
	async execute(interaction) {
        const user = interaction.options.getUser('target');
        await interaction.reply(`You wanted to kick ${user.username}#${user.discriminator}`)
    }
}