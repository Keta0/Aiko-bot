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
                    description: getInfo(),
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
		
		// Server Info
		else if (cmd == "serverinfo") {
			bot.createMessage(msg.channel.id, {
                embed: {
                    title: msg.channel.guild.name + " | Information!",
                    description: getServerInfo(msg.channel.guild),
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

function getInfo() {
    var node = "**Node Version:** " + process.version;
    var eris = "**Eris Version:** Eris 0.8.6";
    var os = "**Operating System:** " + process.platform;
    var mem = "**Memory Usage:** " + (process.memoryUsage().heapUsed / 1024 / 1024) + "MB";
    var up = "**Uptime:** " + convertMs(bot.uptime);
    var pre = "**Prefix:** " + prefix;
    var author = "**Author:** Ferdian#3422";
    
    return node + "\n" + eris + "\n" + os + "\n" + mem + "\n" + up + "\n" + pre + "\n" + author;
}

function getServerInfo(guild) {
    var owner = "**Owner:** " + guild.ownerID;
    var id = "**Guild ID:** " + guild.id;
    var region = "**Region:** " + guild.region;
    var channel = "**Channels:** " + guild.channels.size;
    var member = "**Members:** " + guild.members.filter(m => m.bot == false).size + "users and " + guild.members.filter(m => m.bot == true).size + "bots";
    var online = "**Online:** " + guild.members.filter(m => m.status == "online").size ;
    var role = "**Roles:**" + guild.roles.filter(r => 1 == 1).join(", ");
    
    return owner + "\n" + id + "\n" + region + "\n" + channel + "\n" + member + "\n" + online + "\n" + role;
}

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
