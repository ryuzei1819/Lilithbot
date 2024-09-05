/*
Ini Weem Gweh Mbud Jan Di Hapus
WhatsApp: wa.me/62857021072505
Jangan Perjual Belikan Esce Ini MeGMeG.
*/ 

let cp = require("child_process");
let { promisify } = require("util");
let exec = promisify(cp.exec).bind(cp);

let handler = async (m, { conn }) => {
  let o;
  try {
    // Ganti direktori ke direktori spesifik di dalam panel Pterodactyl dan jalankan perintah
    o = await exec(`
      cd /home/container && 
      find . -type f | wc -l && 
      du -h --max-depth=1 && 
      du -sh
    `);
  } catch (e) {
    o = e;
  } finally {
    let { stdout, stderr } = o;
    if (stdout.trim()) {
      let output = stdout.trim().split("\n");
      let totalFiles = output.shift(); // Ambil total jumlah file
      let totalSize = output.pop(); // Ambil total ukuran disk
      let lines = output.map(line => `> ${line}`).join("\n"); // Ambil detail penggunaan disk per subdirektori
      let response = `Total semua file: ${totalFiles} File dan size: ${totalSize}\n${lines}`;
      m.reply("```" + response + "```");
    }
    if (stderr.trim()) m.reply("```" + stderr + "```");
  }
};

handler.help = ["disk"].map((a) => a + " *[dapatkan info penggunaan disk-server]*");
handler.tags = ["info"];
handler.command = ["disk"];

module.exports = handler;