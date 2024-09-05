/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (!(id in conn.caklontong)) throw false;
  let json = conn.caklontong[id][1];
  conn.reply(
    m.chat,
    "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```",
    m,
  );
};
handler.command = /^hcak$/i;

handler.limit = true;

module.exports = handler;
