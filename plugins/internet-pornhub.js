/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function ph(query) {
  const url = `https://www.pornhub.com/video/search?search=${query}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const videoList = [];

  $('li[data-video-segment]').each((index, element) => {
    const $element = $(element);
    
    const link = $element.find('.title a').attr('href').trim();
    const title = $element.find('.title a').text().trim();
    const uploader = $element.find('.videoUploaderBlock a').text().trim();
    const views = $element.find('.views').text().trim();
    const duration = $element.find('.duration').text().trim();
    
    const videoData = {
      link: "https://www.pornhub.com" + link,
      title: title,
      uploader: uploader,
      views: views,
      duration: duration
    };
    
    videoList.push(videoData);
  });
  
  return videoList;
}

let handler = async (m, { conn, args }) => {
  if (args.length === 0) {
    return conn.reply(m.chat, '❗️Please provide a search query. Example: *!phquery bokep*', m);
  }

  const query = args.join(' ');
  const results = await ph(query);

  if (results.length === 0) {
    return conn.reply(m.chat, '❌ No results found.', m);
  }

  let responseText = '🔞 *Pornhub Search Results* 🔞\n\n';
  results.slice(0, 5).forEach((video, index) => {
    responseText += `${index + 1}. *Title*: ${video.title}\n`;
    responseText += `*Uploader*: ${video.uploader}\n`;
    responseText += `*Views*: ${video.views}\n`;
    responseText += `*Duration*: ${video.duration}\n`;
    responseText += `*Link*: ${video.link}\n\n`;
  });

  conn.reply(m.chat, responseText.trim(), m);
};

handler.help = ['pornhub <search term>'];
handler.tags = ['internet'];
handler.command = /^pornhub$/i;

module.exports = handler;