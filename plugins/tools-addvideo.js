/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require("fs");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (!mime.startsWith("video/")) throw `📹 *Usage:* ${usedPrefix + command} *[reply/send video]*`;
  if (!text) throw `📝 *Please provide a name for the video.*`;

  try {
    let media = await q.download();
    let link = await Uploader.catbox(media);
    let directory = "./src/video.json";
    if (!fs.existsSync(directory) || fs.readFileSync(directory).length === 0) {
      fs.writeFileSync(directory, JSON.stringify([]));
    }

    let jsonData = fs.readFileSync(directory);
    let existingData = JSON.parse(jsonData);
    existingData.push({ name: text, url: link });
    fs.writeFileSync(directory, JSON.stringify(existingData, null, 2)); 

    m.reply(`🎉 *Video successfully added!*\n\n🔍 *Check it using:* ${usedPrefix}listvideo`);
  } catch (error) {
    console.error(error);
    m.reply(`❗️ An error occurred: ${error.message}`);
  }
};

handler.help = ["addvideo"];
handler.tags = ["tools"];
handler.command = ["addvideo"];
handler.owner = true
module.exports = handler;