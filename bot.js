require('dotenv').config()

var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: process.env.TOKEN
});

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
	var isBot = bot.servers[bot.channels[channelID].guild_id].members[userID].bot;
	console.log(isBot);
	
	if (isBot) return;
	
	if (message.substring(0, 1) == "/") {
		var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        
        if (cmd == "ping") {
        	bot.sendMessage({
            	to: channelID,
            	message: "pong"
			});
		}
	}
});