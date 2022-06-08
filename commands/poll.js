const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "poll",
    type: "slash",
	data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('A multiple option poll.')
        .addStringOption(option => option.setName('question').setDescription('What should people vote on?').setRequired(true))
        .addStringOption(option => option.setName('option_1').setDescription('Enter your first option. (required)').setRequired(true))
        .addStringOption(option => option.setName('option_2').setDescription('Enter your second option. (required)').setRequired(true))
        .addStringOption(option => option.setName('option_3').setDescription('Enter your third option.'))
        .addStringOption(option => option.setName('option_4').setDescription('Enter your fourth option.'))
        .addStringOption(option => option.setName('option_5').setDescription('Enter your fifth option.'))
        .addStringOption(option => option.setName('option_6').setDescription('Enter your sixth option.'))
        .addStringOption(option => option.setName('option_7').setDescription('Enter your seventh option.'))
        .addStringOption(option => option.setName('option_8').setDescription('Enter your eighth option.')),
	async execute(interaction) {
        let optionNum = 2
        let finalStr = ""
        const questionString = interaction.options.getString('question');
        const o1 = interaction.options.getString('option_1');
        const o2 = interaction.options.getString('option_2');
        const o3 = interaction.options.getString('option_3');
        const o4 = interaction.options.getString('option_4');
        const o5 = interaction.options.getString('option_5');
        const o6 = interaction.options.getString('option_6');
        const o7 = interaction.options.getString('option_7');
        const o8 = interaction.options.getString('option_8');
        finalStr += `1️⃣: **${o1}**\n2️⃣: **${o2}**\n`
        if (o3 !== null) {
            finalStr += `3️⃣: **${o3}**\n`
            optionNum += 1
        }
        if (o4 !== null) {
            finalStr += `4️⃣: **${o4}**\n`
            optionNum += 1
        }
        if (o5 !== null) {
            finalStr += `5️⃣: **${o5}**\n`
            optionNum += 1
        }
        if (o6 !== null) {
            finalStr += `6️⃣: **${o6}**\n`
            optionNum += 1
        }
        if (o7 !== null) {
            finalStr += `7️⃣: **${o7}**\n`
            optionNum += 1
        }
        if (o8 !== null) {
            finalStr += `8️⃣: **${o8}**\n`
            optionNum += 1
        }
        const pollEmbed = new MessageEmbed()
            .setColor('#5a1da1')
            .setDescription(`<@!${interaction.user.id}> is asking:\n\n**${questionString}**\n\nOptions:\n${finalStr}`)
            .setFooter({text:"React to vote!"})
        const message = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
        await message.react("1️⃣")
        await message.react("2️⃣")
        if (optionNum >= 3) {
            await message.react("3️⃣")
        }
        if (optionNum >= 4) {
            await message.react("4️⃣")
        }
        if (optionNum >= 5) {
            await message.react("5️⃣")
        }
        if (optionNum >= 6) {
            await message.react("6️⃣")
        }
        if (optionNum >= 7) {
            await message.react("7️⃣")
        }
        if (optionNum >= 8) {
            await message.react("8️⃣")
        }
    }
}