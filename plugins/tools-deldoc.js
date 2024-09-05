const fs = require("fs");

let handler = async (m, { text, usedPrefix, command }) => {
  let directory = "./src/document.json";
  if (!fs.existsSync(directory) || fs.readFileSync(directory).length === 0) {
    return m.reply(`📄 *No documents found.*`);
  }

  let jsonData = fs.readFileSync(directory);
  let documents = JSON.parse(jsonData);

  if (documents.length === 0) {
    return m.reply(`📄 *No documents found.*`);
  }

  let index = parseInt(text);
  if (isNaN(index) || index < 1 || index > documents.length) {
    return m.reply(`📄 *Please provide a valid document index.*\n\n🔍 *Use:* ${usedPrefix}listdoc *to see the list of documents.*`);
  }

  documents.splice(index - 1, 1);
  fs.writeFileSync(directory, JSON.stringify(documents, null, 2)); 

  m.reply(`🗑️ *Document successfully deleted.*`);
};

handler.help = ["deldoc"];
handler.tags = ["tools"];
handler.command = ["deldoc"];
handler.owner = true;
module.exports = handler;