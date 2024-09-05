/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

// Fungsi untuk mendapatkan jadwal acara TV saat ini
function AcaraNow() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.jadwaltv.net/channel/acara-tv-nasional-saat-ini');
      const $ = cheerio.load(data);
      let tv = [];
      $('table.table.table-bordered > tbody > tr').each((u, i) => {
        let an = $(i).text().split('WIB');
        if (an[0] === 'JamAcara') return;
        if (typeof an[1] === 'undefined') return tv.push('\n' + '*' + an[0] + '*');
        tv.push(`${an[0]} - ${an[1]}`);
      });
      if (tv.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' });
      resolve(tv);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

// Handler untuk menangani perintah bot
let handler = async (m, { conn, text, usedPrefix, command: cmd }) => {
  try {
    const results = await AcaraNow();
    if (results.mess) {
      return m.reply(results.mess);
    }
    const replyText = results.join('\n');
    await m.reply(replyText);
  } catch (err) {
    console.error(err);
    await m.reply('An error occurred while fetching data from Jadwal TV.');
  }
};

handler.help = ['acaratv'];
handler.command = /^(acaratv|tvnow)$/i;
handler.tags = ['internet'];

module.exports = handler;