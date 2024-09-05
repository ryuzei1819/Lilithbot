const moment = require("moment-timezone");

let handler = async function (m, { conn }) {
    const user = m.sender;
    const users = global.db.data.users;

    // Check if the user exists in the database
    if (typeof users[user] === 'undefined') {
        return conn.reply(m.chat, '🚩 Pengguna tidak ada di dalam data base', m);
    }

    // Retrieve user data
    const userData = users[user];
    const saldo = userData.saldo || 0; // Default to 0 if saldo is not set

    // Format the response message
    const message = `*CEK SALDO*\n\n` +
        `• Nama: ${userData.name || `@${user.split('@')[0]}`} (${user.split('@')[0]})\n` +
        `• Saldo: ${saldo} `; // You can append currency or other details here

    // Send the response
    conn.reply(m.chat, message, m);
};

handler.help = ["ceksaldo"];
handler.command = ["ceksaldo"];
handler.tags = ["main"];

module.exports = handler;