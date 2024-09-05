/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require("fs");

let handler = async (m, { usedPrefix }) => {
  try {
    let array = JSON.parse(fs.readFileSync("./src/video.json"));
    
    if (array.length === 0) {
      return m.reply(`🚫 *Database is empty. No videos available.*`);
    }
    
    let message = `
📹 *List of Videos in Database* 📹
==========================
${array.map((a, i) => `✨ *${i + 1}.* ${a.name}`).join("\n")}
==========================
🔎 Type *${usedPrefix}getvideo [number]* to get the video.
    `.trim();

    m.reply(message);
  } catch (error) {
    console.error(error);
    m.reply(`❗️ An error occurred: ${error.message}`);
  }
};

handler.help = ["listvideo"];
handler.tags = ["tools"];
handler.command = ["listvideo"];

module.exports = handler;