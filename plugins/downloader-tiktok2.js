/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let { generateWAMessageContent } = require("@whiskeysockets/baileys");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[Tiktok Url]*`;
  if (!Func.isUrl(text))
    throw `*• Example :* ${usedPrefix + command} *[Tiktok Url]*`;
  m.reply(wait);
  try {
    let fetch = await Scraper["Download"].tiktok(text);
    let { data } = fetch;
    let msg = await generateWAMessageContent(
    {
      video: {url: data.play },
    },
    {
      upload: conn.waUploadToServer,
    },
  );
  let key = await conn.relayMessage(
    m.chat,
    {
      ptvMessage: msg.videoMessage,
    },
    {
      quoted: m,
    },
  );
      await conn.sendFile(m.chat, fetch.data.music, null, null, fkontak);
    } catch (e) {
    try {
      let tiktok = await Scraper["Download"].tiktok2(text);
      let cap = `*[ TIKTOK V2 DOWNLOADER ]*
*• Caption :* ${tiktok.caption}`;
      let key = await conn.sendFile(m.chat, tiktok.server1.url, null, cap, m);
      await conn.sendFile(m.chat, tiktok.audio, null, null, key);
    } catch (e) {
      throw eror;
    }
  }
};
handler.help = ["tt2", "tiktok2"].map((a) => a + " *[Tiktok Url]*");
handler.tags = ["downloader"];
handler.command = ["tt2", "tiktok2"];
module.exports = handler;