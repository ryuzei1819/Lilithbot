/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  conn.reply(m.chat, `*Succes Cheat !*`, m);
  global.db.data.users[m.sender].money = 9999999999999999999;
};
handler.command = /^(cheat)$/i;
handler.premium = true;

module.exports = handler;