/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const qs = require('qs');

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?`;
await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
  let hasil = await chat(text)
  await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
  await conn.sendMessage(m.chat, {
    text: hasil,
    contextInfo: {
      externalAdReply: {  
        title: "A O Y  A I",
        body: '',
        thumbnailUrl: 'https://files.catbox.moe/yfq7on.png',
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};
handler.command = ['aoyoai', 'yoai']
handler.tags = ['ai']
handler.help = ['aoyoai', 'yoai']
handler.register = true
module.exports = handler;

function generateRandomString(length) {
    const characters = 'abcdef0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
  * Scraper By QanyPaw
  * Forbidden to sell and delete my wm, respect the creator
*/

function generateRandomNumberString(length) {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
  * Scraper By QanyPaw
  * Forbidden to sell and delete my wm, respect the creator
*/

async function getSearchResults(query) {
    const url = 'https://aoyo.ai/Api/AISearch/Source';
    const requestData = {
        q: query,
        num: 20,
        hl: 'id-ID'
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json, text/plain, */*'
    };

    try {
        const response = await axios.post(url, qs.stringify(requestData), { headers });
        return response.data.organic;
    } catch (error) {
        return [];
    }
}

/**
  * Scraper By QanyPaw
  * Forbidden to sell and delete my wm, respect the creator
*/

async function chat(content) {
    const searchQuery = content;
    const searchResults = await getSearchResults(searchQuery);

    const engineContent = searchResults.map((result, index) => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet,
        sitelinks: result.sitelinks ? result.sitelinks.map(link => ({
            title: link.title,
            link: link.link
        })) : [],
        position: index + 1
    }));

    const url = 'https://aoyo.ai/Api/AISearch/AISearch';
    const requestData = {
        content: content,
        id: generateRandomString(32),
        language: 'id-ID',
        engineContent: JSON.stringify(engineContent),
        randomNumber: generateRandomNumberString(17)
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://aoyo.ai/search/?q=' + encodeURIComponent(content)
    };

    try {
        const response = await axios.post(url, qs.stringify(requestData), { headers });
        return response.data.replace(/\[START\][\s\S]*$/g, '').trim();

    } catch (error) {
        return { error: error.message };
    }
}