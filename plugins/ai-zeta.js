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
  let hasil = await zeta(text)
  await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
  await conn.sendMessage(m.chat, {
    text: hasil.answer,
    contextInfo: {
      externalAdReply: {  
        title: "Z E T A  A I",
        body: '',
        thumbnailUrl: 'https://files.catbox.moe/davvm0.png',
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};
handler.command = handler.help = ['zeta'];
handler.tags = ['ai'];
handler.premium = false;
handler.register = true
module.exports = handler;

async function zeta(message) {
  try {
    if(!message) return { status: false, message: "undefined reading message" };
    return await new Promise((resolve, reject) => {
      axios.post("https://backend.aichattings.com/api/v2/chatgpt/talk", {
        msg: message,
        model: "gpt3",
        locale: "ai-characters",
        role_id: 150,
        ep_user_id: 25560
      }).then(async res => {
        const data = res.data;
        if(!data) return reject("failed getting response from zeta!");
        resolve({
          status: true,
          answer: data
        })
      }).catch(reject)
    })
  } catch (e) {
    return { status: false, message: e };
  }
}