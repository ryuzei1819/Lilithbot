/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require("fs");

let handler = async (m, { usedPrefix }) => {
  try {
    let array = JSON.parse(fs.readFileSync("./src/image.json"));
    
    if (array.length === 0) {
      return m.reply(`🚫 *Database is empty. No images available.*`);
    }
    
    let message = `
🖼️ *List of Images in Database* 🖼️
==========================
${array.map((a, i) => `✨ *${i + 1}.* ${a.name}`).join("\n")}
==========================
🔎 Type *${usedPrefix}getimg [number]* to get the image.
    `.trim();

    m.reply(message);
  } catch (error) {
    console.error(error);
    m.reply(`❗️ An error occurred: ${error.message}`);
  }
};

handler.help = ["listimg"];
handler.tags = ["tools"];
handler.command = ["listimg"];

module.exports = handler;