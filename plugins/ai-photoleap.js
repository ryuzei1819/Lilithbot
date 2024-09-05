/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
       if (!text) throw `*• Example :* ${usedPrefix + command} *[prompt]*`
       m.reply(wait)
  let { data } = await axios.get("https://tti.photoleapapp.com/api/v1/generate?prompt=" + text)
     m.reply(`*• Prompt :* ${text}`, data.result_url);
  }

handler.command = handler.help = ["photoleap"];
handler.tags = ["ai"]
module.exports = handler;