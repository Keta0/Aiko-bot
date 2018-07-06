const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});

client.login("NDY0NjE2NzA4MDAzMzMyMTE2.DiB2bw.6YWF7u-NI9hb8C_d2DDob7FPGJI");
