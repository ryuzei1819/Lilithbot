/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require("fs");

let handler = async (m, { text, usedPrefix }) => {
  try {
    let directory = "./src/audio.json";

    // Membaca file JSON jika sudah ada atau menginisialisasi jika belum ada
    if (!fs.existsSync(directory) || fs.readFileSync(directory).length === 0) {
      throw `🚫 Database kosong. Tidak ada voice note yang tersedia untuk dihapus.`;
    }

    let array = JSON.parse(fs.readFileSync(directory));

    // Validasi input pengguna
    if (!text || !parseInt(text)) {
      throw `❗️ Contoh penggunaan: ${usedPrefix}delvn [number]\nContoh: ${usedPrefix}delvn 1`;
    }

    let index = parseInt(text);
    if (index < 1 || index > array.length) {
      throw `❗️ Nomor voice note tidak valid. Silakan masukkan nomor yang benar.`;
    }

    // Menghapus voice note dari array berdasarkan index
    let deletedVN = array.splice(index - 1, 1)[0];

    // Menyimpan kembali array yang telah diubah ke dalam file JSON
    fs.writeFileSync(directory, JSON.stringify(array, null, 2));

    // Kirim pesan konfirmasi ke pengguna bahwa voice note berhasil dihapus
    await m.reply(`✅ Voice note "${deletedVN.name}" berhasil dihapus dari database.`);
  } catch (error) {
    console.error(error);
    await m.reply(`❗️ Terjadi kesalahan: ${error}`);
  }
};

handler.help = ["delvn"];
handler.tags = ["tools"];
handler.command = ["delvn"];
handler.owner = true;

module.exports = handler;