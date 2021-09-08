const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.addUserOption(option => option.setName('target').setDescription('The user'))
		.setDescription("Get a user's avatar"),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (user) {
			const avatarEmbed = new MessageEmbed()
				.setColor('#5a1da1')
				.setAuthor(`${user.username}'s Avatar`)
				.setFooter(`Requested by ${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
				.setDescription(`[PNG](${user.avatarURL({ format: 'png' })}) | [JPG](${user.avatarURL({ format: 'jpg' })}) | [GIF](${user.avatarURL({ format: 'gif' })})`)
				.setImage(user.avatarURL({ dynamic: true }))
			await interaction.reply({ embeds: [avatarEmbed] })
		} else {
			const avatarEmbed = new MessageEmbed()
				.setColor('#5a1da1')
				.setAuthor(`${interaction.user.username}'s Avatar`)
				.setDescription(`[PNG](${interaction.user.avatarURL({ format: 'png' })}) | [JPG](${interaction.user.avatarURL({ format: 'jpg' })}) | [GIF](${interaction.user.avatarURL({ format: 'gif' })})`)
				.setImage(interaction.user.avatarURL({ dynamic: true }))
				.setFooter(`Requested by ${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
			await interaction.reply({ embeds: [avatarEmbed] })
		}
	},
};