/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

function BukaLapak(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`, {
        headers: {
          "user-agent": 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 108.0) Gecko / 20100101 Firefox / 108.0'
        }
      })
      const $ = cheerio.load(data);
      const dat = [];
      const b = $('a.slide > img').attr('src');
      $('div.bl-flex-item.mb-8').each((i, u) => {
        const a = $(u).find('observer-tracker > div > div');
        const img = $(a).find('div > a > img').attr('src');
        if (typeof img === 'undefined') return

        const link = $(a).find('.bl-thumbnail--slider > div > a').attr('href');
        const title = $(a).find('.bl-product-card__description-name > p > a').text().trim();
        const harga = $(a).find('div.bl-product-card__description-price > p').text().trim();
        const rating = $(a).find('div.bl-product-card__description-rating > p').text().trim();
        const terjual = $(a).find('div.bl-product-card__description-rating-and-sold > p').text().trim();

        const dari = $(a).find('div.bl-product-card__description-store > span:nth-child(1)').text().trim();
        const seller = $(a).find('div.bl-product-card__description-store > span > a').text().trim();
        const link_sel = $(a).find('div.bl-product-card__description-store > span > a').attr('href');

        const res_ = {
          title: title,
          rating: rating ? rating : 'No rating yet',
          terjual: terjual ? terjual : 'Not yet bought',
          harga: harga,
          image: img,
          link: link,
          store: {
            lokasi: dari,
            nama: seller,
            link: link_sel
          }
        };

        dat.push(res_);
      })
      if (dat.every(x => x === undefined)) return resolve({ message: 'Tidak ada result!' })
      resolve(dat)
    } catch (err) {
      console.error(err)
    }
  })
}


const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `Masukkan nama produk yang ingin kamu cari di Bukalapak.`, m);
  }

  const searchQuery = args.join(" ");
  try {
    const results = await BukaLapak(searchQuery);

    if ('message' in results) {
      await conn.reply(m.chat, results.message, m);
    } else {
      let responseText = `Hasil pencarian untuk *${searchQuery}* di Bukalapak:\n`;
      for (let i = 0; i < results.length; i++) {
        const product = results[i];
        responseText += `
Nama: ${product.title}
Harga: ${product.harga}
Rating: ${product.rating}
Terjual: ${product.terjual}
Link: ${product.link}
Toko:
- Nama: ${product.store.nama}
- Lokasi: ${product.store.lokasi}
- Link Toko: ${product.store.link}
        `;
        if (i < results.length - 1) {
          responseText += '\n------------------------\n';
        }
      }
      await conn.reply(m.chat, responseText, m);
    }
  } catch (error) {
    console.error('Error in Bukalapak handler:', error);
    await conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. Silakan coba lagi nanti.`, m);
  }
};

handler.command = handler.help = ["bukalapak", "bl"];
handler.tags = ["internet"];
module.exports = handler;