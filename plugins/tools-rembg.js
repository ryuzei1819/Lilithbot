/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function removeBG(url) {
  try {
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_url', url);

    let { data } = await axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: formData,
      responseType: 'arraybuffer',
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': '2DU7r7XXDKFrTewMMbzELoYj',
      },
      encoding: null
    })

    return { status: true, buffer: data}
  } catch(e) {
    return { status: false, msg: "Failed Request !" }
  }
}

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`;
  m.reply(wait);
  let media = await q.download();
  let url = await Uploader.Uguu(media);
  let hasil = await removeBG(url);
  await conn.sendFile(m.chat, hasil.buffer, "", done, m);
};
handler.help = ["removebg", "nobg"]
handler.tags = ["tools"];
handler.command = ["removebg","nobg","rembg"];
handler.limit = true;

module.exports = handler;