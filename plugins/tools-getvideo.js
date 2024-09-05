/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require("fs");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let directory = "./src/video.json";

    // Initialize the JSON file if it does not exist or is empty
    if (!fs.existsSync(directory) || fs.readFileSync(directory).length === 0) {
      fs.writeFileSync(directory, JSON.stringify([]));
    }

    let array = JSON.parse(fs.readFileSync(directory));

    if (!text || !parseInt(text)) {
      throw `📹 *Usage:* ${usedPrefix + command} *[number]*\nContoh: ${usedPrefix + command} 1`;
    }

    let index = parseInt(text);
    if (index < 1 || index > array.length) {
      throw `🚫 *Video not found. Please enter a valid number.*`;
    }

    let video = array[index - 1];

    await conn.sendFile(m.chat, video.url, "video.mp4", `📹 *${video.name}*`, m);
  } catch (error) {
    console.error(error);
    m.reply(`❗️ An error occurred: ${error.message}`);
  }
};

handler.help = ["getvideo"];
handler.tags = ["tools"];
handler.command = ["getvideo"];
handler.owner = true;
module.exports = handler;