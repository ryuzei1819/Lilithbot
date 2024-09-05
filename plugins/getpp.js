/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let fetch = require("node-fetch");
let handler = async (m, { conn, command }) => {
  try {
    let who;
    if (m.isGroup)
      who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    else who = m.quoted.sender ? m.quoted.sender : m.sender;
    let pp = await conn
      .profilePictureUrl(who, "image")
      .catch((_) => "https://files.catbox.moe/ifx2y7.png");
    conn.sendFile(m.chat, pp, "nih bang.png", "Selesai....", m, {
      jpegThumbnail: await (await fetch(pp)).buffer(),
    });
  } catch {
    let sender = m.sender;
    let pp = await conn
      .profilePictureUrl(sender, "image")
      .catch((_) => "https://files.catbox.moe/ifx2y7.png");
    conn.sendFile(m.chat, pp, "ppsad.png", "Selesai....", m, {
      jpegThumbnail: await (await fetch(pp)).buffer(),
    });
  }
};
handler.help = ["getpp <@tag/reply>"];
handler.tags = ["group"];
handler.command = /^(getpp|getpic?t?|pp)$/i;

module.exports = handler;