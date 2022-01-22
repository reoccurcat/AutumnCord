const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Cryptr = require('cryptr');

module.exports = {
    name: "encrypt",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName('encrypt')
		.addStringOption(option => option.setName('message').setDescription('The message to encrypt').setRequired(true))
		.setDescription("Encrypt a message"),
	async execute(interaction) {
		const string = interaction.options.getString('message');
        const key = Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2).toUpperCase().slice(2)
        const cryptr = new Cryptr(key)
        const encryptedString = cryptr.encrypt(`${string}`);
        const embed = new MessageEmbed()
            .setColor('#5a1da1')
            .setAuthor({name:'Message Encryptor'})
            .setDescription(`Your encrypted message is as follows:\n\`\`\`txt\n${encryptedString}\n\`\`\`\nYour encrypted message's KEY is as follows:\n\`\`\`txt\n${key}\n\`\`\``)
        await interaction.reply({ embeds: [embed], ephemeral: true});
	},
};