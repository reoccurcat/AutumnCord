const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	name: "info",
	type: "slash",
	data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('target');
			const member = interaction.options.getMember('target');
			if (user) {
				let creationTime = parseInt((new Date(`${user.createdAt}`).getTime()/1000).toFixed(0))
				let joinTime = parseInt((new Date(`${member.joinedAt}`).getTime()/1000).toFixed(0))
				let userDisplayName = ""
				if (String(member.nickname) == "undefined") {
					userDisplayName = "No Nickname"
				} else if (String(member.nickname) == "null") {
					userDisplayName = "No Nickname"
				} else {
					userDisplayName = member.nickname
				}
				const userEmbed = new MessageEmbed()
					.setColor('#5a1da1')
					.setAuthor({name:`${user.username}#${user.discriminator}`, iconURL:user.avatarURL({ dynamic: true })})
					.setDescription(`User ID: \`${user.id}\`\nDisplay Name: \`${userDisplayName}\`\nGuild Join Date: <t:${joinTime}:R> on <t:${joinTime}:F>\nCreation Date: <t:${creationTime}:R> on <t:${creationTime}:F>`)
					.setThumbnail(user.avatarURL({ dynamic: true }))
				await interaction.reply({ embeds: [userEmbed] });
			} else {
				let creationTime = parseInt((new Date(`${interaction.user.createdAt}`).getTime()/1000).toFixed(0))
				let joinTime = parseInt((new Date(`${interaction.member.joinedAt}`).getTime()/1000).toFixed(0))
				let userDisplayName = ""
				if (String(interaction.member.nickname) == "undefined") {
					userDisplayName = "No Nickname"
				} else if (String(interaction.member.nickname) == "null") {
					userDisplayName = "No Nickname"
				} else {
					userDisplayName = interaction.member.nickname
				}
				const userEmbed = new MessageEmbed()
					.setColor('#5a1da1')
					.setAuthor({name:`${interaction.user.username}#${interaction.user.discriminator}`, iconURL:interaction.user.avatarURL({ dynamic: true })})
					.setDescription(`User ID: \`${interaction.user.id}\`\nDisplay Name: \`${userDisplayName}\`\nGuild Join Date: <t:${joinTime}:R> on <t:${joinTime}:F>\nCreation Date: <t:${creationTime}:R> on <t:${creationTime}:F>`)
					.setThumbnail(interaction.user.avatarURL({ dynamic: true }))
				await interaction.reply({ embeds: [userEmbed] });			}
		} else if (interaction.options.getSubcommand() === 'server') {
			let creationTime = parseInt((new Date(`${interaction.guild.createdAt}`).getTime()/1000).toFixed(0))
			let guildDescription = ""
			if (String(interaction.guild.description) == "null") {guildDescription = "No description set"} else {guildDescription = interaction.guild.description}
			const serverEmbed = new MessageEmbed()
				.setColor('#5a1da1')
				.setAuthor({name:`${interaction.guild.name} (${interaction.guild.id})`, iconURL:interaction.guild.iconURL({ dynamic: true })})
				.setDescription(`Owner: <@!${interaction.guild.ownerId}> (${interaction.user.username}#${interaction.user.discriminator})\n${interaction.guild.memberCount} Members; ${interaction.guild.roles.cache.map(r => r).length} Roles\nCreation Date: <t:${creationTime}:R> on <t:${creationTime}:F>\nDescription:\n\`\`\`\n${guildDescription}\n\`\`\``)
				.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			if (interaction.guild.splashURL()) {
				const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('primary')
						.setLabel('Get Invite Splash')
						.setStyle('PRIMARY'),
				);
				const disabledRow = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('primary')
						.setLabel('Get Invite Splash')
						.setStyle('PRIMARY')
						.setDisabled(true),
				);
				const imageEmbed = new MessageEmbed()
					.setColor('#5a1da1')
					.setAuthor({name:`${interaction.guild.name}'s Invite Splash`, iconURL:interaction.guild.iconURL({ dynamic: true })})
					.setDescription(`[PNG](${interaction.guild.splashURL({ format: 'png' })}) | [JPG](${interaction.guild.splashURL({ format: 'jpg' })})`)
					.setImage(interaction.guild.splashURL({ size: 1024 }))
				await interaction.reply({ embeds: [serverEmbed], components: [row] });
				const filter = i => i.customId === 'primary' && i.user.id === interaction.user.id;
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
				collector.on('collect', async i => {
					if (i.customId === 'primary') {
						await i.reply({ embeds: [imageEmbed] });
						await interaction.editReply({ embeds: [serverEmbed], components: [disabledRow] })
					}
				});
				collector.on('end', collected => console.log(`Collected ${collected.size} items`));
			} else {
				await interaction.reply({ embeds: [serverEmbed] });
			}
		}
	},
};

