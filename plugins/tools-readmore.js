/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, text, usedPrefix , command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[before|after]*`
 m.reply(wait) 
 try {
  let [l, r] = text.split`|`;
  if (!l) l = "";
  if (!r) r = "";
  conn.reply(m.chat, l + readMore + r, m);
 } catch(e) {
    throw eror
  }
};
handler.help = ["readmore"].map((v) => v + " *[before|after]*");
handler.tags = ["tools"];
handler.command = ["readmore"]

module.exports = handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);