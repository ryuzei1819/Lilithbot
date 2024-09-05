/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const uploadFile = require("../lib/uploadFile.js");
let { sticker5 } = require("../lib/sticker.js");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [atas, bawah] = text.split`|`;
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime)
    throw `balas gambar dengan perintah\n\n${usedPrefix + command} <${atas ? atas : "teks atas"}>|<${bawah ? bawah : "teks bawah"}>`;
  let img = await q.download();
  let url = await uploadFile(img);
  let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : "")}/${encodeURIComponent(bawah ? bawah : "")}.png?background=${url}`;
  let stiker = await sticker5(meme, false, global.packname, global.author);
  if (stiker) return conn.sendFile(m.chat, stiker, "Quotly.webp", "", m);
};
handler.help = ["stickermeme <teks>|<teks>"];
handler.tags = ["sticker"];
handler.command = /^(s(tic?ker)?me(me)?)$/i;

handler.limit = false;

module.exports = handler;