/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const crypto = require('crypto');

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?`;
await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
  let hasil = await yesai(text)
  await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
  await conn.sendMessage(m.chat, {
    text: hasil,
    contextInfo: {
      externalAdReply: {  
        title: "G P T - 4o",
        body: wm,
        thumbnailUrl: 'https://files.catbox.moe/18w75m.png',
        sourceUrl: saluran,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};
handler.command = ['gpt4o']
handler.tags = ['ai']
handler.help = ['gpt4o']
handler.register = true
module.exports = handler;


/*
>> base web: https://www.yeschat.ai
>> requestan dari @Jallz
>> pembohong cik backend nya ternyata gpt2 🗿
>> scrape by shannz 
>> visit: https://whatsapp.com/channel/0029VagBdZ49MF92BygaM53t
*/

async function yesai(prompt) {
  const headers = {
    'Content-Type': 'application/json',
    'UniqueId': crypto.randomBytes(16).toString('hex'),
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://www.yeschat.ai/gpt-4o'
  };

  const data = {
    prompt,
    sessionId: crypto.randomBytes(16).toString('hex')
  };

  try {
    const response = await axios.post('https://finechatserver.erweima.ai/api/v1/gpt2/free-gpt2/chat', data, { headers });
    const messages = response.data.match(/\"message\":\"(.*?)\"/g) || [];
    return messages.map(message => message.replace(/\"message\":\"(.*?)\"/, '$1')).join('');
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}