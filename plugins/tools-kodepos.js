/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

function KodePos(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://nomorkodepos.com/?s=' + query);
      const $ = cheerio.load(data);
      let _data = [];

      $('table.pure-table.pure-table-horizontal > tbody > tr').each((i, u) => {
        let _doto = [];
        $(u).find('td').each((l, p) => {
          _doto.push($(p).text().trim());
        });
        _data.push({
          province: _doto[0],
          city: _doto[1],
          subdistrict: _doto[2],
          village: _doto[3],
          postalcode: _doto[4]
        });
      });

      resolve(_data);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `Silakan masukkan nama kota atau kecamatan untuk mencari kode pos. Contoh penggunaan: ${usedPrefix}${command} Jakarta Selatan`, m);
  }

  const searchQuery = args.join(" ");
  try {
    const results = await KodePos(searchQuery);

    if (results.length === 0) {
      await conn.reply(m.chat, `Tidak ditemukan data kode pos untuk "${searchQuery}"`, m);
    } else {
      let responseText = `Hasil pencarian kode pos untuk "${searchQuery}":\n\n`;
      results.forEach((data, index) => {
        responseText += `Provinsi: ${data.province}\n`;
        responseText += `Kota/Kabupaten: ${data.city}\n`;
        responseText += `Kecamatan: ${data.subdistrict}\n`;
        responseText += `Kelurahan: ${data.village}\n`;
        responseText += `Kode Pos: ${data.postalcode}\n\n`;
      });

      await conn.reply(m.chat, responseText, m);
    }
  } catch (error) {
    console.error('Error in KodePos handler:', error);
    await conn.reply(m.chat, `Terjadi kesalahan saat mencari kode pos. Silakan coba lagi nanti.`, m);
  }
};

handler.command = handler.help = ["kodepos", "kp"];
handler.tags = ["tools"];
module.exports = handler;