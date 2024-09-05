/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

const fs = require("fs");
const path = require("path");

const handler = async (m, { conn }) => {
  const directory = global.uthFile;
  const sampah = [];

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Terjadi kesalahan:", err);
      return;
    }
    files.forEach((file) => {
      sampah.push(file);
      const filePath = path.join(directory, file);
      if (file !== "creds.json") {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Gagal menghapus file:", err);
            return;
          }
        });
      }
    });
    m.reply(`Success Delete File Trash Total: *[ ${sampah.length} ]*`);
  });
};

handler.help = ["csesi", "clearsessi"].map((a) => a + " *[clear trash]*");
handler.tags = ["owner"];
handler.command = handler.help = ["csesi", "clearsessi"];
handler.rowner = true;

module.exports = handler;