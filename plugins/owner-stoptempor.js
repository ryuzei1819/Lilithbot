const fs = require('fs');
const path = require('path');
const { removeSession, getSession } = require('../lib/activesession');

const temporFilePath = path.join(__dirname, '../src', 'tempor.json');

const saveTemporData = (data) => {
    fs.writeFileSync(temporFilePath, JSON.stringify(data, null, 2));
};

const loadTemporData = () => {
    if (fs.existsSync(temporFilePath)) {
        const data = fs.readFileSync(temporFilePath, 'utf-8');
        if (data.trim().length === 0) {
            return {};
        }
        return JSON.parse(data);
    }
    return {};
};

let temporData = loadTemporData();

const stopTemporHandler = async (m, { args, usedPrefix, command }) => {
    if (!args[0] || !args[1]) {
        throw `• *Example :* ${usedPrefix}${command} +62 889-8087-0067`;
    }

    const countryCode = args[0];
    const nationalNumber = args[1];
    const fullNumber = countryCode + nationalNumber;

    if (!getSession(fullNumber) || !getSession(fullNumber).isRunning) {
        m.reply(`Tidak ada sesi tempor untuk nomor ${fullNumber}.`);
        return;
    }

    // Stop the session
    getSession(fullNumber).stop();

    // Update the status in tempor.json
    if (temporData[fullNumber]) {
        temporData[fullNumber].isRunning = false;
        saveTemporData(temporData);
    }

    // Remove the session
    removeSession(fullNumber);

    m.reply(`Proses tempor untuk nomor ${fullNumber} telah dihentikan.`);
};

stopTemporHandler.help = ['stoptempor'];
stopTemporHandler.tags = ['owner'];
stopTemporHandler.command = /^stoptempor$/i;
stopTemporHandler.rowner = true;
stopTemporHandler.limit = true;
stopTemporHandler.private = false;

module.exports = stopTemporHandler;