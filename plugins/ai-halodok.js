/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *Obat Tipes*`;
  m.reply('Please wait...');
  
  try {
    const articles = await searchHalodoc(text);
    if (articles.length === 0) {
      m.reply('No articles found.');
      return;
    }

    let message = `*Search Results for "${text}":*\n\n`;
    articles.forEach((article, index) => {
      message += `*${index + 1}. ${article.title}*\n`;
      message += `*Link:* ${article.articleLink}\n`;
      message += `*Health Link:* ${article.healthLink}\n`;
      message += `*Category:* ${article.healthTitle}\n`;
      message += `*Description:* ${article.description}\n\n`;
    });

    m.reply(message);
  } catch (e) {
    console.error(e);
    m.reply('*• Error occurred, please try again later.*');
  }
};

handler.command = handler.help = ['halodok'];
handler.tags = ['ai'];
handler.premium = false;
handler.register = true;
module.exports = handler;

async function searchHalodoc(query) {
  const url = `https://www.halodoc.com/artikel/search/${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = $('magneto-card').map((index, element) => ({
      title: $(element).find('header a').text().trim(),
      articleLink: 'https://www.halodoc.com' + $(element).find('header a').attr('href'),
      imageSrc: $(element).find('magneto-image-mapper img').attr('src'),
      healthLink: 'https://www.halodoc.com' + $(element).find('.tag-container a').attr('href'),
      healthTitle: $(element).find('.tag-container a').text().trim(),
      description: $(element).find('.description').text().trim(),
    })).get();

    return articles;
  } catch (err) {
    console.error(err);
    return [];
  }
}