const Discord = require('discord.js');
const {token} = require('./auth.json');
const {prefix, channelName} = require('./config.json');
const fs = require('fs');
const commandFiles = fs.readdirSync('commands').filter(f=>f.endsWith('js'));
const clientCommands = [];
const commands =[];
const serverCommand = require('./common/serverCommon');
let startTime;
const commandRegex = /[!]\d+[d]\d+/g;
const digitsRegex = /\d+/g;

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    clientCommands[command.name.toLowerCase()]= command;
    commands.push(command);
}

const bot = new Discord.Client();

bot.on('ready', ()=> {
    startTime = new Date();
})
bot.on('message', async message => {
    let messageText = message.content;
    if(messageText.match(commandRegex))
    {
        let newNums = messageText.match(digitsRegex);
        if(newNums.length === 2) {
            messageText = `!d.${newNums[0]}.${newNums[1]}`;
        }
    }
    if (messageText.substring(0, 1) === prefix) {
        let args
        if(messageText.toLowerCase().startsWith('!pick1'))
        {
            args=messageText.substring(1).split(/ (.+)/);
        }else {
            args = messageText.substring(1).split('.');
        }
        let cmd = "";
        if (messageText.toLocaleLowerCase().startsWith("!8ball")) {
            cmd = "8ball";
        } else {
            cmd = args[0].toLowerCase();
        }
        if (cmd.startsWith('uptime')) {
            args[1] = startTime;
        }
        if (cmd.startsWith('help')) {
            args[args.length] = commands;
        }

        if (!clientCommands[cmd]) return;

        try {
            clientCommands[cmd].execute(args, message);
        } catch (error) {
            console.error(error);
            message.channel.send("Error occurred.");
        }
    }});

// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.systemChannel;

    if(!channel) return;
    if(channel.type !== "text") return;
    if(channel.name !== channelName) return;
    // Send the message, mentioning the member
    channel.send(`Hello ${member} & Welcome, into my Kingdom`);
    serverCommand.welcomeBot(channel);
});

bot.login(token);