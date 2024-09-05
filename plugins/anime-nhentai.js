/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

let no = 1;

function nhentaisearch(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://nhentai.to/search?q=${query}`)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $('body > div.container.index-container > div').each(function(a, b) {
          const result = {
            status: 200,
            index: `${no++}`,
            link: 'https://nhentai.to' + $(b).find('> a').attr('href'),
            thumb: $(b).find('> a > img:nth-child(2)').attr('src'),
            title: $(b).find('> a > div').text().trim()
          };
          hasil.push(result);
        });
        resolve(hasil);
      })
      .catch(reject);
  });
}

const nhentaiSearchHandler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) {
      return conn.reply(m.chat, `Silakan masukkan kata kunci untuk mencari di nhentai. Contoh penggunaan: ${usedPrefix}${command} naruto`, m);
    }

    const searchQuery = args.join(" ");
    const results = await nhentaisearch(searchQuery);

    if (results.length === 0) {
      await conn.reply(m.chat, `Tidak ditemukan hasil untuk pencarian "${searchQuery}" di nhentai.`, m);
    } else {
      let responseText = `Hasil pencarian nhentai untuk "${searchQuery}":\n\n`;
      results.forEach((data) => {
        responseText += `Index: ${data.index}\n`;
        responseText += `Judul: ${data.title}\n`;
        responseText += `Link: ${data.link}\n`;
        responseText += `Thumbnail: ${data.thumb}\n\n`;
      });

      await conn.reply(m.chat, responseText, m);
    }
  } catch (error) {
    console.error('Error in nhentaiSearchHandler:', error);
    await conn.reply(m.chat, `Terjadi kesalahan saat mencari di nhentai. Silakan coba lagi nanti.`, m);
  }
};

nhentaiSearchHandler.command = nhentaiSearchHandler.help = ['nhentaisearch', 'nhentai'];
nhentaiSearchHandler.tags = ['anime'];
module.exports = nhentaiSearchHandler;