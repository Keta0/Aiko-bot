require('dotenv').config();

const Eris = require("eris");
var dbot = require('dbot-js');

var bot = new Eris(process.env.TOKEN);

bot.on('ready', () => {
    console.log('Logged');
});

bot.on('messageCreate', (msg) => {
	//var isBot = bot.servers[bot.channels[channelID].guild_id].members[userID].bot;
	//console.log(isBot);
	
	//if (isBot) return;
	
	if (msg.content.substring(0, 1) == "/") {
		var args = msg.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        
        // Ping Command
        if (cmd == "ping") {
        	bot.createMessage(msg.channel.id, "Pong!");
		} 
		
		/*
		// Chat with dbot
		else if (cmd == "talk") {
			if (args.length == 0) {
				bot.sendMessage({
            		to: channelID,
            		message: "Usage /talk (msg)"
				});
			} else {
				dbot.get_response(args.join(" "), function(err, result) {
					if (!err) {
 				   	bot.sendMessage({
            				to: channelID,
            				message: result
						});
					}
				});
			}
		} */ 
	}
});

bot.connect();
