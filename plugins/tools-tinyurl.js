/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let axios = require("axios");

let fetch = require("node-fetch");

let handler = async (m, { text, conn: fur, args }) => {
  if (!text)
    throw "url/link nya mana?\n\n*CONTOH:*\n.tinyurl https://instagram.com";

  fur.reply(m.chat, await shortlink(text), m);
};

handler.help = ["tinyurl"]
handler.tags = ["tools"];
handler.command = /^tinyurl$/i;

module.exports = handler;

async function shortlink(url) {
  isurl = /https?:\/\//.test(url);
  return isurl
    ? (
        await require("axios").get(
          "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url),
        )
      ).data
    : "";
}