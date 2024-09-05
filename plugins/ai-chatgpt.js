/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require("axios");
const cheerio = require("cheerio");
const FormData = require("form-data");
const fetch = require("node-fetch");

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?`;
await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
  let hasil = await chatgptss(text)
  await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
  await conn.sendMessage(m.chat, {
    text: hasil,
    contextInfo: {
      externalAdReply: {  
        title: "C H A T  G P T",
        body: '',
        thumbnailUrl: 'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=CHAT GPT',
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};
handler.command = handler.help = ['gpt', 'chatgpt'];
handler.tags = ['ai'];
handler.premium = false;
handler.register = true
module.exports = handler;


async function chatgptss(message) {
    const url = 'https://chatgptss.org';
    const formData = new FormData();

    try {
        const html = await (await fetch(url)).text();
        const $ = cheerio.load(html);

        const chatData = $('.wpaicg-chat-shortcode').map((index, element) => {
            return Object.fromEntries(Object.entries(element.attribs));
        }).get();

        formData.append('_wpnonce', chatData[0]['data-nonce']);
        formData.append('post_id', chatData[0]['data-post-id']);
        formData.append('action', 'wpaicg_chatbox_message');
        formData.append('message', message);

        const response = await fetch('https://chatgptss.org/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Network response was not ok');

        let resultan = await response.json();
        return resultan.data
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}