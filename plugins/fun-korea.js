/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let a = await Func.fetchJson(
    "https://github.com/ArifzynXD/database/raw/master/asupan/korea.json",
  );
  return m.reply(done, await Func.random(a.map((a) => a.url)));
};
handler.help = ["korea"].map((a) => a + " *[Random image]*");
handler.tags = ["fun"];
handler.command = ["korea"];
module.exports = handler;