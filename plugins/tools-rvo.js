/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

let handler = async (m, { conn }) => {
  if (!m.quoted) throw "Reply gambar/video yang ingin Anda lihat";
  if (m.quoted.mtype !== "viewOnceMessageV2")
    throw "Ini bukan pesan view-once.";
  let msg = m.quoted.message;
  let type = Object.keys(msg)[0];
  let media = await downloadContentFromMessage(
    msg[type],
    type == "imageMessage" ? "image" : "video",
  );
  let buffer = Buffer.from([]);
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  if (/video/.test(type)) {
    return conn.sendFile(
      m.chat,
      buffer,
      "media.mp4",
      msg[type].caption || "",
      m,
    );
  } else if (/image/.test(type)) {
    return conn.sendFile(
      m.chat,
      buffer,
      "media.jpg",
      msg[type].caption || "",
      m,
    );
  }
};

handler.help = ["readvo"];
handler.tags = ["tools"];
handler.command = ["readviewonce", "rvo", "readvo"];
handler.register = true;

module.exports = handler;