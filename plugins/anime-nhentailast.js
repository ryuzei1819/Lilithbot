const axios = require('axios');
const cheerio = require('cheerio');

const nhentaiLatest = async () => {
  const baseURL = 'https://nhentai.to';

  try {
    const response = await axios.request({
      url: baseURL,
      method: "GET",
      headers: {
        'user-agent': "Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36"
      }
    });

    const $ = cheerio.load(response.data);
    const galleries = $("div.container.index-container > div.gallery").map((i, el) => {
      return {
        id: $(el).find('a').attr('href').match(/\d+/)[0],
        title: $(el).find("a > div.caption").text().trim(),
        thumbnail: $(el).find("a > img").attr("data-src"),
        link: baseURL + $(el).find('a').attr("href")
      };
    }).get();

    return galleries;
  } catch (error) {
    throw error;
  }
};

const nhentaiLatestHandler = async (m, { conn, usedPrefix, command }) => {
  try {
    const galleries = await nhentaiLatest();

    if (galleries.length === 0) {
      await conn.reply(m.chat, `Tidak dapat memuat data galeri terbaru saat ini. Silakan coba lagi nanti.`, m);
    } else {
      let responseText = `Galeri terbaru:\n\n`;
      galleries.forEach((gallery, index) => {
        responseText += `ID: ${gallery.id}\n`;
        responseText += `Judul: ${gallery.title}\n`;
        responseText += `Link: ${gallery.link}\n\n`;
      });

      await conn.reply(m.chat, responseText, m);
    }
  } catch (error) {
    console.error('Error in nhentaiLatestHandler:', error);
    await conn.reply(m.chat, `Terjadi kesalahan saat memuat data galeri terbaru. Silakan coba lagi nanti.`, m);
  }
};

nhentaiLatestHandler.command = nhentaiLatestHandler.help = ["nhentailatest", "nhentailast"];
nhentaiLatestHandler.tags = ["anime"];
module.exports = nhentaiLatestHandler;