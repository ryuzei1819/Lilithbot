/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

// Fungsi webtoons untuk melakukan pencarian di situs webtoons.com
async function webtoons(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.webtoons.com/id/search?keyword=${query}`)
      .then((data) => {
        const $ = cheerio.load(data.data);
        const judul = [];
        const genre = [];
        const author = [];
        const link = [];
        const likes = [];
        const format = [];

        $('#content > div > ul > li > a > div > p.subj').each(function(a, b) {
          let deta = $(b).text();
          judul.push(deta);
        });

        $('div > ul > li > a > span').each(function(a, b) {
          let deta = $(b).text();
          genre.push(deta);
        });

        $('div > ul > li > a > div > p.author').each(function(a, b) {
          let deta = $(b).text();
          author.push(deta);
        });

        $('div > ul > li > a > div > p.grade_area > em').each(function(a, b) {
          let deta = $(b).text();
          likes.push(deta);
        });

        $('#content > div > ul > li > a').each(function(a, b) {
          link.push($(b).attr('href'));
        });

        for (let i = 0; i < judul.length; i++) {
          format.push({
            judul: judul[i],
            genre: genre[i],
            author: author[i],
            likes: likes[i],
            link: 'https://www.webtoons.com' + link[i]
          });
        }

        if (likes.length === 0) {
          resolve({
            status: `${query} tidak dapat ditemukan/error`
          });
        } else {
          resolve(format);
        }
      })
      .catch(reject);
  });
}

// Handler untuk perintah webtoons
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`Penggunaan: ${usedPrefix}${command} <query>`);
  }

  const query = args.join(' ');
  try {
    const results = await webtoons(query);

    if (results.status) {
      return m.reply(results.status);
    }

    let message = 'Hasil pencarian Webtoons:\n\n';
    results.forEach((item, index) => {
      message += `${index + 1}. Judul: ${item.judul}\n   Genre: ${item.genre}\n   Author: ${item.author}\n   Likes: ${item.likes}\n   Link: ${item.link}\n\n`;
    });

    return m.reply(message);
  } catch (err) {
    console.error(err);
    return m.reply(`Terjadi kesalahan: ${err.message}`);
  }
};

handler.help = handler.command = ["webtoons"];
handler.tags = ["internet"];
module.exports = handler;