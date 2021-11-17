const fs = require('fs');
const accessSpreadsheet = require("../spreadsheet/spreadsheet.js");
const factor = require("../extra/factor.js");
const extra = require("../extra/extra-default.json");
const json = require("../data/data.json");

module.exports = {
	name: 'log',
	description: 'καταγράφει όλα τα μέλοι του server σε excel και json αρχειο.',
	permissions : 'admin',
    async execute(message,args) {

        //message.react('🕒');

        let rows = {};
    
        await message.guild.members.fetch();
    
        await message.guild.members.cache.forEach(async member => {
            rows[member.id] = factor.run(member,extra);
            console.log("done information for " + member.user.tag);
        });
    
        await accessSpreadsheet.updateSpreadsheet(Object.values(rows));

        fs.writeFile("./data/data.json", JSON.stringify(rows), (err) => { if (err) console.log(err) });

        //message.react('👍');
        message.delete();
    }
};