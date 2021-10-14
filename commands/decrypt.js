const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Cryptr = require('cryptr');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('decrypt')
		.addStringOption(option => option.setName('message').setDescription('The encrypted message').setRequired(true))
        .addStringOption(option => option.setName('key').setDescription('The key used to decrypt').setRequired(true))
		.setDescription("Decrypt a message"),
	async execute(interaction) {
		const string = interaction.options.getString('message');
        const key = interaction.options.getString('key');
        const cryptr = new Cryptr(key)
        const decryptedString = cryptr.decrypt(`${string}`);
        const embed = new MessageEmbed()
            .setColor('#5a1da1')
            .setAuthor('Message Decryptor')
            .setDescription(`Your decrypted message is as follows:\n\n\`\`\`txt\n${decryptedString}\n\`\`\``)
            .setFooter(`Requested by ${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
        await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};