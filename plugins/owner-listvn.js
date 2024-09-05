/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require("fs");

let handler = async (m, { usedPrefix }) => {
  try {
    let array = JSON.parse(fs.readFileSync("./src/audio.json"));
    
    if (array.length === 0) {
      return m.reply(`🚫 *Database is empty. No voice notes available.*`);
    }
    
    let message = `
🎵 *List of Voice Notes in Database* 🎵
==========================
${array.map((a, i) => `✨ *${i + 1}.* ${a.name}`).join("\n")}
==========================
🔎 Type *${usedPrefix}getvn [number]* to get the voice note.
    `.trim();

    m.reply(message);
  } catch (error) {
    console.error(error);
    m.reply(`❗️ An error occurred: ${error.message}`);
  }
};

handler.help = ["listvn"];
handler.tags = ["tools"];
handler.command = ["listvn"];

module.exports = handler;