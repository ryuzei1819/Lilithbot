/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let fetch = require("node-fetch");
let googleIt = require("google-it");
let handler = async (m, { conn, command, args }) => {
  let full = /f$/i.test(command);
  let text = args.join` `;
  if (!text) return conn.reply(m.chat, "Tidak ada teks untuk di cari", m);
  let url = "https://google.com/search?q=" + encodeURIComponent(text);
  let search = await googleIt({ query: text });
  let msg = search.map(({ title, link, snippet }) => {
    return `*${title}*\n_${link}_\n_${snippet}_`;
  }).join`\n\n`;
  try {
    var logos = await Scraper["Tools"].ssweb(url);
    conn.sendFile(m.chat, logos, "logos.jpg", url + "\n\n" + msg, m);
  } catch (e) {
    m.reply(msg);
  }
};
handler.help = ["google", "googlef"]
handler.tags = ["internet"];
handler.command = /^googlef?$/i;
handler.fail = null;

module.exports = handler;