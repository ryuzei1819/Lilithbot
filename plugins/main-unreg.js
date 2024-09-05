/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const { createHash } = require('crypto');

let handler = async function (m, { args }) {
  if (!args[0]) throw '🚩 Masukan Serial Nomor, Kalau Gatau Ketik .ceksn';
  let user = global.db.data.users[m.sender];
  let sn = createHash('md5').update(m.sender).digest('hex');
  if (args[0] !== sn) throw '🚩 Serial Nomor Salah';
  user.registered = false;
  m.reply('`Sukses Unreg`');
};

handler.help = ['unregister *<sn>*'];
handler.tags = ['main'];

handler.command = /^unreg(ister)?$/i;

module.exports = handler;