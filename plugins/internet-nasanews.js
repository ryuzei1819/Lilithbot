/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

async function getNasaInfo() {
  try {
    const response = await axios.get('https://www.nasa.gov/');
    const $ = cheerio.load(response.data);
    const slides = [];

    $('.hds-nasa-mag-wrapper').each((index, element) => {
      const title = $(element).find('h2').text().trim();
      const description = $(element).find('p').text().trim();
      const link = $(element).find('a.usa-button').attr('href');
      const img = $(element).find('figure img').attr('src');

      slides.push({ title, description, link, img });
    });

    return { status: true, creator: "siputzx", data: slides };
  } catch (error) {
    console.error(error);
    return { status: false, error: error.message };
  }
}

let handler = async (m, { conn, command }) => {
  try {
    await m.reply('🚀 Fetching the latest NASA news, please wait... 🌌');

    let news = await getNasaInfo();

    if (news.status) {
      let message = news.data.map((article, index) => {
        return `📰 *${index + 1}. ${article.title}*\n\n📖 *Description:* ${article.description}\n🔗 *Read more:* (${article.link})\n🖼️ *Image:* ${article.img}\n`;
      }).join('\n═══════════════════\n\n');

      await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    } else {
      await m.reply('❌ Failed to fetch NASA news.');
    }
  } catch (e) {
    console.error(e);
    await m.reply('⚠️ Error occurred while fetching NASA news.');
  }
};

handler.help = ['nasanews'];
handler.tags = ['internet'];
handler.command = /^nasanews$/i;

module.exports = handler;