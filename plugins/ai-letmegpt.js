/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const cheerio = require('cheerio');

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?`;
await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
  let hasil = await letmegpt(text)
  await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
  await conn.sendMessage(m.chat, {
    text: hasil,
    contextInfo: {
      externalAdReply: {  
        title: "L E T M E  G P T",
        body: '',
        thumbnailUrl: 'https://files.catbox.moe/64nzm0.png',
        sourceUrl: saluran,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};
handler.command = handler.help = ['letmegpt'];
handler.tags = ['ai'];
handler.premium = false;
handler.register = true
module.exports = handler;

async function letmegpt(query) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://letmegpt.com/search?q=${encodedQuery}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $('#gptans').text();
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}