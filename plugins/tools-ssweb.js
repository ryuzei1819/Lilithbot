/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} https://screenshots`;
  m.reply(wait);
  try {
    let Ssweb = await Scraper["Tools"].ssweb(text, "full", "desktop");
    m.reply(wm, Ssweb);
  } catch (e) {
    return eror;
  }
};
handler.help = ["ssweb"].map((a) => a + " *[url]*");
handler.tags = ["tools"];
handler.command = ["ssweb"];
module.exports = handler;