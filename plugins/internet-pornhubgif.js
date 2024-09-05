/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function searchGif(query) {
  const url = `http://www.pornhub.com/gifs/search?search=${query}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const gifs = $('ul.gifs.gifLink li');

  return gifs.map((i, gif) => {
    const data = $(gif).find('a');

    return {
      title: data.find('span').text(),
      url: 'http://dl.phncdn.com#id#.gif'.replace('#id#', data.attr('href')),
      webm: data.find('video').attr('data-webm'),
    };
  }).get();
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `🔍 *Usage:* ${usedPrefix + command} *[search term]*\n\nExample: ${usedPrefix + command} *seks*`;
  }

  try {
    const gifs = await searchGif(text);

    if (gifs.length === 0) {
      throw `🚫 *No GIFs found for:* ${text}`;
    }

    // Prepare the list of GIFs to send to the user
    let message = `🔎 *Search results for:* ${text}\n\n`;
    gifs.forEach((gif, index) => {
      message += `
${index + 1}. *Title:* ${gif.title}
   🌐 *Link:* ${gif.url}
   🎬 *WebM:* ${gif.webm ? gif.webm : 'Not available'}
`;
    });

    m.reply(message.trim());

  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      m.reply(`❗️ Link is broken or not found: ${error.response.url}`);
    } else {
      m.reply(`❗️ An error occurred: ${error}`);
    }
  }
};

handler.help = ['pornhubgif'];
handler.tags = ['internet']; 
handler.command = ['pornhubgif'];

module.exports = handler;