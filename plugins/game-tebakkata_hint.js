/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let handler = async (m, { conn }) => {
  conn.tebakkata = conn.tebakkata ? conn.tebakkata : {};
  let id = m.chat;
  if (!(id in conn.tebakkata)) throw false;
  let json = conn.tebakkata[id][1];
  let ans = json.jawaban.trim();
  let clue = ans.replace(/[AIUEO]/g, "_");
  conn.reply(
    m.chat,
    "```" + clue + "```\nBalas soalnya, bukan pesan ini",
    conn.tebakkata[id][0],
  );
};
handler.command = /^teka$/i;
handler.limit = true;
module.exports = handler;
