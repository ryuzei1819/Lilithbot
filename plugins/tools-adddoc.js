const fs = require("fs");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (!mime.startsWith("application/")) throw `📄 *Usage:* ${usedPrefix + command} *[reply/send document]*`;
  if (!text) throw `📝 *Please provide a name for the document.*`;

  try {
    let media = await q.download();
    let link = await Uploader.catbox(media);
    let directory = "./src/document.json";
    if (!fs.existsSync(directory) || fs.readFileSync(directory).length === 0) {
      fs.writeFileSync(directory, JSON.stringify([]));
    }

    let jsonData = fs.readFileSync(directory);
    let existingData = JSON.parse(jsonData);
    existingData.push({ name: text, url: link });
    fs.writeFileSync(directory, JSON.stringify(existingData, null, 2)); 

    m.reply(`🎉 *Document successfully added!*\n\n🔍 *Check it using:* ${usedPrefix}listdoc`);
  } catch (error) {
    console.error(error);
    m.reply(`❗️ An error occurred: ${error.message}`);
  }
};

handler.help = ["adddoc"];
handler.tags = ["tools"];
handler.command = ["adddoc"];
handler.owner = true;
module.exports = handler;