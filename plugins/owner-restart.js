/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, isROwner, text }) => {
  let { spawn } = require("child_process");
  if (!process.send) throw "Dont: node main.js\nDo: node index.js";
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply("Sedang Merestart Bot...\nMohon tunggu sekitar 1 menit");
    process.send("reset");
  } else throw "_eeeeeiiittsssss..._";
};

handler.help = ["restart"];
handler.tags = ["owner"];
handler.command = /^(srvrestart|restart)$/i;

handler.rowner = true;

module.exports = handler;