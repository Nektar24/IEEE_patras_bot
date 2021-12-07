const accessSpreadsheet = require("../spreadsheet/spreadsheet.js");

module.exports = {
	name: 'reset',
	description: 'κανει reset τον excel server',
	permissions : 'admin',
    async execute(message,args) {  
        //await message.react('🕒');
        await accessSpreadsheet.resetSpreadsheet();
        //await message.react('👍');
        //await message.delete();
    }
};