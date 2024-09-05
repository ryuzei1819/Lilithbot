/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

function PlayStore(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://play.google.com/store/search?q=${search}&c=apps`);
      const hasil = [];
      const $ = cheerio.load(data);

      $('.ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a').each((i, u) => {
        const linkk = $(u).attr('href');
        const nama = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .DdYX5').text().trim();
        const developer = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb').text().trim();
        const img = $(u).find('.j2FCNc > img').attr('src');
        const rate = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div').attr('aria-label');
        const rate2 = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF').text().trim();
        const link = `https://play.google.com${linkk}`;

        hasil.push({
          link: link,
          nama: nama ? nama : 'No name',
          developer: developer ? developer : 'No Developer',
          img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
          rate: rate ? rate : 'No Rate',
          rate2: rate2 ? rate2 : 'No Rate',
          link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join('+')}`
        });
      });

      if (hasil.length === 0) {
        resolve({ message: 'Tidak ada hasil!' });
      } else {
        resolve(hasil);
      }
    } catch (err) {
      console.error('Error fetching Play Store data:', err);
      reject(err);
    }
  });
}

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `Masukkan nama aplikasi yang ingin kamu cari di Play Store.`, m);
  }

  const searchQuery = args.join(" ");
  try {
    const results = await PlayStore(searchQuery);
    
    if ('message' in results) {
      await conn.reply(m.chat, results.message, m);
    } else {
      let responseText = `Hasil pencarian untuk *${searchQuery}*:\n`;
      for (let i = 0; i < results.length; i++) {
        const app = results[i];
        responseText += `
Nama: ${app.nama}
Developer: ${app.developer}
Rate: ${app.rate}
Link: ${app.link}
Developer Page: ${app.link_dev}
        `;
        if (i < results.length - 1) {
          responseText += '\n------------------------\n';
        }
      }
      await conn.reply(m.chat, responseText, m);
    }
  } catch (error) {
    console.error('Error in Play Store handler:', error);
    await conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. Silakan coba lagi nanti.`, m);
  }
};

handler.command = handler.help = ["playstore", "ps"];
handler.tags = ["internet", "tools"];
module.exports = handler;