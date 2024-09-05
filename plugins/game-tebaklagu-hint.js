/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
  conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {};
  let id = m.chat;
  if (!(id in conn.tebaklagu)) throw false;
  let json = conn.tebaklagu[id][1];
  conn.reply(
    m.chat,
    "```" + json.judul.replace(/[AIUEOaiueo]/gi, "_") + "```",
    m,
  );
};
handler.command = /^hlag$/i;

handler.limit = true;

module.exports = handler;
