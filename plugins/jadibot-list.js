let fs = require("fs");
let path = require("path");

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
  let authDir = "plugins/jadibot";
  
  if (!fs.existsSync(authDir)) {
    return m.reply(`*[ System Notice ]* No active bot sessions found.`);
  }
  
  let files = fs.readdirSync(authDir);
  let botSessions = files.filter(file => fs.statSync(path.join(authDir, file)).isDirectory());

  if (botSessions.length === 0) {
    return m.reply(`*[ System Notice ]* No active bot sessions found.`);
  }

  let response = `*[ Active Bot Sessions ]*\n\n`;
  let mentionedJids = [];
  response += botSessions.map((session, index) => {
    let jid = session + '@s.whatsapp.net';
    mentionedJids.push(jid);
    return `${index + 1}. @${session}`;
  }).join('\n');

  conn.reply(m.chat, response, m, {
    contextInfo: { mentionedJid: mentionedJids }
  });
};

handler.help = ["listjadibot"]
handler.tags = ["jadibot"];
handler.command = ["listjadibot"];
handler.premium = true;

module.exports = handler;