/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
  conn.susunkata = conn.susunkata ? conn.susunkata : {};
  let id = m.chat;
  if (!(id in conn.susunkata)) throw false;
  let json = conn.susunkata[id][1];
  conn.reply(
    m.chat,
    "```" + json.jawaban.replace(/[AIUEOaiueo]/gi, "_") + "```",
    m,
  );
};
handler.command = /^hsus$/i;

handler.limit = true;

module.exports = handler;
