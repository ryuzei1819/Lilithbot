/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let fs = require("fs");

let syaii = async (m, { conn, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("*Mana Gambarnya Jirlah*");
  if (!text) throw "*Nama Image Nya Apa*";
  let directory = "./src/image.json"; 
  let media = await q.download();
  let link = await Uploader.catbox(media);
  let jsonData = fs.readFileSync(directory);
  let existingData = JSON.parse(jsonData);
  existingData.push({ name: text, url: link });
  fs.writeFileSync(directory, JSON.stringify(existingData));
  m.reply(`*Sukses wak, cek pake .listimg*`);
};

syaii.help = ["addimg"]
syaii.tags = ["tools"];
syaii.command = ["addimg"];
syaii.owner = true
module.exports = syaii;