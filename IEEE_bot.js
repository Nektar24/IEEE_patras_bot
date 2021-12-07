const Discord = require("discord.js");
const bot = new Discord.Client;
const config = require("./config.json");
const accessSpreadsheet = require("./spreadsheet/spreadsheet.js");
const factor = require("./extras/factor.js");
const fs = require('fs');
const extra = require("./extras/extra-default.json");
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.on("warn", (info) => console.log(info));
bot.on("error", console.error);
bot.on("ready",()=>{
    console.log("The Bot is online Nek!");
    //bot.commands.get("log").execute();
});

bot.on('guildMemberAdd', member => {
    accessSpreadsheet.addrowtoSpreadsheet(factor.run(member,extra));
});

bot.on("message", async (message) => {
    if (message.author.bot){ return; } //message came from human
    if (message.type == 'dm') { return; } //message is in a server

    if(message.content.startsWith('/')){
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args[0].toLowerCase();

        const command = 
            bot.commands.get(commandName) ||
            bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
        ;
        
        if (!command) return;
        
        try {
            switch (command.permissions){
                case 'user':
                break;
                case 'admin':
                    if (config.adminpermissions.includes(message.author.id)) {
                        command.execute(message, args);
                    }
                    // else message.reply("You are not an admin.");
                break;
            }
            
        } catch (error) {
        console.error(error);
        message.reply("There was an error executing that command.").catch(console.error);
        }
    }

});

bot.login(config.token);