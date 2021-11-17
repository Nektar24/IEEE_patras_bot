const { GoogleSpreadsheet } = require("google-spreadsheet");
const { promisify } = require("util");
const factor = require("../extra/factor.js");
const nek = require("../extra/user-default.json");
const ex = require("../extra/extra-default.json");

const creds = require("./client_secret.json");

// this is just an id of a spreadsheet, it's not a password or a token.
const doc = new GoogleSpreadsheet("1SryrmalzCt8KuTd0OgO4dK8QLo9Ku7BAx9Ekb4z0_bg");

module.exports.resetSpreadsheet = async function (){
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.clear();
    let header = factor.getheader(nek,ex,[],true);
    sheet.setHeaderRow(Object.keys(header));
}

module.exports.addrowtoSpreadsheet = async function (row){
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]


    await sheet.addRow(row);
}

module.exports.updateSpreadsheet = async function (rows){
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRows(rows);
}
