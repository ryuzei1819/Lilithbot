/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
  let res = await fetch('https://katanime.vercel.app/api/getrandom?limit=1');
  if (!res.ok) throw await res.text();
  let json = await res.json();
  if (!json.result[0]) throw json;
  let { indo, character, anime } = json.result[0];
  conn.reply(m.chat, `${indo}\n\n📮By: _${character}_ \nAnime:\n${anime}`, m);
};

handler.help = ['quotesanime'];
handler.tags = ['quotes'];
handler.command = /^(quotesanime)$/i;
handler.limit = true;

module.exports = handler;