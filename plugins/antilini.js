/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require('fs');
const path = require('path');
const antilinkDbPath = path.join(__dirname, '../src/dbAntilink.json');

let antilinkData = {};
if (fs.existsSync(antilinkDbPath)) {
  try {
    antilinkData = JSON.parse(fs.readFileSync(antilinkDbPath));
  } catch (error) {
    console.error('Error parsing dbAntilink.json:', error.message);
  }
} else {
  fs.writeFileSync(antilinkDbPath, JSON.stringify(antilinkData));
}

let handler = async (m, { conn, args, isGroupAdmin, usedPrefix }) => {
  if (!isGroupAdmin) return;

  const groupId = m.chat;

  if (!args[0] || !['antilink1', 'antilink2'].includes(args[0].toLowerCase())) {
    return conn.reply(m.chat, `Gunakan ${usedPrefix}antilink [antilink1/antilink2] on/off`, m);
  }

  const setting = args[0].toLowerCase();
  let replyText = "";

  if (!antilinkData[groupId]) {
    antilinkData[groupId] = {
      antilink1: false,
      antilink2: false,
    };
  }

  if (args[1] === 'on') {
    if (!antilinkData[groupId][setting]) {
      antilinkData[groupId][setting] = true;
      fs.writeFileSync(antilinkDbPath, JSON.stringify(antilinkData, null, 2));
      replyText = `✅ ${setting.toUpperCase()} sudah diaktifkan`;
    } else {
      replyText = `${setting.toUpperCase()} sudah aktif sebelumnya`;
    }
  } else if (args[1] === 'off') {
    if (antilinkData[groupId][setting]) {
      antilinkData[groupId][setting] = false;
      fs.writeFileSync(antilinkDbPath, JSON.stringify(antilinkData, null, 2));
      replyText = `❌ ${setting.toUpperCase()} sudah dimatikan`;
    } else {
      replyText = `${setting.toUpperCase()} sudah tidak aktif sebelumnya`;
    }
  } else {
    replyText = `Gunakan ${usedPrefix}antilink ${setting} on/off`;
  }

  conn.reply(m.chat, `Antilink ${setting.toUpperCase()} diatur untuk grup ini\n\n${replyText}`, m);
};

handler.help = ['antilink [antilink1/antilink2] on/off'];
handler.command = ['antilink'];
handler.tags = ['admin'];

handler.groupRemove = async (m, user) => {
  try {
    await conn.groupRemove(m.chat, [user]);
  } catch (error) {
    console.error('Error removing user from group:', error);
    throw `Gagal mengeluarkan pengguna dari grup: ${error.message}`;
  }
};

handler.antiLink1 = async (m, message) => {
  if (!antilinkData[m.chat]?.antilink1) return;
  
  const regex = /(https:\/\/chat.whatsapp.com\/(?:invite\/)?[0-9A-Za-z]{20,24})/gi;
  if (regex.test(message.text)) {
    await conn.deleteMessage(m.chat, [message.key.id]);
    await conn.reply(m.chat, 'Maaf, link grup WhatsApp tidak diizinkan di sini.', m);
  }
};

handler.antiLink2 = async (m, message) => {
  if (!antilinkData[m.chat]?.antilink2) return;

  const regex = /(https:\/\/chat.whatsapp.com\/(?:invite\/)?[0-9A-Za-z]{20,24})/gi;
  if (regex.test(message.text)) {
    await conn.deleteMessage(m.chat, [message.key.id]);
    await handler.groupRemove(m, message.sender);
    await conn.reply(m.chat, 'Maaf, link grup WhatsApp tidak diizinkan di sini. Anda telah dikeluarkan dari grup.', m);
  }
};

module.exports = handler;