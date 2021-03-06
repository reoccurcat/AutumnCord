const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "quickpoll",
	type: "slash",
	data: new SlashCommandBuilder()
        .setName('quickpoll')
        .setDescription('A poll with either thumbs up/down or up/downvote reactions.')
        .addStringOption(option => option.setName('reaction_style').setDescription('What should the reactions look like?').setRequired(true).addChoices(
            {name: 'Upvotes/Downvotes', value: 'votes'}, {name: 'Thumbs Up/Thumbs Down', value: 'thumbs'}))
        .addStringOption(option => option.setName('question').setDescription('What should people vote on?').setRequired(true)),
	async execute(interaction) {
        const questionString = interaction.options.getString('question');
        const reactionStyle = interaction.options.getString('reaction_style');
        const pollEmbed = new MessageEmbed()
            .setColor('#5a1da1')
            .setDescription(`<@!${interaction.user.id}> is asking:\n\n**${questionString}**`)
            .setFooter({text:'React to vote!'})
        const message = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
        if (reactionStyle === "votes") {
            await message.react("884500238755332187")
            await message.react("884500238704980069")
        } else if (reactionStyle === "thumbs") {
            await message.react("👍")
            await message.react("👎")
        }
    }
}