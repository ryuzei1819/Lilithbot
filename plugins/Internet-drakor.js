/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function searchDrakor(query) {
  try {
    const response = await fetch(
      "https://drakorasia.us?s=" + query + "&post_type=post",
    );
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const extractedData = $("#post.archive")
      .map((index, element) => ({
        title: $(element).find("h2 a").text().trim(),
        link: $(element).find("h2 a").attr("href"),
        image: $(element).find("img").attr("src"),
        categories: $(element)
          .find('.genrenya span[rel="tag"]')
          .map((index, el) => $(el).text())
          .get(),
        year: $(element).find('.category a[rel="tag"]').text(),
        episodes: $(element)
          .find(".category")
          .contents()
          .filter((index, el) => el.nodeType === 3)
          .text()
          .trim(),
      }))
      .get();

    return extractedData;
  } catch (error) {
    console.error("Error in searchDrakor:", error);
    return [];
  }
}

const searchDrakorHandler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) {
      return conn.reply(m.chat, `Silakan masukkan judul drama Korea yang ingin Anda cari. Contoh penggunaan: ${usedPrefix}${command} Vincenzo`, m);
    }

    const searchQuery = args.join(" ");
    const results = await searchDrakor(searchQuery);

    if (results.length === 0) {
      await conn.reply(m.chat, `Tidak ditemukan drama Korea dengan judul "${searchQuery}"`, m);
    } else {
      let responseText = `Hasil pencarian drama Korea dengan judul "${searchQuery}":\n\n`;
      results.forEach((data, index) => {
        responseText += `Judul: ${data.title}\n`;
        responseText += `Link: ${data.link}\n`;
        responseText += `Gambar: ${data.image}\n`;
        responseText += `Kategori: ${data.categories.join(", ")}\n`;
        responseText += `Tahun: ${data.year}\n`;
        responseText += `Jumlah Episode: ${data.episodes}\n\n`;
      });

      await conn.reply(m.chat, responseText, m);
    }
  } catch (error) {
    console.error('Error in searchDrakorHandler:', error);
    await conn.reply(m.chat, `Terjadi kesalahan saat mencari drama Korea. Silakan coba lagi nanti.`, m);
  }
};

searchDrakorHandler.command = searchDrakorHandler.help = ["drakor"];
searchDrakorHandler.tags = ["internet"];
module.exports = searchDrakorHandler;