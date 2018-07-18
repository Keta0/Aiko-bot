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
                    title: "I'm an embed!", // Title of the embed
                    description: "Here is some more info, with **awesome** formatting.\nPretty *neat*, huh?",
                    author: { // Author property
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    color: 0x008000, // Color, either in hex (show), or a base-10 integer
                    fields: [ // Array of field objects
                        {
                            name: "Some extra info.", // Field title
                            value: "Some extra value.", // Field
                            inline: true // Whether you want multiple fields in same line
                        },
                        {
                            name: "Some more extra info.",
                            value: "Another extra value.",
                            inline: true
                        }
                    ],
                    footer: { // Footer text
                        text: "Created with Eris."
                    }
                }
            });
		}
	}
});

bot.connect();
