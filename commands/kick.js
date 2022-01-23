const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "kick",
	type: "slash",
	data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Dummy kick command')
        .addUserOption(option => option.setName('target').setDescription('The user'))
        .setDefaultPermission(false),
	async execute(interaction) {
        const user = interaction.options.getUser('target');
        await interaction.reply(`You wanted to kick ${user.name}#${user.discriminator}`)
    }
}