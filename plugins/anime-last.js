const cheerio = require('cheerio');

async function latestAnime() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = "https://samehadaku.email/anime-terbaru/";
      const response = await fetch(url, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        },
      });

      if (!response.ok) return reject("Website Down");
      const html = await response.text();
      const $ = cheerio.load(html);
      const ul = $("div.post-show > ul").children("li");
      const data = {
        total: 0,
        anime: [],
      };

      for (let el of ul) {
        data.anime.push({
          title: $(el)
            .find("h2.entry-title")
            .text()
            .trim()
            .split(" Episode")[0],
          thumbnail: $(el).find("div.thumb > a > img").attr("src"),
          postedBy: $(el)
            .find('span[itemprop="author"] > author')
            .text()
            .trim(),
          episode: $(el).find("span").eq(0).find("author").text().trim(),
          release: $(el)
            .find('span[itemprop="author"]')
            .next()
            .contents()
            .eq(3)
            .text()
            .split(": ")[1]
            .trim(),
          link: $(el).find("a").attr("href"),
        });
      }

      data.total = data.anime.length;

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

const animelatesHandler = async (m, { conn, usedPrefix, command }) => {
  try {
    const { anime: animeList } = await latestAnime();

    if (animeList.length === 0) {
      await conn.reply(m.chat, `Tidak dapat memuat data anime terbaru saat ini. Silakan coba lagi nanti.`, m);
    } else {
      const latestAnime = animeList[0]; // Get the latest anime

      let responseText = `Anime terbaru:\n\n`;
      animeList.forEach((anime, index) => {
        responseText += `Judul: ${anime.title}\n`;
        responseText += `PostBy: ${anime.postedBy}\n`;
        responseText += `Episode: ${anime.episode}\n`;
        responseText += `Release: ${anime.release}\n`;
        responseText += `Link: ${anime.link}\n`;
        responseText += `Image: ${anime.thumbnail}\n\n`;
      });

      // Send the image of the latest anime with the information of all the latest anime
      await conn.sendFile(m.chat, latestAnime.thumbnail, 'thumbnail.jpg', responseText, m);
    }
  } catch (error) {
    console.error('Error in animelatesHandler:', error);
    await conn.reply(m.chat, `Terjadi kesalahan saat memuat data anime terbaru. Silakan coba lagi nanti.`, m);
  }
};

animelatesHandler.command = animelatesHandler.help = ["animelates", "animelast"];
animelatesHandler.tags = ["anime"];
module.exports = animelatesHandler;