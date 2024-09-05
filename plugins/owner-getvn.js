/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require("fs");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      throw `❗️ Contoh penggunaan: ${usedPrefix + command} [number]`;
    }

    let index = parseInt(text);
    if (isNaN(index) || index < 1) {
      throw `❗️ Mohon masukkan angka yang valid`;
    }

    let array = JSON.parse(fs.readFileSync("./src/audio.json"));

    if (index > array.length) {
      throw `❗️ Nomor yang dimasukkan di luar jangkauan. Terdapat ${array.length} voice note di dalam daftar.`;
    }

    let audio = array[index - 1];
    let audioUrl = audio.url;

    await conn.sendFile(m.chat, audioUrl, 'voice_note.mp3', `🎵 *Nama Voice Note*: ${audio.name}`, m);
  } catch (error) {
    console.error(error);
    m.reply(error.toString());
  }
};

handler.help = ["getvn"];
handler.tags = ["tools"];
handler.command = ["getvn"];

module.exports = handler;