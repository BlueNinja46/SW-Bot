const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("SW Bot is running!");
})

app.get("/", (req, res) => {
  res.send("Bot is Currently Active");
})

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.login(process.env.token);

// Ping
const targetChannelId = '952672470995980350';

client.on('messageCreate', (message) => {
  // Check if the message was sent in the target channel
  if (message.channel.id === targetChannelId) {
    // Set the last message time to the current time
    lastMessageTime = Date.now();
    const date = new Date(lastMessageTime);
    const options = {
      timeZone: 'America/Guyana',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
    console.log(`Last message time updated to ${formattedTime}`);
    // Set up an interval that runs every 45 minutes and checks if it has been 45 minutes since the last message was sent
    interval = setInterval(() => checkIdle(message), 2700000);
  }
});

function checkIdle(message) {
  // Check if the message was sent in the target channel
  if (message.channel.id === targetChannelId) {
    // Check if it has been 45 minutes since the last message was sent
    if (Date.now() - lastMessageTime > 2700000) {
      // If it has been 45 minutes, send a message or ping a role
      message.channel.send('<@&1020776137644834826>')
        .catch(error => console.error(error)); // catch and log any errors
      // Stop the interval from running
      clearInterval(interval);
      console.log('Interval cleared');
    }
  }
}

client.login(process.env.token);
