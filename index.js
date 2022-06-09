// Require the necessary discord.js classes
// noinspection JSUnresolvedFunction

const fs = require('fs');
const { Collection, Client, Intents, MessageEmbed } = require('discord.js');
const discordModals = require('discord-modals')

require('dotenv').config();
let config = process.env

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
discordModals(client);

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();
client.cooldowns = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command)
}

// client.on('messageCreate', message => {
//	if (message.author.id === client.id) return;
// });

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	// noinspection JSUnresolvedVariable
	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		// noinspection JSUnresolvedVariable
		const embed = new MessageEmbed()
			.setAuthor({name: 'command error report'})
			.setDescription(`there was an error when a command was run.\ncommand name: \`${interaction.commandName}\`\ncommand initiator: \`${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id})\`\n\`\`\`js\n${error}\n\`\`\``)
			.setColor('#FF0000')
		// noinspection JSUnresolvedFunction
		await interaction.reply({content: "There was an error running this command. The error has been sent to the bot developer.", ephemeral: true});
		const user = await interaction.client.users.fetch(config.OWNER_ID)
		await user.send({embeds: [embed]})
	}
});

// noinspection JSUnresolvedVariable
client.on('modalSubmit', async (modal) => {
	if (modal.customId === 'embedEditModal') {
		const title = modal.getTextInputValue('title')
		const description = modal.getTextInputValue('description')
		const channelId = modal.getTextInputValue('channelId')
		const messageId = modal.getTextInputValue('messageId')
		const banner = modal.getTextInputValue('banner')
		// noinspection JSUnresolvedVariable
		const extension = global.extension
	  	const embed = new MessageEmbed()
			.setTitle(title)
			.setDescription(description)
		if (banner !== undefined) embed.setImage(banner)
		// noinspection JSCheckFunctionSignatures
		if (extension !== true) {
			embed.setAuthor({name: modal.guild.name, iconURL: modal.guild.iconURL()})
			embed.setTitle(title)
			embed.setDescription(description)
		} else {
			// noinspection JSCheckFunctionSignatures
			embed.addFields({ name: title, value: description })
		}
		const channel1 = await modal.guild.channels.fetch(String(channelId))
		let message1 = await channel1.messages.fetch(String(messageId))
		await modal.deferReply({ephemeral: true})
		await message1.edit({embeds: [embed]})
		// noinspection JSCheckFunctionSignatures
		await modal.followUp({text:"edited.", ephemeral: true})
	} else if (modal.customId === 'embedModal') {
		// noinspection JSUnresolvedVariable
		const role = global.role
		const title = modal.getTextInputValue('title')
		const description = modal.getTextInputValue('description')
		const channelId = modal.getTextInputValue('channelId')
		const banner = modal.getTextInputValue('banner')
		// noinspection JSUnresolvedVariable
		const extension = global.extension
	  	const embed = new MessageEmbed().setColor('PURPLE')
		if (banner !== undefined) embed.setImage(banner)
		if (extension !== true) {
			embed.setAuthor({name: modal.guild.name, iconURL: modal.guild.iconURL()})
			embed.setTitle(title)
			embed.setDescription(description)
		} else {
			// noinspection JSCheckFunctionSignatures
			embed.addFields({ name: title, value: description })
		}
		const channel1 = await modal.guild.channels.fetch(String(channelId))
		await modal.deferReply({ephemeral: true})
		// noinspection JSUnresolvedVariable
		if (global.role !== null) await channel1.send({content: `<@&${role.id}>`, embeds: [embed]})
		else await channel1.send({embeds: [embed]})
		// noinspection JSCheckFunctionSignatures
		await modal.followUp({text: "sent.", ephemeral: true})
	}
});

// Login to Discord with your client's token
client.login(config.TOKEN);
