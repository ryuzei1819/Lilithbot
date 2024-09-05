let fs = require("fs");

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
  let authFile = "plugins/jadibot/" + m.sender.split("@")[0];
  if (fs.existsSync(authFile)) {
    fs.rmdirSync(authFile, { recursive: true });
    m.reply(`*[ System Notice ]*\nSession mu telah di hapus dari database bot, silahkan pergi ke perangkat tertaut lalu hapus koneksinya untuk stop.`);
  } else {
    m.reply(`*[ System Notice ]* Kamu tidak meiliki session.`);
  }
};

handler.help = ["stopjadibot"]
handler.tags = ["jadibot"];
handler.command = ["stopjadibot"];
handler.premium = true;

module.exports = handler;