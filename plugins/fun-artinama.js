/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let fetch = require("node-fetch");
let cheerio = require("cheerio");

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*•< Example :* ${usedPrefix + command} *[name]*`;
  let nama = text;

  try {
    let response = await fetch(`http://www.primbon.com/arti_nama.php?nama1=${nama}&proses=+Submit%21+`, {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    });
    let body = await response.text();
    let $ = cheerio.load(body);
    let y = $.html().split("arti:")[1];
    let t = y.split('method="get">')[1];
    let f = y.replace(t, " ");
    let x = f.replace(/<br\s*[\/]?>/gi, "\n");
    let h = x.replace(/<[^>]*>?/gm, "");

    m.reply(`
Arti dari nama ${nama} adalah
-----------------------------------
Nama ${nama} ${h}
-----------------------------------
`);
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat mengambil data.');
  }
};

handler.help = ["artinama"].map((v) => v + " *[name]*");
handler.tags = ["fun"];
handler.command = ["artinama"];
handler.limit = true;

module.exports = handler;