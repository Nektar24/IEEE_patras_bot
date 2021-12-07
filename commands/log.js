const Discord = require("discord.js");
const bot = new Discord.Client;
const fs = require('fs');
const accessSpreadsheet = require("../spreadsheet/spreadsheet.js");
const factor = require("../extras/factor.js");
const extra = require("../extras/extra-default.json");
const json = require("../data/data.json");

module.exports = {
	name: 'log',
	description: 'καταγράφει όλα τα μέλοι του server σε excel και json αρχειο.',
	permissions : 'admin',
    async execute(message,args) {

        await message.react('🕒');

        let rows = {};
    
        await message.guild.members.fetch();
    
        await message.guild.members.cache.forEach(async member => {
            rows[member.id] = factor.run(member,extra);
            console.log("done information for " + member.user.tag);
        });
    
        await accessSpreadsheet.updateSpreadsheet(Object.values(rows));

        fs.writeFile("./data/data.json", JSON.stringify(rows), (err) => { if (err) console.log(err) });

        await message.react('👍');
        //await message.delete();
    }
};