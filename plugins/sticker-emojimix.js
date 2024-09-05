/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let fs = require("fs");

const { sticker5 } = require("../lib/sticker.js");

let handler = async (m, { conn, text, args }) => {
  if (!args[0]) throw "Contoh penggunaan:\n\n*.emojimix 🤨+😣*";
  let [emoji1, emoji2] = text.split`+`;
  let anu = await fetchJson(
    `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`,
  );
  for (let res of anu.results) {
    let stiker = await sticker5(false, res.url, global.packname, global.author);
    conn.sendFile(m.chat, stiker, "sticker.webp", "", m);

    //   let encmedia = await conn.(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
    // await fs.unlinkSync(stiker)
  }
};

handler.help = ["emojimix"];
handler.tags = ["sticker"];
handler.command = /^(emojimix)$/i;
handler.limit = true;
module.exports = handler;

const fetchJson = (url, options) =>
  new Promise(async (resolve, reject) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json)
        resolve(json);
      })
      .catch((err) => {
        reject(err);
      });
  });