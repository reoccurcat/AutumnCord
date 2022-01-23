const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { ownerId } = require('../config.json');

module.exports = {
	name: "serveradmin",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName('serveradmin')
		.setDescription("Server owner only commands")
		.addSubcommand(subcommand =>
			subcommand
				.setName('initperms')
				.setDescription('Initializes slash command permissions automatically')),
	async execute(interaction) {
//		if (interaction.guild.ownerId != interaction.user.id || interaction.user.id != ownerId) return await interaction.reply({ content: "You are not authorized to do this.", ephemeral: true })
		if (interaction.options.getSubcommand() === 'initperms') {
			let customId = Math.floor(Math.random() * 10000)
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId(String(customId))
						.setLabel('Yes, proceed')
						.setStyle('DANGER'),
					new MessageButton()
						.setCustomId('no')
						.setLabel('No, cancel')
						.setStyle('SECONDARY'))
			const disabledRow = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId(String(customId))
						.setLabel('Yes, proceed')
						.setStyle('DANGER')
						.setDisabled(true),
					new MessageButton()
						.setCustomId('no')
						.setLabel('No, cancel')
						.setStyle('SECONDARY')
						.setDisabled(true))
			let embed = new MessageEmbed()
				.setColor('#FF0000')
				.setTitle("WARNING")
				.setDescription(`This will reset all of this guild's slash command permissions.\nDo you want to continue?`)
			await interaction.reply({components: [row], embeds: [embed]})
			const filter = i => i.customId === String(customId) || i.customId === "no" && i.user.id === interaction.user.id;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
			let embed2 = new MessageEmbed()
				.setColor('#5a1da1')
				.setTitle("Resetting...")
				.setDescription(`The permission reset is in progress...`)
			collector.on('collect', async i => {
				if (i.customId === customId) {
					await interaction.editReply({components: [disabledRow], embeds: [embed2]})
					const bruh = await interaction.client.application.commands.fetch().then(async commands => {
						for (var command of commands.toJSON()) {
							console.log("Made it thus far")
							if (command.name === "kick") {
								const permissions = [
									{
										id: '932292759916777523',
										type: 'ROLE',
										permission: true,
									},
								];								
								const command = await interaction.client.application.commands.fetch(command.id)
								await command.permissions.add({ permissions });
								await interaction.followUp("Done.")
							}
						}
					})
					console.log(bruh)
				}
				else await interaction.editReply({components: [disabledRow], embeds: [embed]})
			});
			collector.on('end', async () => {
				await interaction.editReply({components: [disabledRow], embeds: [embed]})
			});
		}
	},
};