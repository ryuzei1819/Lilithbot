/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const axios = require('axios');
const cheerio = require('cheerio');

// Fungsi untuk mencari gambar di WikiMedia
function WikiMedia(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://commons.wikimedia.org/w/index.php?search=${search}&title=Special:MediaSearch&go=Go&type=image`);
      const $ = cheerio.load(data);
      const hasil = [];
      $('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
        hasil.push({
          title: $(b).find('img').attr('alt'),
          source: $(b).attr('href'),
          image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
        });
      });
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' });
      resolve(hasil);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

// Handler untuk menangani perintah bot
let handler = async (m, { conn, text, usedPrefix, command: cmd }) => {
  if (!text) return m.reply(`Usage: ${usedPrefix + cmd} <search term>`);

  try {
    const results = await WikiMedia(text);
    if (results.mess) {
      return m.reply(results.mess);
    }
    const replyText = results.map(result => `*Title:* ${result.title}\n*Source:* ${result.source}\n*Image:* ${result.image}`).join('\n\n');
    await m.reply(replyText);
  } catch (err) {
    console.error(err);
    await m.reply('An error occurred while fetching data from WikiMedia.');
  }
};

handler.help = ['wikimedia <search term>'];
handler.command = /^(wikimedia|wikiimage)$/i;
handler.tags = ['internet'];

// Inisialisasi bot
module.exports = handler;