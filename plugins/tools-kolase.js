/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const { createCanvas, loadImage } = require("canvas");

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `Kirim/Reply Gambar dengan caption ${usedPrefix + command}`;
  m.reply("Tunggu Sebentar...");
  let media = await q.download();
  let imageUrls = await Promise.all([
    loadImage(media),
    loadImage(media),
    loadImage(media),
    loadImage(media),
  ]);

  // Memeriksa jumlah foto
  if (imageUrls.length !== 4) {
    throw "Jumlah foto harus 4!";
  }

  // Mengatur ukuran kolase
  const width = 800;
  const height = 800;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Menggambar gambar pada kolase
  ctx.drawImage(imageUrls[0], 0, 0, width / 2, height / 2);
  ctx.drawImage(imageUrls[1], width / 2, 0, width / 2, height / 2);
  ctx.drawImage(imageUrls[2], 0, height / 2, width / 2, height / 2);
  ctx.drawImage(imageUrls[3], width / 2, height / 2, width / 2, height / 2);

  // Mengubah hasil kolase menjadi url gambar
  const hasil = canvas.toDataURL();

  // Mengirim hasil kolase
  await conn.sendFile(m.chat, hasil, "", "NIH KAK HASILNYA", m);
};

handler.help = ["kolase <4 photo>"];
handler.tags = ["tools"];
handler.command = /^(kolase)$/i;
handler.limit = true;

module.exports = handler;