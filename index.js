// Require the necessary discord.js classes
const fs = require('fs');
const { Collection, Client, Intents, MessageEmbed } = require('discord.js');
const { token, ownerId } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

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

client.on('messageCreate', message => {
	if (message.author.id === client.id) return;
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		const embed = new MessageEmbed()
			.setAuthor({name: 'command error report'})
			.setDescription(`there was an error when a command was run.\ncommand name: \`${interaction.commandName}\`\ncommand initiator: \`${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id})\`\nerror:\n\`\`\`js\n${error}\n\`\`\``)
			.setColor('#FF0000')
		await interaction.reply({content: "There was an error running this command. The error has been sent to the bot developer.", ephemeral: true});	
		const user = await interaction.client.users.fetch(ownerId)
		await user.send({embeds: [embed]})
	}
});

// Login to Discord with your client's token
client.login(token);
