/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const yts = require('yt-search');
const fs = require('fs');

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*_Penggunaan_*\n\n*${usedPrefix + command} musik*`;

  try {
    await m.reply('🔍 Sedang mencari... Silakan tunggu sebentar.');

    let results = await yts(text);
    let teks = results.all.map((v, i) => {
      let link = v.url;
      return `🎵 *${i + 1}. ${v.title}*\n\n🔗 *Link:* (${v.url})\n⏱️ *Durasi:* ${v.timestamp}\n📅 *Diunggah:* ${v.ago}\n👁️ *Ditonton:* ${v.views}`;
    }).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');

    conn.sendFile(m.chat, results.all[0].thumbnail, 'yts.jpeg', teks, m);
  } catch (error) {
    conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
  }
}

handler.help = ['playlist *<teks>*'];
handler.tags = ['internet'];
handler.command = /^playlist|playlist$/i;

module.exports = handler;