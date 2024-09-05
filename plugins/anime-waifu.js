/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
  let res = await fetch(`https://api.waifu.pics/sfw/waifu`);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  if (!res.ok) throw await res.text();
  let json = await res.json();
  if (!json.url) throw 'Error!';
  conn.sendFile(m.chat, json.url, '', '`Nih waipunya`\n`Istri kok kartun :v`', m);
  conn.sendMessage(m.chat, {
    react: {
      text: '✅',
      key: m.key,
    }
  });
};

handler.command = /^(waifu)$/i;
handler.tags = ['anime'];
handler.help = ['waifu'];
handler.limit = true;

module.exports = handler;