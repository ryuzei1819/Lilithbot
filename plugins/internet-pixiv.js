/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
  m.reply('Please wait...');
  try {
    let { imageBuffer, caption } = await pixivSearch(text);
    await conn.sendButton(
      m.chat,
      caption,
      'NEXT IMAGE',
      `${usedPrefix + command} ${text}`,
      m,
      { image: imageBuffer }
    );
  } catch (e) {
    console.error(e);
    throw '*• Error occurred, please try again later.*';
  }
};

handler.help = ["pixiv"].map(a => a + " *[query]*");
handler.tags = ["internet"];
handler.command = ["pixiv"];

module.exports = handler;

async function pixivSearch(query) {
  const url = 'https://www.pixiv.net/touch/ajax/search/artworks';
  const params = { word: query, lang: 'en' };
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://www.pixiv.net/',
    'Accept-Encoding': 'gzip, deflate, br'
  };

  const response = await axios.get(url, { params, headers });
  const illusts = response.data.body.illustManga.data;
  if (!illusts.length) throw 'No results found';

  const randomIllust = illusts[Math.floor(Math.random() * illusts.length)];
  const imageUrl = randomIllust.url;
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer', headers });

  const imageBuffer = Buffer.from(imageResponse.data, 'binary');

  const caption = `*• Caption :* ${randomIllust.title}
*• Author :* ${randomIllust.userName}
*• Tags :* ${randomIllust.tags.map(a => a.tag).join(", ")}`;

  return {
    imageBuffer,
    caption
  };
}