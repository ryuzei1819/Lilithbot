/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const cp = require('child_process');
const { promisify } = require('util');
const exec = promisify(cp.exec).bind(cp);

let handler = async (m) => {
  await conn.reply(m.chat, "`Succes`", m);
  let o;
  try {
    o = await exec('rm -rf tmp && mkdir tmp');
  } catch (e) {
    o = e;
  }
};

handler.help = ['cleartmp'];
handler.tags = ['owner'];
handler.command = /^(cleartmp|ctmp)$/i;

handler.owner = true;

module.exports = handler;