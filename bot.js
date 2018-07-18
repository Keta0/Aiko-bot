require('dotenv').config();
const Eris = require("eris");

var bot = new Eris(process.env.TOKEN);

var prefix = "/";

bot.on('ready', () => {
    console.log('Logged as ' + bot.user.username);
});

bot.on('messageCreate', (msg) => {
	var isBot = msg.author.bot;
	if (isBot) return;
	
	if (msg.content.substring(0, 1) == "/") {
		var args = msg.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        
        // Ping Command
        if (cmd == "ping") {
        	bot.createMessage(msg.channel.id, "Pong!");
		} 
		
		// Info
		else if (cmd == "info") {
			bot.createMessage(msg.channel.id, {
                embed: {
                    title: "Aiko-Bot | Information!",
                    description: `Info about Aiko-Bot\n
                                  **Node Version:** ` + process.version + `\n
                                  **Eris Version:** Eris 0.8.6\n
                                  **Operating System** ` + process.platform + `\n
                                  **Memory Usage:** ` + (process.memoryUsage().heapUsed / 1024 / 1024) + `MB\n
                                  **Uptime:** ` + convertMs(bot.uptime) + `\n
                                  **Prefix:** ` + prefix + `\n
                                  **Bot Author:** Ferdian#3422`,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    footer: {
                    	icon_url: msg.author.AvatarURL,
                        text: "Command issued by" + msg.author.username
                    }
                }
            });
		}
	}
});

bot.connect();

/////////

function convertMs(millisec) {
    var seconds = (millisec / 1000).toFixed(1);
    var minutes = (millisec / (1000 * 60)).toFixed(1);
    var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) {
        return seconds + " Sec";
    } else if (minutes < 60) {
        return minutes + " Min";
    } else if (hours < 24) {
        return hours + " Hrs";
    } else {
        return days + " Days"
    }
}
