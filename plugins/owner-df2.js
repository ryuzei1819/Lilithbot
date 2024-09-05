const fs = require('fs');
const path = require('path');

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text)
    throw `Where is the path?\n\nExample:\n${usedPrefix + command} plugins/menu.js`;

  let paths = text.split('&').map(v => v.trim());

  let successMessages = [];
  let errorMessages = [];

  for (let p of paths) {
    if (!fs.existsSync(p)) {
      errorMessages.push(`File or folder ${p} not found`);
      continue;
    }

    try {
      let stats = fs.lstatSync(p);
      if (stats.isDirectory()) {
        fs.rmSync(p, { recursive: true, force: true }); // Remove folder and contents
        successMessages.push(`Deleted folder ${p}!`);
      } else {
        fs.unlinkSync(p); // Remove file
        successMessages.push(`Deleted file ${p}!`);
      }
    } catch (e) {
      errorMessages.push(`Error deleting ${p}: ${e.message}`);
    }
  }

  if (successMessages.length > 0) {
    await m.reply(successMessages.join('\n'));
  }
  if (errorMessages.length > 0) {
    await m.reply(errorMessages.join('\n'));
  }
};

handler.help = ["delfile2", "df2"].map((v) => v + " <path>");
handler.tags = ["owner"];
handler.command = ["delfile2", "df2"];
handler.owner = true;

module.exports = handler;