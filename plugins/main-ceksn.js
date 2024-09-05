/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const createHash = require('crypto').createHash;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let sn = createHash('md5').update(m.sender).digest('hex');
  conn.sendButton(
    m.chat,
    [["Unreg", `.unreg ${sn}`]],
    m,
    {
      body: "*Nih Id Lu :* " + sn,
      url: thumb
    },
  );
};
handler.help = ["ceksn"].map((a) => a + " *[check ID user]*");
handler.tags = ["main"];
handler.command = ["ceksn"];
handler.register = true;

module.exports = handler;