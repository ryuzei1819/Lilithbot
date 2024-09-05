/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const cheerio = require('cheerio');
const fetch = require('node-fetch'); // Pastikan Anda menginstal 'node-fetch'

/**
 * Scraped by Kaviaan
 * Dont remove Wm
 */
async function mangaSearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`https://myanimelist.net/manga.php?${new URLSearchParams({ q: query })}`).then((v) => v.text());
      const $ = cheerio.load(res);
      const data = [];
      $("div#content")
        .find("div.list > table > tbody")
        .children("tr")
        .slice(1)
        .each((i, el) => {
          const at = $(el).find("td.ac");
          const manga = {
            title: $(el).find("strong").text().trim(),
            desc: $(el).find("div.pt4").text().trim(),
            id: $(el).find("div.picSurround > a").attr("id").replace(/sarea|[^\d]/gi, ""),
            link: $(el).find("div.picSurround > a").attr("href"),
            thumbnail: $(el).find("div.picSurround > a > img").attr("data-srcset").split(" ")[2].split("?")[0].replace(/\/r\/\d+x\d+/gi, ""),
            type: $(at).eq(0).text().trim(),
            volume: $(at).eq(1).text().trim(),
            score: $(at).eq(2).text().trim(),
            member: $(at).eq(3).text().trim() || 0,
          };

          data.push(manga);
        });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

var handler = async (m, { conn, text }) => {
  if (!text) throw 'Harap masukkan nama manga yang ingin dicari!';
  let searchResults = await mangaSearch(text);
  if (searchResults.length === 0) {
    conn.reply(m.chat, 'Manga tidak ditemukan. Silakan coba dengan kata kunci yang berbeda.', m);
    return;
  }

  let message = 'Hasil pencarian manga:\n\n';
  searchResults.slice(0, 5).forEach((manga, index) => {
    message += `*${index + 1}. ${manga.title}*\n`;
    message += `📖 Deskripsi: ${manga.desc}\n`;
    message += `🔗 Link: ${manga.link}\n`;
    message += `🌟 Skor: ${manga.score}\n`;
    message += `👥 Member: ${manga.member}\n\n`;
  });

  conn.reply(m.chat, message, m);
};

handler.command = handler.help = ['mangasearch', 'searchmanga'];
handler.tags = ['anime'];
handler.register = true;
module.exports = handler;