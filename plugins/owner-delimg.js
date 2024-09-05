/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require("fs");

let handler = async (m, { text, usedPrefix }) => {
  try {
    let directory = "./src/image.json";

    // Membaca file JSON jika sudah ada atau menginisialisasi jika belum ada
    if (!fs.existsSync(directory) || fs.readFileSync(directory).length === 0) {
      throw `🚫 Database kosong. Tidak ada gambar yang tersedia untuk dihapus.`;
    }

    let array = JSON.parse(fs.readFileSync(directory));

    // Validasi input pengguna
    if (!text || !parseInt(text)) {
      throw `❗️ Contoh penggunaan: ${usedPrefix}delimg [number]\nContoh: ${usedPrefix}delimg 1`;
    }

    let index = parseInt(text);
    if (index < 1 || index > array.length) {
      throw `❗️ Nomor gambar tidak valid. Silakan masukkan nomor yang benar.`;
    }

    // Menghapus gambar dari array berdasarkan index
    let deletedImage = array.splice(index - 1, 1)[0];

    // Menyimpan kembali array yang telah diubah ke dalam file JSON
    fs.writeFileSync(directory, JSON.stringify(array, null, 2));

    // Kirim pesan konfirmasi ke pengguna bahwa gambar berhasil dihapus
    await m.reply(`✅ Gambar "${deletedImage.name}" berhasil dihapus dari database.`);
  } catch (error) {
    console.error(error);
    await m.reply(`❗️ Terjadi kesalahan: ${error}`);
  }
};

handler.help = ["delimg"];
handler.tags = ["tools"];
handler.command = ["delimg"];
handler.owner = true;

module.exports = handler;