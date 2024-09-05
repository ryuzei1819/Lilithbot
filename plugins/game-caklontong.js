/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

let timeout = 120000;
let poin = 4999;
let handler = async (m, { conn, command, usedPrefix }) => {
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (id in conn.caklontong) {
    conn.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      conn.caklontong[id][0],
    );
    throw false;
  }
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json');
    const data = response.data;
    const randomIndex = Math.floor(Math.random() * data.length);
    const caklontongData = data[randomIndex];
    
    let caption = `*${command.toUpperCase()}*
${caklontongData.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hcak untuk bantuan
Bonus: ${poin} XP

*Note : Reply Pesan Ini Jika Ingin Menjawab Soal*
    `.trim();
    conn.caklontong[id] = [
      await m.reply(caption),
      caklontongData,
      poin,
      setTimeout(() => {
        if (conn.caklontong[id])
          conn.reply(
            m.chat,
            `Waktu habis!\nJawabannya adalah *${caklontongData.jawaban}*`,
            conn.caklontong[id][0],
          );
        delete conn.caklontong[id];
      }, timeout),
    ];
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Terjadi kesalahan saat memuat soal', m);
  }
};
handler.help = ["caklontong"];
handler.tags = ["game"];
handler.command = /^caklontong/i;

module.exports = handler;

const buttons = [
  ["Hint", "/hcak"],
  ["Nyerah", "menyerah"],
];