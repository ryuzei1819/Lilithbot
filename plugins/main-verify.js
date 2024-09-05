const { createHash } = require("crypto");
let handler = async (m, { text, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  if (user.registered !== false)
    throw "Kamu Sudah mendaftar!!\nIngin daftar ulang? ketik unreg";
  
  user.registered = true;

  let age = Math.floor(Math.random() * (60 - 18 + 1)) + 18;
  user.age = age;

  let sn = createHash("md5").update(m.sender).digest("hex");
  let p = `*Selamat Kamu sudah Mendaftar ✅*\n• Umur kamu: *${age} tahun*\n• Ketik Menu Untuk Melanjutkan\n\n• Sn Kamu: *${sn}*`;
  m.reply(p);
};

handler.help = ["@verify"];
handler.tags = ["main"];
handler.customPrefix = /^(verify|@verify)$/i;
handler.command = new RegExp();

module.exports = handler;