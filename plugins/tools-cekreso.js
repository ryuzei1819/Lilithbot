const jimp = require("jimp");
const uploadImage = require("../lib/uploadImage.js");
const uploadFile = require("../lib/uploadFile.js");

let handler = async (m, { conn, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw "where the media?";

  let media = await q.download();
  let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let link = await (isMedia ? uploadImage : uploadImage)(media);

  let source = await jimp.read(await link);
  let height = await source.getHeight();
  let width = await source.getWidth();

  m.reply(`_*CEK  RESOLUTION :*_ ${width} x ${height}

> ᴡɪᴅᴛʜ : ${width}
> ʜᴇɪɢʜᴛ : ${height}

> ʟɪɴᴋ : ${link}`);
};

handler.tags = ["tools"];
handler.command = handler.help = /^(cekreso|cekresolution)$/i;

module.exports = handler;