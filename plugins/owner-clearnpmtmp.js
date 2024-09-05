/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, usedPrefix, command }) => {
    let cacheDir = path.join(__dirname, '../.cache');
    let npmDir = path.join(__dirname, '../.npm');

    // Function to delete a directory and its contents
    const deleteDir = (dir) => {
        return new Promise((resolve, reject) => {
            fs.rm(dir, { recursive: true, force: true }, (err) => {
                if (err) {
                    console.error(`Error deleting directory: ${err}`);
                    reject(`❗️ An error occurred: ${err.message}`);
                }
                resolve(`✅ Directory ${dir} cleared successfully.`);
            });
        });
    };

    try {
        let messages = [];
        if (fs.existsSync(cacheDir)) {
            messages.push(await deleteDir(cacheDir));
        } else {
            messages.push('🚫 .cache directory does not exist.');
        }
        if (fs.existsSync(npmDir)) {
            messages.push(await deleteDir(npmDir));
        } else {
            messages.push('🚫 .npm directory does not exist.');
        }

        m.reply(messages.join('\n'));
    } catch (error) {
        console.error(error);
        m.reply(`❗️ An error occurred: ${error.message}`);
    }
};

handler.help = ['clearcache', 'clearnpm'];
handler.tags = ['owner'];
handler.command = /^(clear(cache|npm|allcaches))$/i;
handler.owner

module.exports = handler;