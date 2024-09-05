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

  let doc = documents[index - 1];
  m.reply(`📄 *Document:*\n\n🔖 *Name:* ${doc.name}\n🔗 *Link:* ${doc.url}`);
};

handler.help = ["getdoc"];
handler.tags = ["tools"];
handler.command = ["getdoc"];
handler.owner = true;
module.exports = handler;