const fs = require("fs");

let handler = async (m, { usedPrefix, command }) => {
  let directory = "./src/document.json";
  if (!fs.existsSync(directory) || fs.readFileSync(directory).length === 0) {
    return m.reply(`📄 *No documents found.*`);
  }

  let jsonData = fs.readFileSync(directory);
  let documents = JSON.parse(jsonData);

  if (documents.length === 0) {
    return m.reply(`📄 *No documents found.*`);
  }

  let list = documents.map((doc, index) => `${index + 1}. ${doc.name}`).join("\n");

  m.reply(`📄 *Document List:*\n\n${list}`);
};

handler.help = ["listdoc"];
handler.tags = ["tools"];
handler.command = ["listdoc"];
handler.owner = true;
module.exports = handler;